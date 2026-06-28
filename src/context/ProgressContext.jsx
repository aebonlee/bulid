import { createContext, useContext, useEffect, useState, useCallback, useRef } from 'react'
import { supabase } from '../lib/supabase'
import { useAuth } from './AuthContext'

const ProgressContext = createContext(null)
const KEY = 'bulid-progress-v1'

function loadLocal() {
  try {
    return JSON.parse(localStorage.getItem(KEY)) || {}
  } catch {
    return {}
  }
}
function saveLocal(map) {
  localStorage.setItem(KEY, JSON.stringify(map))
}

export function ProgressProvider({ children }) {
  const { user } = useAuth()
  const [progress, setProgress] = useState(loadLocal)
  const syncedUser = useRef(null)

  // 로그인 시: Supabase 진도 불러와 로컬과 병합, 로컬-only 항목은 업로드
  useEffect(() => {
    if (!user) {
      syncedUser.current = null
      return
    }
    if (syncedUser.current === user.id) return
    syncedUser.current = user.id

    ;(async () => {
      const { data, error } = await supabase
        .from('bulid_progress')
        .select('vol_id, part_num')
        .eq('user_id', user.id)
      if (error) {
        console.warn('[bulid] progress load skipped:', error.message)
        return
      }
      const remote = {}
      for (const r of data || []) remote[`${r.vol_id}/${r.part_num}`] = true

      const local = loadLocal()
      const merged = { ...remote, ...local }
      setProgress(merged)
      saveLocal(merged)

      // 로컬에만 있던 항목 업로드
      const toUpload = Object.keys(local)
        .filter((k) => !remote[k])
        .map((k) => {
          const [vol_id, part_num] = k.split('/')
          return { user_id: user.id, vol_id, part_num: Number(part_num) }
        })
      if (toUpload.length) {
        await supabase.from('bulid_progress').upsert(toUpload, {
          onConflict: 'user_id,vol_id,part_num',
        })
      }
    })()
  }, [user])

  const isDone = useCallback((volId, partNum) => !!progress[`${volId}/${partNum}`], [progress])

  const setDone = useCallback(
    async (volId, partNum, done) => {
      const k = `${volId}/${partNum}`
      setProgress((prev) => {
        const next = { ...prev }
        if (done) next[k] = true
        else delete next[k]
        saveLocal(next)
        return next
      })
      if (user) {
        if (done) {
          await supabase
            .from('bulid_progress')
            .upsert(
              { user_id: user.id, vol_id: volId, part_num: Number(partNum) },
              { onConflict: 'user_id,vol_id,part_num' }
            )
        } else {
          await supabase
            .from('bulid_progress')
            .delete()
            .match({ user_id: user.id, vol_id: volId, part_num: Number(partNum) })
        }
      }
    },
    [user]
  )

  const toggle = useCallback(
    (volId, partNum) => setDone(volId, partNum, !progress[`${volId}/${partNum}`]),
    [progress, setDone]
  )

  const countDone = useCallback(
    (volId, partNums) => partNums.filter((n) => progress[`${volId}/${n}`]).length,
    [progress]
  )

  return (
    <ProgressContext.Provider value={{ progress, isDone, setDone, toggle, countDone }}>
      {children}
    </ProgressContext.Provider>
  )
}

export function useProgress() {
  const ctx = useContext(ProgressContext)
  if (!ctx) throw new Error('useProgress must be used within ProgressProvider')
  return ctx
}
