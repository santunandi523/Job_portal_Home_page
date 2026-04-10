import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Briefcase, MapPin, DollarSign, Building2, Users, X, ChevronDown } from 'lucide-react';
import { postJob, getJobs } from '../utils/localStorage';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const initialForm = {
  title: '', company: '', location: '', salary: '', description: '', requirements: ''
};

export default function RecruiterDashboard() {
  const { currentUser } = useAuth();
  const [postedJobs, setPostedJobs] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);

  const loadJobs = () => {
    const all = getJobs();
    setPostedJobs(all.filter(j => j.recruiterId === currentUser?.id));
  };

  useEffect(() => {
    loadJobs();
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await new Promise(r => setTimeout(r, 700));
      postJob({ ...form, recruiterId: currentUser.id });
      toast.success('Job posted successfully!');
      setForm(initialForm);
      setShowForm(false);
      loadJobs();
    } catch (err) {
      toast.error('Failed to post job. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-violet-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 px-4 py-10">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-between gap-4 mb-8 flex-wrap"
        >
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">
              Recruiter <span className="bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">Dashboard</span>
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">Manage your job postings and view applicants.</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 text-white font-bold shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all"
          >
            <Plus className="w-5 h-5" />
            Post a Job
          </motion.button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8"
        >
          {[
            { label: 'Jobs Posted', value: postedJobs.length, icon: Briefcase, color: 'text-blue-500' },
            { label: 'Total Applicants', value: postedJobs.reduce((acc, j) => acc + (j.applicants?.length || 0), 0), icon: Users, color: 'text-violet-500' },
            { label: 'Active', value: postedJobs.length, icon: Building2, color: 'text-green-500' },
          ].map((s) => (
            <div key={s.label} className="bg-white dark:bg-gray-800 rounded-2xl p-5 border border-gray-100 dark:border-gray-700 shadow-sm">
              <s.icon className={`w-6 h-6 ${s.color} mb-2`} />
              <p className="text-2xl font-extrabold text-gray-900 dark:text-white">{s.value}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{s.label}</p>
            </div>
          ))}
        </motion.div>

        {/* Post Job Form */}
        <AnimatePresence>
          {showForm && (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: -20, height: 0 }}
              animate={{ opacity: 1, y: 0, height: 'auto' }}
              exit={{ opacity: 0, y: -20, height: 0 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="overflow-hidden mb-8"
            >
              <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">Post a New Job</h2>
                  <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <FormField label="Job Title" name="title" value={form.title} onChange={handleChange} placeholder="e.g. Frontend Developer" required />
                  <FormField label="Company Name" name="company" value={form.company} onChange={handleChange} placeholder="e.g. Google" required />
                  <FormField label="Location" name="location" value={form.location} onChange={handleChange} placeholder="e.g. Remote, New York" required />
                  <FormField label="Salary (optional)" name="salary" value={form.salary} onChange={handleChange} placeholder="e.g. $80,000 - $120,000" />

                  <div className="sm:col-span-2 space-y-1.5">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Job Description</label>
                    <textarea
                      name="description"
                      value={form.description}
                      onChange={handleChange}
                      placeholder="Describe the role, responsibilities, and what you're looking for..."
                      required
                      rows={4}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700/50 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                    />
                  </div>

                  <div className="sm:col-span-2 space-y-1.5">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Requirements</label>
                    <textarea
                      name="requirements"
                      value={form.requirements}
                      onChange={handleChange}
                      placeholder="List required skills, experience, and qualifications..."
                      required
                      rows={3}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700/50 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                    />
                  </div>

                  <div className="sm:col-span-2 flex justify-end gap-3">
                    <button type="button" onClick={() => setShowForm(false)} className="px-5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 text-sm font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transition-all">
                      Cancel
                    </button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.97 }}
                      type="submit"
                      disabled={loading}
                      className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 text-white font-bold text-sm shadow-lg disabled:opacity-70"
                    >
                      {loading ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <><Plus className="w-4 h-4" /> Post Job</>}
                    </motion.button>
                  </div>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Posted Jobs */}
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Your Posted Jobs</h2>
          {postedJobs.length === 0 ? (
            <div className="text-center py-16 text-gray-400 dark:text-gray-500">
              <Briefcase className="w-16 h-16 mx-auto mb-4 opacity-30" />
              <p className="text-lg font-semibold">No jobs posted yet</p>
              <p className="text-sm mt-1">Click "Post a Job" to add your first listing.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {postedJobs.map((job, i) => (
                <RecruiterJobCard key={job.id} job={job} index={i} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function RecruiterJobCard({ job, index }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.07 }}
      className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all"
    >
      <div className="p-5 cursor-pointer" onClick={() => setExpanded(!expanded)}>
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 flex-1 min-w-0">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-100 to-violet-100 dark:from-blue-900/40 dark:to-violet-900/40 flex items-center justify-center font-bold text-blue-600 dark:text-blue-400 flex-shrink-0">
              {job.company?.[0]?.toUpperCase()}
            </div>
            <div className="min-w-0">
              <h3 className="font-bold text-gray-900 dark:text-white truncate">{job.title}</h3>
              <div className="flex flex-wrap items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                <span className="flex items-center gap-1"><Building2 className="w-3.5 h-3.5" />{job.company}</span>
                <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{job.location}</span>
                {job.salary && <span className="flex items-center gap-1"><DollarSign className="w-3.5 h-3.5" />{job.salary}</span>}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4 flex-shrink-0">
            <div className="text-center">
              <p className="text-xl font-bold text-blue-600 dark:text-blue-400">{job.applicants?.length || 0}</p>
              <p className="text-xs text-gray-400">Applicants</p>
            </div>
            <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${expanded ? 'rotate-180' : ''}`} />
          </div>
        </div>
      </div>
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-gray-100 dark:border-gray-700"
          >
            <div className="p-5 space-y-3">
              <div>
                <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">Description</p>
                <p className="text-sm text-gray-700 dark:text-gray-300">{job.description}</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">Requirements</p>
                <p className="text-sm text-gray-700 dark:text-gray-300">{job.requirements}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function FormField({ label, name, value, onChange, placeholder, required }) {
  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{label}</label>
      <input
        name={name} value={value} onChange={onChange} placeholder={placeholder} required={required}
        className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700/50 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
      />
    </div>
  );
}
