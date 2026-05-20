import { getStudentProfile } from './studentProfile.js';

const APPS_SCRIPT_URL = 'ここにApps ScriptのWebアプリURLを貼る';

export async function sendTeacherData(payload) {
  const profile = getStudentProfile();
  const data = {
    app: '因数分解ハンターズ',
    timestamp: new Date().toISOString(),
    studentId: profile?.studentId || 'unknown',
    number: profile?.number || '',
    name: profile?.name || '',
    group: profile?.group || '',
    ...payload,
  };

  if (!APPS_SCRIPT_URL || APPS_SCRIPT_URL.includes('ここに')) {
    console.log('Teacher Sync Demo', data);
    return { ok: false, mode: 'demo' };
  }

  try {
    await fetch(APPS_SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(data),
    });
    return { ok: true, mode: 'sent' };
  } catch (error) {
    console.error('Teacher Sync Error', error);
    return { ok: false, mode: 'error', error };
  }
}
