import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  LayoutDashboard, Users, Briefcase, FileText, Mail,
  LogOut, Plus, Pencil, Trash2, Check, X, ChevronDown,
  Menu,
} from "lucide-react";
import { api } from "../api";

// ─── Helpers ──────────────────────────────────────────────────────────────────
const getUser = () => {
  try { return JSON.parse(localStorage.getItem("user")); } catch { return null; }
};

const STATUS_COLORS = {
  new:       "bg-blue-500/10 text-blue-400 border-blue-500/30",
  open:      "bg-cyan-500/10 text-cyan-400 border-cyan-500/30",
  pending:   "bg-yellow-500/10 text-yellow-400 border-yellow-500/30",
  reviewed:  "bg-purple-500/10 text-purple-400 border-purple-500/30",
  accepted:  "bg-green-500/10 text-green-400 border-green-500/30",
  rejected:  "bg-red-500/10 text-red-400 border-red-500/30",
  closed:    "bg-gray-500/10 text-gray-400 border-gray-500/30",
};

const Badge = ({ status }) => (
  <span className={`text-xs px-2 py-0.5 rounded-full border font-medium capitalize ${STATUS_COLORS[status] ?? "bg-gray-700 text-gray-300 border-gray-600"}`}>
    {status}
  </span>
);

const StatCard = ({ label, value, icon: Icon, color }) => (
  <div className="bg-gray-800 border border-gray-700 rounded-xl p-5 flex items-center gap-4">
    <div className={`p-3 rounded-lg ${color}`}>
      <Icon size={22} className="text-white" />
    </div>
    <div>
      <p className="text-2xl font-bold text-white">{value ?? "—"}</p>
      <p className="text-xs text-gray-400 mt-0.5">{label}</p>
    </div>
  </div>
);

// ─── Confirm Dialog ────────────────────────────────────────────────────────────
const Confirm = ({ message, onConfirm, onCancel }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
    <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 w-full max-w-sm mx-4 shadow-2xl">
      <p className="text-white text-sm mb-5">{message}</p>
      <div className="flex gap-3 justify-end">
        <button onClick={onCancel} className="px-4 py-2 text-sm text-gray-400 hover:text-white border border-gray-600 rounded-lg transition">Cancel</button>
        <button onClick={onConfirm} className="px-4 py-2 text-sm bg-red-600 hover:bg-red-500 text-white rounded-lg transition">Delete</button>
      </div>
    </div>
  </div>
);

// ─── Job Modal ─────────────────────────────────────────────────────────────────
const EMPTY_JOB = { title: "", location: "", type: "Full-time", department: "", description: "", requirements: "", isActive: true };

const JobModal = ({ job, onClose, onSaved }) => {
  const isEdit = !!job?._id;
  const [form, setForm] = useState(
    isEdit
      ? { ...job, requirements: (job.requirements ?? []).join("\n") }
      : EMPTY_JOB
  );
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState("");

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const submit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setErr("");
    try {
      const payload = {
        ...form,
        requirements: form.requirements.split("\n").map((s) => s.trim()).filter(Boolean),
      };
      if (isEdit) await api.updateJob(job._id, payload);
      else await api.createJob(payload);
      onSaved();
    } catch (ex) {
      setErr(ex.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
      <div className="bg-gray-800 border border-gray-700 rounded-xl w-full max-w-lg shadow-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-700">
          <h3 className="text-white font-semibold">{isEdit ? "Edit Job" : "New Job"}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition"><X size={18} /></button>
        </div>
        <form onSubmit={submit} className="p-6 space-y-4">
          {err && <div className="text-red-400 text-sm bg-red-500/10 border border-red-500/30 rounded-lg px-3 py-2">{err}</div>}
          {[
            ["Title", "title", "text", true],
            ["Location", "location", "text", true],
            ["Department", "department", "text", false],
          ].map(([label, key, type, req]) => (
            <div key={key}>
              <label className="block text-xs text-gray-400 mb-1">{label}</label>
              <input type={type} value={form[key]} onChange={(e) => set(key, e.target.value)} required={req}
                className="w-full px-3 py-2 text-sm bg-gray-700 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 placeholder-gray-500" />
            </div>
          ))}
          <div>
            <label className="block text-xs text-gray-400 mb-1">Type</label>
            <select value={form.type} onChange={(e) => set("type", e.target.value)}
              className="w-full px-3 py-2 text-sm bg-gray-700 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500">
              {["Full-time", "Part-time", "Contract", "Internship", "Remote"].map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs text-gray-400 mb-1">Description</label>
            <textarea value={form.description} onChange={(e) => set("description", e.target.value)} required rows={3}
              className="w-full px-3 py-2 text-sm bg-gray-700 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 resize-none" />
          </div>
          <div>
            <label className="block text-xs text-gray-400 mb-1">Requirements (one per line)</label>
            <textarea value={form.requirements} onChange={(e) => set("requirements", e.target.value)} rows={4}
              className="w-full px-3 py-2 text-sm bg-gray-700 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 resize-none" />
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" id="active" checked={form.isActive} onChange={(e) => set("isActive", e.target.checked)}
              className="accent-cyan-500" />
            <label htmlFor="active" className="text-xs text-gray-300">Active (visible to applicants)</label>
          </div>
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="flex-1 py-2 text-sm border border-gray-600 text-gray-400 hover:text-white rounded-lg transition">Cancel</button>
            <button type="submit" disabled={saving}
              className="flex-1 py-2 text-sm bg-cyan-500 hover:bg-cyan-400 text-black font-semibold rounded-lg transition disabled:opacity-60">
              {saving ? "Saving…" : isEdit ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// ─── Status Select ─────────────────────────────────────────────────────────────
const StatusSelect = ({ current, options, onChange }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <button onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-1 text-xs border border-gray-600 px-2 py-1 rounded-lg text-gray-300 hover:border-cyan-500 transition">
        <span className="capitalize">{current}</span>
        <ChevronDown size={12} />
      </button>
      {open && (
        <div className="absolute right-0 top-7 z-30 bg-gray-800 border border-gray-700 rounded-lg shadow-xl overflow-hidden min-w-[110px]">
          {options.map((o) => (
            <button key={o} onClick={() => { onChange(o); setOpen(false); }}
              className={`w-full text-left px-3 py-1.5 text-xs capitalize hover:bg-gray-700 transition ${o === current ? "text-cyan-400" : "text-gray-300"}`}>
              {o}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

// ─── Sections ─────────────────────────────────────────────────────────────────
const Overview = ({ stats }) => (
  <div>
    <h2 className="text-lg font-semibold text-white mb-5">Overview</h2>
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard label="Total Users" value={stats?.totalUsers} icon={Users} color="bg-cyan-600" />
      <StatCard label="Jobs Posted" value={stats?.totalJobs} icon={Briefcase} color="bg-blue-600" />
      <StatCard label="Applications" value={stats?.totalApplications} icon={FileText} color="bg-purple-600" />
      <StatCard label="Contact Leads" value={stats?.totalContacts} icon={Mail} color="bg-green-600" />
    </div>
    <p className="mt-6 text-xs text-gray-500">Use the sidebar to manage users, jobs, applications, and contact submissions.</p>
  </div>
);

// ── Users ──
const UsersSection = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [confirm, setConfirm] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    try { const d = await api.getUsers(); setUsers(d.data); }
    catch { /* handled silently */ }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { load(); }, [load]);

  const remove = async (id) => {
    await api.deleteUser(id);
    setConfirm(null);
    load();
  };

  const toggleRole = async (u) => {
    await api.updateUser(u._id, { role: u.role === "admin" ? "user" : "admin" });
    load();
  };

  if (loading) return <p className="text-gray-500 text-sm">Loading…</p>;

  return (
    <div>
      {confirm && <Confirm message={`Delete user "${confirm.name}"?`} onConfirm={() => remove(confirm._id)} onCancel={() => setConfirm(null)} />}
      <h2 className="text-lg font-semibold text-white mb-5">Users <span className="text-gray-500 text-sm font-normal">({users.length})</span></h2>
      <div className="overflow-x-auto rounded-xl border border-gray-700">
        <table className="w-full text-sm">
          <thead className="bg-gray-800 border-b border-gray-700">
            <tr>
              {["Name", "Email", "Role", "Active", "Joined", "Actions"].map((h) => (
                <th key={h} className="px-4 py-3 text-left text-xs font-medium text-gray-400">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700/50">
            {users.map((u) => (
              <tr key={u._id} className="bg-gray-800/50 hover:bg-gray-800 transition">
                <td className="px-4 py-3 text-white font-medium">{u.name}</td>
                <td className="px-4 py-3 text-gray-400">{u.email}</td>
                <td className="px-4 py-3"><Badge status={u.role} /></td>
                <td className="px-4 py-3">
                  {u.isActive
                    ? <Check size={14} className="text-green-400" />
                    : <X size={14} className="text-red-400" />}
                </td>
                <td className="px-4 py-3 text-gray-500">{new Date(u.createdAt).toLocaleDateString()}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <button onClick={() => toggleRole(u)}
                      className="text-xs px-2 py-1 border border-gray-600 text-gray-300 hover:border-cyan-500 hover:text-cyan-400 rounded-lg transition">
                      {u.role === "admin" ? "→ User" : "→ Admin"}
                    </button>
                    <button onClick={() => setConfirm(u)} className="text-red-400 hover:text-red-300 transition"><Trash2 size={14} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {!users.length && <p className="text-center text-gray-500 py-8 text-sm">No users found.</p>}
      </div>
    </div>
  );
};

// ── Jobs ──
const JobsSection = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(null); // null | "new" | job object
  const [confirm, setConfirm] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    try { const d = await api.getJobs(); setJobs(d.data); }
    catch { /* handled silently */ }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { load(); }, [load]);

  const remove = async (id) => {
    await api.deleteJob(id);
    setConfirm(null);
    load();
  };

  if (loading) return <p className="text-gray-500 text-sm">Loading…</p>;

  return (
    <div>
      {confirm && <Confirm message={`Delete "${confirm.title}"?`} onConfirm={() => remove(confirm._id)} onCancel={() => setConfirm(null)} />}
      {modal !== null && (
        <JobModal
          job={modal === "new" ? null : modal}
          onClose={() => setModal(null)}
          onSaved={() => { setModal(null); load(); }}
        />
      )}
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-lg font-semibold text-white">Jobs <span className="text-gray-500 text-sm font-normal">({jobs.length})</span></h2>
        <button onClick={() => setModal("new")}
          className="flex items-center gap-1.5 text-sm bg-cyan-500 hover:bg-cyan-400 text-black font-semibold px-4 py-2 rounded-lg transition">
          <Plus size={15} /> New Job
        </button>
      </div>
      <div className="overflow-x-auto rounded-xl border border-gray-700">
        <table className="w-full text-sm">
          <thead className="bg-gray-800 border-b border-gray-700">
            <tr>
              {["Title", "Department", "Location", "Type", "Status", "Actions"].map((h) => (
                <th key={h} className="px-4 py-3 text-left text-xs font-medium text-gray-400">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700/50">
            {jobs.map((j) => (
              <tr key={j._id} className="bg-gray-800/50 hover:bg-gray-800 transition">
                <td className="px-4 py-3 text-white font-medium">{j.title}</td>
                <td className="px-4 py-3 text-gray-400">{j.department || "—"}</td>
                <td className="px-4 py-3 text-gray-400">{j.location}</td>
                <td className="px-4 py-3 text-gray-400">{j.type}</td>
                <td className="px-4 py-3"><Badge status={j.isActive ? "open" : "closed"} /></td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <button onClick={() => setModal(j)} className="text-cyan-400 hover:text-cyan-300 transition"><Pencil size={14} /></button>
                    <button onClick={() => setConfirm(j)} className="text-red-400 hover:text-red-300 transition"><Trash2 size={14} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {!jobs.length && <p className="text-center text-gray-500 py-8 text-sm">No jobs posted yet.</p>}
      </div>
    </div>
  );
};

// ── Applications ──
const APPLICATION_STATUSES = ["pending", "reviewed", "accepted", "rejected"];

const ApplicationsSection = () => {
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    try { const d = await api.getApplications(); setApps(d.data); }
    catch { /* handled silently */ }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { load(); }, [load]);

  const changeStatus = async (id, status) => {
    await api.updateApplicationStatus(id, { status });
    setApps((prev) => prev.map((a) => a._id === id ? { ...a, status } : a));
  };

  if (loading) return <p className="text-gray-500 text-sm">Loading…</p>;

  return (
    <div>
      <h2 className="text-lg font-semibold text-white mb-5">Applications <span className="text-gray-500 text-sm font-normal">({apps.length})</span></h2>
      <div className="overflow-x-auto rounded-xl border border-gray-700">
        <table className="w-full text-sm">
          <thead className="bg-gray-800 border-b border-gray-700">
            <tr>
              {["Name", "Email", "Job", "Phone", "Status", "Applied", "Actions"].map((h) => (
                <th key={h} className="px-4 py-3 text-left text-xs font-medium text-gray-400">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700/50">
            {apps.map((a) => (
              <tr key={a._id} className="bg-gray-800/50 hover:bg-gray-800 transition">
                <td className="px-4 py-3 text-white font-medium">{a.name}</td>
                <td className="px-4 py-3 text-gray-400">{a.email}</td>
                <td className="px-4 py-3 text-gray-300">{a.jobTitle || "—"}</td>
                <td className="px-4 py-3 text-gray-400">{a.phone || "—"}</td>
                <td className="px-4 py-3"><Badge status={a.status} /></td>
                <td className="px-4 py-3 text-gray-500">{new Date(a.createdAt).toLocaleDateString()}</td>
                <td className="px-4 py-3">
                  <StatusSelect current={a.status} options={APPLICATION_STATUSES} onChange={(s) => changeStatus(a._id, s)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {!apps.length && <p className="text-center text-gray-500 py-8 text-sm">No applications yet.</p>}
      </div>
    </div>
  );
};

// ── Contacts ──
const CONTACT_STATUSES = ["new", "reviewed", "closed"];

const ContactsSection = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    try { const d = await api.getContacts(); setContacts(d.data); }
    catch { /* handled silently */ }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { load(); }, [load]);

  const changeStatus = async (id, status) => {
    await api.updateContactStatus(id, { status });
    setContacts((prev) => prev.map((c) => c._id === id ? { ...c, status } : c));
  };

  if (loading) return <p className="text-gray-500 text-sm">Loading…</p>;

  return (
    <div>
      <h2 className="text-lg font-semibold text-white mb-5">Contact Submissions <span className="text-gray-500 text-sm font-normal">({contacts.length})</span></h2>
      <div className="overflow-x-auto rounded-xl border border-gray-700">
        <table className="w-full text-sm">
          <thead className="bg-gray-800 border-b border-gray-700">
            <tr>
              {["Name", "Email", "Company", "Service", "Status", "Date", "Actions"].map((h) => (
                <th key={h} className="px-4 py-3 text-left text-xs font-medium text-gray-400">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700/50">
            {contacts.map((c) => (
              <>
                <tr key={c._id}
                  className="bg-gray-800/50 hover:bg-gray-800 transition cursor-pointer"
                  onClick={() => setExpanded(expanded === c._id ? null : c._id)}>
                  <td className="px-4 py-3 text-white font-medium">{c.firstName} {c.lastName}</td>
                  <td className="px-4 py-3 text-gray-400">{c.email}</td>
                  <td className="px-4 py-3 text-gray-400">{c.company || "—"}</td>
                  <td className="px-4 py-3 text-gray-400">{c.service || "—"}</td>
                  <td className="px-4 py-3"><Badge status={c.status} /></td>
                  <td className="px-4 py-3 text-gray-500">{new Date(c.createdAt).toLocaleDateString()}</td>
                  <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                    <StatusSelect current={c.status} options={CONTACT_STATUSES} onChange={(s) => changeStatus(c._id, s)} />
                  </td>
                </tr>
                {expanded === c._id && (
                  <tr key={`${c._id}-msg`} className="bg-gray-900">
                    <td colSpan={7} className="px-6 py-3 text-gray-300 text-xs italic border-b border-gray-700">
                      {c.message}
                    </td>
                  </tr>
                )}
              </>
            ))}
          </tbody>
        </table>
        {!contacts.length && <p className="text-center text-gray-500 py-8 text-sm">No contact submissions.</p>}
      </div>
      <p className="text-xs text-gray-600 mt-2">Click a row to expand the message.</p>
    </div>
  );
};

// ─── Sidebar config ────────────────────────────────────────────────────────────
const TABS = [
  { id: "overview",      label: "Overview",     icon: LayoutDashboard },
  { id: "users",         label: "Users",        icon: Users },
  { id: "jobs",          label: "Jobs",         icon: Briefcase },
  { id: "applications",  label: "Applications", icon: FileText },
  { id: "contacts",      label: "Contacts",     icon: Mail },
];

// ─── Main Component ────────────────────────────────────────────────────────────
const AdminDashboard = () => {
  const navigate = useNavigate();
  const user = getUser();
  const [tab, setTab] = useState("overview");
  const [stats, setStats] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Guard: redirect non-admins
  useEffect(() => {
    if (!user || user.role !== "admin") {
      navigate("/", { replace: true });
    }
  }, [user, navigate]);

  useEffect(() => {
    api.getDashboard()
      .then((d) => setStats(d.data))
      .catch(() => {});
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
    window.location.reload();
  };

  if (!user || user.role !== "admin") return null;

  const changeTab = (id) => { setTab(id); setSidebarOpen(false); };

  return (
    <div className="min-h-screen bg-black flex">
      {/* Sidebar overlay (mobile) */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/60 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed md:static z-40 top-0 left-0 h-full w-60 bg-gray-900 border-r border-gray-800 flex flex-col transition-transform duration-200 ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
        <div className="px-5 py-5 border-b border-gray-800">
          <p className="text-lg font-bold bg-linear-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Zenvora
          </p>
          <p className="text-xs text-gray-500 mt-0.5">Admin Panel</p>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {TABS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => changeTab(id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors text-left ${
                tab === id
                  ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20"
                  : "text-gray-400 hover:text-white hover:bg-gray-800"
              }`}
            >
              <Icon size={16} />
              {label}
            </button>
          ))}
        </nav>

        <div className="px-3 py-4 border-t border-gray-800 space-y-2">
          <p className="px-3 text-xs text-gray-500 truncate">{user.name}</p>
          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-red-400 hover:bg-red-500/10 transition text-left"
          >
            <LogOut size={16} /> Logout
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 flex flex-col min-h-screen overflow-x-hidden">
        {/* Top bar */}
        <header className="bg-gray-900 border-b border-gray-800 px-5 py-4 flex items-center gap-3 md:hidden">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-gray-400 hover:text-white transition"
          >
            <Menu size={20} />
          </button>
          <p className="text-sm font-semibold text-white capitalize">{tab}</p>
        </header>

        <div className="flex-1 p-5 md:p-8">
          {tab === "overview" && <Overview stats={stats} />}
          {tab === "users" && <UsersSection />}
          {tab === "jobs" && <JobsSection />}
          {tab === "applications" && <ApplicationsSection />}
          {tab === "contacts" && <ContactsSection />}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
