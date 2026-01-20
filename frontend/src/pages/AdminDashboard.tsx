import React, { useState, useEffect, useCallback } from 'react';

const API_BASE_URL = import.meta.env.VITE_API_URL;

/* =======================
   TYPES (INLINE, FINALLY)
   ======================= */

export const IssueStatus = {
  UNSOLVED: 'unsolved',
  IN_PROGRESS: 'in_progress',
  SOLVED: 'solved',
} as const;

export type IssueStatus = typeof IssueStatus[keyof typeof IssueStatus];

export type Priority = 'low' | 'medium' | 'high' | 'critical';

export interface Issue {
  id: string;
  _id?: string; // Optional mongo ID
  title: string;
  category: string;
  priority: Priority;
  status: IssueStatus;
}


/* =======================
   COMPONENT
   ======================= */

const AdminDashboard: React.FC = () => {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [updateStatus, setUpdateStatus] = useState<{
    id: string;
    loading: boolean;
  } | null>(null);

  /* =======================
     FETCH ISSUES
     ======================= */

  const fetchIssues = useCallback(async () => {
    setLoading(true);
    setError(null);

    const token = localStorage.getItem('token');

    try {
      const response = await fetch(`${API_BASE_URL}/issues`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 401 || response.status === 403) {
        setError('Access denied');
        return;
      }

      if (!response.ok) {
        throw new Error('Failed to fetch issues');
      }

      const data = await response.json();
      const mappedData: Issue[] = data.map((item: any) => ({
        ...item,
        id: item._id || item.id, // Handle distinct _id from Mongo
      }));
      setIssues(mappedData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unexpected error');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchIssues();
  }, [fetchIssues]);

  /* =======================
     UPDATE STATUS
     ======================= */

  const handleStatusChange = async (id: string, newStatus: IssueStatus) => {
    const token = localStorage.getItem('token');
    setUpdateStatus({ id, loading: true });

    try {
      const response = await fetch(`${API_BASE_URL}/issues/${id}/status`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        throw new Error('Failed to update status');
      }

      setIssues(prev =>
        prev.map(issue =>
          issue.id === id ? { ...issue, status: newStatus } : issue
        )
      );
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Update failed');
    } finally {
      setUpdateStatus(null);
    }
  };

  /* =======================
     UI HELPERS
     ======================= */

  const getPriorityColor = (priority: Priority) => {
    switch (priority) {
      case 'critical':
        return 'bg-red-950/40 text-red-400 border-red-900/50';
      case 'high':
        return 'bg-orange-950/40 text-orange-400 border-orange-900/50';
      case 'medium':
        return 'bg-yellow-950/40 text-yellow-400 border-yellow-900/50';
      case 'low':
        return 'bg-blue-950/40 text-blue-400 border-blue-900/50';
      default:
        return 'bg-slate-900 text-slate-400 border-slate-800';
    }
  };

  const getStatusColor = (status: IssueStatus) => {
    switch (status) {
      case IssueStatus.SOLVED:
        return 'bg-emerald-950/40 text-emerald-400 border-emerald-900/30';
      case IssueStatus.IN_PROGRESS:
        return 'bg-blue-950/40 text-blue-400 border-blue-900/30';
      case IssueStatus.UNSOLVED:
        return 'bg-rose-950/40 text-rose-400 border-rose-900/30';
      default:
        return 'bg-slate-800 text-slate-400 border-slate-700';
    }
  };

  /* =======================
     STATES
     ======================= */

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[300px] text-slate-400">
        Loading issues...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-400 font-bold mt-20">
        {error}
      </div>
    );
  }

  /* =======================
     MAIN RENDER
     ======================= */

  return (
    <div className="min-h-screen bg-slate-950 p-8 space-y-6">
      <h2 className="text-3xl font-bold text-slate-100">
        Active Issues
      </h2>

      <table className="w-full border border-slate-800">
        <thead className="bg-slate-900 text-slate-400 text-sm">
          <tr>
            <th className="p-4 text-left">Title</th>
            <th className="p-4 text-left">Category</th>
            <th className="p-4">Priority</th>
            <th className="p-4">Status</th>
            <th className="p-4 text-right">Action</th>
          </tr>
        </thead>

        <tbody>
          {issues.map(issue => (
            <tr key={issue.id} className="border-t border-slate-800">
              <td className="p-4 text-slate-200">{issue.title}</td>
              <td className="p-4 text-slate-400">{issue.category}</td>

              <td className="p-4 text-center">
                <span className={`px-2 py-1 text-xs rounded ${getPriorityColor(issue.priority)}`}>
                  {issue.priority.toUpperCase()}
                </span>
              </td>

              <td className="p-4 text-center">
                <span className={`px-3 py-1 text-xs rounded ${getStatusColor(issue.status)}`}>
                  {issue.status.replace('_', ' ').toUpperCase()}
                </span>
              </td>

              <td className="p-4 text-right">
                <select
                  value={issue.status}
                  disabled={updateStatus?.id === issue.id}
                  onChange={e =>
                    handleStatusChange(issue.id, e.target.value as IssueStatus)
                  }
                  className="bg-slate-950 border border-slate-700 text-slate-200 text-xs rounded p-2"
                >
                  <option value={IssueStatus.UNSOLVED}>UNSOLVED</option>
                  <option value={IssueStatus.IN_PROGRESS}>IN PROGRESS</option>
                  <option value={IssueStatus.SOLVED}>SOLVED</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
