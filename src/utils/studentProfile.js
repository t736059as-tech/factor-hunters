export function getStudentProfile() {
  const saved = localStorage.getItem('fh_student_profile');
  if (!saved) return null;
  try { return JSON.parse(saved); } catch { return null; }
}

export function saveStudentProfile(profile) {
  localStorage.setItem('fh_student_profile', JSON.stringify(profile));
}

export function clearStudentProfile() {
  localStorage.removeItem('fh_student_profile');
}
