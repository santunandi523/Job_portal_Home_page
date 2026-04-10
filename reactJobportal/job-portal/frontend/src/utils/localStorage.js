export const USERS_KEY = 'job_portal_users';
export const JOBS_KEY = 'job_portal_jobs';
export const CURRENT_USER_KEY = 'job_portal_current_user';

// Initialize dummy jobs if none exist
const initializeDummyData = () => {
  if (!localStorage.getItem(JOBS_KEY)) {
    const dummyJobs = [
      {
        id: '1',
        title: 'Frontend Developer',
        company: 'Tech Corp',
        location: 'Remote',
        salary: '$80,000 - $120,000',
        description: 'We are looking for a skilled Frontend Developer proficient in React and UI/UX design.',
        requirements: 'React, Tailwind CSS, 3+ years experience.',
        recruiterId: 'admin',
        applicants: []
      },
      {
        id: '2',
        title: 'Backend Engineer',
        company: 'DataFlow Inc',
        location: 'New York, NY',
        salary: '$100,000 - $140,000',
        description: 'Join our core infrastructure team to build scalable Node.js microservices.',
        requirements: 'Node.js, MongoDB, AWS.',
        recruiterId: 'admin',
        applicants: []
      }
    ];
    localStorage.setItem(JOBS_KEY, JSON.stringify(dummyJobs));
  }
};

initializeDummyData();

export const getUsers = () => JSON.parse(localStorage.getItem(USERS_KEY)) || [];
export const getJobs = () => JSON.parse(localStorage.getItem(JOBS_KEY)) || [];
export const getCurrentUser = () => JSON.parse(localStorage.getItem(CURRENT_USER_KEY)) || null;

export const registerUser = (userData) => {
  const users = getUsers();
  if (users.find(u => u.email === userData.email)) {
    throw new Error('User already exists');
  }
  const newUser = { ...userData, id: Date.now().toString(), appliedJobs: [] };
  users.push(newUser);
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
  
  // Auto login
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(newUser));
  return newUser;
};

export const loginUser = ({ email, password }) => {
  const users = getUsers();
  const user = users.find(u => u.email === email && u.password === password);
  if (!user) {
    throw new Error('Invalid email or password');
  }
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
  return user;
};

export const logoutUser = () => {
  localStorage.removeItem(CURRENT_USER_KEY);
};

export const postJob = (jobData) => {
  const jobs = getJobs();
  const newJob = { ...jobData, id: Date.now().toString(), applicants: [] };
  jobs.push(newJob);
  localStorage.setItem(JOBS_KEY, JSON.stringify(jobs));
  return newJob;
};

export const applyForJob = (jobId, userId) => {
  const jobs = getJobs();
  const users = getUsers();
  
  const jobIndex = jobs.findIndex(j => j.id === jobId);
  const userIndex = users.findIndex(u => u.id === userId);
  
  if (jobIndex === -1 || userIndex === -1) return false;
  
  if (jobs[jobIndex].applicants.includes(userId)) return false; // Already applied
  
  jobs[jobIndex].applicants.push(userId);
  users[userIndex].appliedJobs.push(jobId);
  
  localStorage.setItem(JOBS_KEY, JSON.stringify(jobs));
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
  
  // update current user in local storage if applying
  const currentUser = getCurrentUser();
  if (currentUser && currentUser.id === userId) {
    currentUser.appliedJobs.push(jobId);
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(currentUser));
  }
  
  return true;
};
