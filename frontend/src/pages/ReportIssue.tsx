import React, { useState } from 'react';

const API_BASE_URL = import.meta.env.VITE_API_URL;

type IssueFormData = {
  title: string;
  description: string;
};

type SubmissionStatus = 'idle' | 'submitting' | 'success' | 'error';

const ReportIssue: React.FC = () => {
  const [formData, setFormData] = useState<IssueFormData>({
    title: '',
    description: '',
  });
  const [status, setStatus] = useState<SubmissionStatus>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage(null);

    const token = localStorage.getItem('token');

    if (!token) {
      setErrorMessage('Authorization token not found. Please log in.');
      setStatus('error');
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/issues`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      let data: any = {};
      try {
        data = await response.json();
      } catch {
        data = { message: 'Server returned an invalid response.' };
      }

      if (response.ok) {
        setStatus('success');
        setTimeout(() => {
          window.location.href = '/student';
        }, 2000);
      } else {
        setStatus('error');
        setErrorMessage(data.message || 'An error occurred while submitting the issue.');
      }
    } catch (error) {
      console.error('Submission failed:', error);
      setStatus('error');
      setErrorMessage('Failed to connect to the server. Please check your connection.');
    }
  };

  if (status === 'success') {
    return (
      <div className="max-w-md mx-auto mt-12 p-8 bg-slate-900 rounded-2xl shadow-2xl border border-blue-900/30 text-center">
        <h2 className="text-2xl font-bold text-slate-50 mb-3">Issue Reported!</h2>
        <p className="text-slate-400">
          Your issue has been submitted successfully. Redirecting you to the student dashboard...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black py-8">
      <div className="max-w-2xl mx-auto mt-0 p-8 bg-slate-900 rounded-3xl shadow-2xl border border-slate-800">
        <h1 className="text-3xl font-bold text-slate-50 mb-6">Report an Issue</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm text-slate-300 mb-1">Issue Title</label>
            <input
              type="text"
              name="title"
              required
              value={formData.title}
              onChange={handleChange}
              className="w-full p-3 rounded bg-slate-950 border border-slate-700 text-white"
            />
          </div>

          <div>
            <label className="block text-sm text-slate-300 mb-1">Description</label>
            <textarea
              name="description"
              required
              rows={5}
              value={formData.description}
              onChange={handleChange}
              className="w-full p-3 rounded bg-slate-950 border border-slate-700 text-white"
            />
          </div>

          {status === 'error' && (
            <div className="text-red-400 text-sm">{errorMessage}</div>
          )}

          <button
            type="submit"
            disabled={status === 'submitting'}
            className="px-6 py-3 bg-blue-600 rounded text-white font-semibold"
          >
            {status === 'submitting' ? 'Submitting...' : 'Submit Issue'}
          </button>
        </form>
      </div>
    </div>
  );
};
export default ReportIssue;
