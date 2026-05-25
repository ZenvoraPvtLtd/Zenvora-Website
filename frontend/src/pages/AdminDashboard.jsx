import { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Briefcase,
  FileText,
  Mail,
  LogOut,
  Plus,
  Pencil,
  Trash2,
  Check,
  X,
  ChevronDown,
  Menu,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { api } from "../api";

// ─── Helpers ──────────────────────────────────────────────────────────────────
const getUser = () => {
  try {
    return JSON.parse(localStorage.getItem("user"));
  } catch {
    return null;
  }
};

const STATUS_COLORS = {
  new: "bg-blue-500/10 text-blue-400 border-blue-500/30",
  open: "bg-cyan-500/10 text-cyan-400 border-cyan-500/30",
  pending: "bg-yellow-500/10 text-yellow-400 border-yellow-500/30",
  reviewed: "bg-purple-500/10 text-purple-400 border-purple-500/30",
  accepted: "bg-green-500/10 text-green-400 border-green-500/30",
  rejected: "bg-red-500/10 text-red-400 border-red-500/30",
  closed: "bg-gray-500/10 text-gray-400 border-gray-500/30",
};

const Badge = ({ status }) => (
  <span
    className={`text-xs px-2 py-0.5 rounded-full border font-medium capitalize ${STATUS_COLORS[status] ?? "bg-gray-700 text-gray-300 border-gray-600"}`}
  >
    {status}
  </span>
);

const StatCard = ({ label, value, icon: Icon, color }) => (
  <div className="border rounded-xl p-5 flex items-center gap-4" style={{
    borderColor: "var(--border)",
    backgroundColor: "var(--surface)"
  }}>
    <div className={`p-3 rounded-lg ${color}`}>
      <Icon size={22} style={{ color: "#ffffff" }} />
    </div>
    <div>
      <p className="text-2xl font-bold" style={{ color: "var(--text)" }}>
        {value ?? <span style={{ color: "var(--text-secondary)", fontSize: "0.875rem" }}>Loading...</span>}
      </p>
      <p className="text-xs mt-0.5" style={{ color: "var(--text-secondary)" }}>{label}</p>
    </div>
  </div>
);

// ─── Pagination ───────────────────────────────────────────────────────────────
const PAGE_SIZE = 8;

const usePagination = (data) => {
  const [page, setPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(data.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const slice = data.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);
  useEffect(() => {
    setPage(1);
  }, [data.length]);
  return { slice, page: safePage, totalPages, setPage };
};

const Pagination = ({ page, totalPages, setPage, total }) => {
  if (totalPages <= 1) return null;
  const from = (page - 1) * PAGE_SIZE + 1;
  const to = Math.min(page * PAGE_SIZE, total);

  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    if (i === 1 || i === totalPages || (i >= page - 1 && i <= page + 1)) {
      pages.push(i);
    } else if (pages[pages.length - 1] !== "…") {
      pages.push("…");
    }
  }

  return (
    <div className="flex items-center justify-between mt-4 px-1">
      <p className="text-xs" style={{ color: "var(--text-secondary)" }}>
        {from}–{to} of {total}
      </p>
      <div className="flex items-center gap-1">
        <button
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
          className="p-1.5 rounded-lg hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed transition"
          style={{ color: "var(--text-secondary)" }}
        >
          <ChevronLeft size={14} />
        </button>
        {pages.map((p, i) =>
          p === "…" ? (
            <span key={`ellipsis-${i}`} className="px-1 text-xs" style={{ color: "var(--text-secondary)" }}>
              …
            </span>
          ) : (
            <button
              key={p}
              onClick={() => setPage(p)}
              className="w-7 h-7 text-xs rounded-lg transition"
              style={{
                backgroundColor: p === page ? "#0ea5e9" : "var(--bg-alt)",
                color: p === page ? "#ffffff" : "var(--text-secondary)",
                fontWeight: p === page ? "600" : "400"
              }}
            >
              {p}
            </button>
          ),
        )}
        <button
          onClick={() => setPage(page + 1)}
          disabled={page === totalPages}
          className="p-1.5 rounded-lg hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed transition"
          style={{ color: "var(--text-secondary)" }}
        >
          <ChevronRight size={14} />
        </button>
      </div>
    </div>
  );
};

// ─── Confirm Dialog ────────────────────────────────────────────────────────────
const Confirm = ({ message, onConfirm, onCancel }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}>
    <div className="border rounded-xl p-6 w-full max-w-sm mx-4 shadow-lg" style={{
      backgroundColor: "var(--surface)",
      borderColor: "var(--border)"
    }}>
      <p className="text-sm mb-5" style={{ color: "var(--text)" }}>{message}</p>
      <div className="flex gap-3 justify-end">
        <button
          onClick={onCancel}
          className="px-4 py-2 text-sm border rounded-lg transition"
          style={{
            borderColor: "var(--border)",
            color: "var(--text-secondary)"
          }}
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          className="px-4 py-2 text-sm text-white rounded-lg transition hover:opacity-90"
          style={{
            backgroundColor: "#ef4444"
          }}
        >
          Delete
        </button>
      </div>
    </div>
  </div>
);

// ─── Job Modal ─────────────────────────────────────────────────────────────────
const EMPTY_JOB = {
  title: "",
  location: "",
  type: "Full-time",
  department: "",
  description: "",
  requirements: "",
  isActive: true,
};

const JobModal = ({ job, onClose, onSaved }) => {
  const isEdit = !!job?._id;
  const [form, setForm] = useState(
    isEdit
      ? { ...job, requirements: (job.requirements ?? []).join("\n") }
      : EMPTY_JOB,
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
        requirements: form.requirements
          .split("\n")
          .map((s) => s.trim())
          .filter(Boolean),
      };
      if (isEdit) await api.updateJob(job._id, payload);
      else await api.createJob(payload);
      setForm(EMPTY_JOB);
      onSaved();
    } catch (ex) {
      setErr(ex.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}>
      <div className="rounded-xl w-full max-w-lg shadow-xl max-h-[90vh] overflow-y-auto" style={{
        backgroundColor: "var(--surface)",
        borderColor: "var(--border)",
        border: "1px solid"
      }}>
        <div className="flex items-center justify-between px-6 py-4" style={{
          borderBottom: "1px solid var(--border)",
          color: "var(--text)"
        }}>
          <h3 className="font-semibold">
            {isEdit ? "Edit Job" : "New Job"}
          </h3>
          <button
            onClick={onClose}
            className="hover:text-blue-600 transition"
            style={{ color: "var(--text-secondary)" }}
          >
            <X size={18} />
          </button>
        </div>
        <form onSubmit={submit} className="p-6 space-y-4">
          {err && (
            <div className="text-sm rounded-lg px-3 py-2" style={{
              borderColor: "rgba(239, 68, 68, 0.3)",
              backgroundColor: "rgba(239, 68, 68, 0.1)",
              color: "#ef4444",
              border: "1px solid"
            }}>
              {err}
            </div>
          )}
          {[
            ["Title", "title", "text", true],
            ["Location", "location", "text", true],
            ["Department", "department", "text", false],
          ].map(([label, key, type, req]) => (
            <div key={key}>
              <label className="block text-xs mb-1" style={{ color: "var(--text-secondary)" }}>
                {label}
              </label>
              <input
                type={type}
                value={form[key]}
                onChange={(e) => set(key, e.target.value)}
                required={req}
                className="w-full px-3 py-2 text-sm bg-gray-700 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 placeholder-gray-500"
              />
            </div>
          ))}
          <div>
            <label className="block text-xs text-gray-400 mb-1">Type</label>
            <select
              value={form.type}
              onChange={(e) => set("type", e.target.value)}
              className="w-full px-3 py-2 text-sm bg-gray-700 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
            >
              {[
                "Full-time",
                "Part-time",
                "Contract",
                "Internship",
                "Remote",
              ].map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs text-gray-400 mb-1">
              Description
            </label>
            <textarea
              value={form.description}
              onChange={(e) => set("description", e.target.value)}
              required
              rows={3}
              className="w-full px-3 py-2 text-sm bg-gray-700 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 resize-none"
            />
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="active"
              checked={form.isActive}
              onChange={(e) => set("isActive", e.target.checked)}
              className="accent-cyan-500"
            />
            <label htmlFor="active" className="text-xs text-gray-300">
              Active (visible to applicants)
            </label>
          </div>
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2 text-sm border border-gray-600 text-gray-400 hover:text-white rounded-lg transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="flex-1 py-2 text-sm bg-cyan-500 hover:bg-cyan-400 text-black font-semibold rounded-lg transition disabled:opacity-60"
            >
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
  const [pos, setPos] = useState({ top: 0, left: 0 });
  const btnRef = useRef(null);

  const toggle = () => {
    if (!open && btnRef.current) {
      const r = btnRef.current.getBoundingClientRect();
      setPos({
        top: r.bottom + window.scrollY + 4,
        left: r.left + window.scrollX,
      });
    }
    setOpen((o) => !o);
  };

  useEffect(() => {
    if (!open) return;
    const close = () => setOpen(false);
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, [open]);

  return (
    <div className="relative inline-block">
      <button
        ref={btnRef}
        onClick={toggle}
        className="flex items-center gap-1 text-xs border border-gray-600 px-2 py-1 rounded-lg text-gray-300 hover:border-cyan-500 transition whitespace-nowrap"
      >
        <span className="capitalize">{current}</span>
        <ChevronDown size={12} />
      </button>
      {open && (
        <div
          onMouseDown={(e) => e.stopPropagation()}
          style={{
            position: "fixed",
            top: pos.top,
            left: pos.left,
            zIndex: 9999,
          }}
          className="rounded-lg shadow-md overflow-hidden min-w-28" style={{
            backgroundColor: "var(--surface)",
            borderColor: "var(--border)",
            border: "1px solid"
          }}
        >
          {options.map((o) => (
            <button
              key={o}
              onClick={() => {
                onChange(o);
                setOpen(false);
              }}
              className={`w-full text-left px-3 py-1.5 text-xs capitalize hover:bg-gray-700 transition ${o === current ? "text-cyan-400" : "text-gray-300"}`}
            >
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
      <StatCard
        label="Total Users"
        value={stats?.totalUsers}
        icon={Users}
        color="bg-cyan-600"
      />
      <StatCard
        label="Jobs Posted"
        value={stats?.totalJobs}
        icon={Briefcase}
        color="bg-blue-600"
      />
      <StatCard
        label="Applications"
        value={stats?.totalApplications}
        icon={FileText}
        color="bg-purple-600"
      />
      <StatCard
        label="Contact Leads"
        value={stats?.totalContacts}
        icon={Mail}
        color="bg-green-600"
      />
    </div>
  </div>
);

// ── Users ──
const UsersSection = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [confirm, setConfirm] = useState(null);
  const { slice, page, totalPages, setPage } = usePagination(users);
  const currentUser = getUser();

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const d = await api.getUsers();
      setUsers(d.data);
    } catch {
      /* handled silently */
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const remove = async (id) => {
    await api.deleteUser(id);
    setConfirm(null);
    load();
  };

  if (loading) return <p className="text-gray-500 text-sm">Loading…</p>;

  return (
    <div>
      {confirm && (
        <Confirm
          message={`Delete user "${confirm.name}"?`}
          onConfirm={() => remove(confirm._id)}
          onCancel={() => setConfirm(null)}
        />
      )}
      <h2 className="text-lg font-semibold mb-5" style={{ color: "var(--text)" }}>
        Users{" "}
        <span className="text-sm font-normal" style={{ color: "var(--text-secondary)" }}>
          ({users.length})
        </span>
      </h2>
      <div className="overflow-x-auto rounded-xl border" style={{
        borderColor: "var(--border)",
        backgroundColor: "var(--surface)"
      }}>
        <table className="w-full text-sm">
          <thead style={{
            backgroundColor: "var(--bg-alt)",
            borderBottom: "1px solid var(--border)"
          }}>
            <tr>
              {["Name", "Email", "Role", "Active", "Joined", "Actions"].map(
                (h) => (
                  <th
                    key={h}
                    className="px-4 py-3 text-left text-xs font-medium whitespace-nowrap"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {h}
                  </th>
                ),
              )}
            </tr>
          </thead>
          <tbody style={{ borderColor: "var(--border)" }} className="divide-y">
            {slice.map((u) => (
              <tr
                key={u._id}
                className="hover:bg-slate-50 transition"
                style={{ backgroundColor: "var(--surface)" }}
              >
                <td className="px-4 py-4 font-medium whitespace-nowrap" style={{ color: "var(--text)" }}>
                  {u.name}
                </td>
                <td className="px-4 py-4 whitespace-nowrap" style={{ color: "var(--text-secondary)" }}>
                  {u.email}
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <Badge status={u.role} />
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  {u.isActive ? (
                    <Check size={14} className="text-green-400" />
                  ) : (
                    <X size={14} className="text-red-400" />
                  )}
                </td>
                <td className="px-4 py-4 text-gray-500 whitespace-nowrap">
                  {new Date(u.createdAt).toLocaleDateString()}
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  {currentUser?._id !== u._id && (
                    <button
                      onClick={() => setConfirm(u)}
                      className="text-red-400 hover:text-red-300 transition p-1"
                    >
                      <Trash2 size={15} />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {!users.length && (
          <p className="text-center text-gray-500 py-8 text-sm">
            No users found.
          </p>
        )}
      </div>
      <div className="flex items-center justify-between mt-1">
        <Pagination
          page={page}
          totalPages={totalPages}
          setPage={setPage}
          total={users.length}
        />
      </div>
    </div>
  );
};

// ── Jobs ──
const JobsSection = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(null);
  const [confirm, setConfirm] = useState(null);
  const { slice, page, totalPages, setPage } = usePagination(jobs);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const d = await api.getJobs();
      setJobs(d.data);
    } catch {
      /* handled silently */
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const remove = async (id) => {
    await api.deleteJob(id);
    setConfirm(null);
    load();
  };

  if (loading) return <p className="text-gray-500 text-sm">Loading…</p>;

  return (
    <div>
      {confirm && (
        <Confirm
          message={`Delete "${confirm.title}"?`}
          onConfirm={() => remove(confirm._id)}
          onCancel={() => setConfirm(null)}
        />
      )}
      {modal !== null && (
        <JobModal
          key={modal === "new" ? "new" : modal._id}
          job={modal === "new" ? null : modal}
          onClose={() => setModal(null)}
          onSaved={() => {
            setModal(null);
            load();
          }}
        />
      )}
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-lg font-semibold text-white">
          Jobs{" "}
          <span className="text-gray-500 text-sm font-normal">
            ({jobs.length})
          </span>
        </h2>
        <button
          onClick={() => setModal("new")}
          className="flex items-center gap-1.5 text-sm bg-cyan-500 hover:bg-cyan-400 text-black font-semibold px-4 py-2 rounded-lg transition"
        >
          <Plus size={15} /> New Job
        </button>
      </div>
      <div className="space-y-4">
        <div className="hidden lg:block overflow-x-auto rounded-xl border border-gray-700">
          <table className="w-full text-sm">
            <thead className="bg-gray-800 border-b border-gray-700">
              <tr>
                {[
                  "Title",
                  "Department",
                  "Skills",
                  "Location",
                  "Type",
                  "Status",
                  "Actions",
                ].map((h) => (
                  <th
                    key={h}
                    className="px-4 py-3 text-left text-xs font-medium text-gray-400 whitespace-nowrap"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700/50">
              {slice.map((j) => (
                <tr
                  key={j._id}
                  className="bg-gray-800/50 hover:bg-gray-800 transition"
                >
                  <td className="px-4 py-4 text-white font-medium whitespace-nowrap">
                    {j.title}
                  </td>
                  <td className="px-4 py-4 text-gray-400 whitespace-nowrap">
                    {j.department || "—"}
                  </td>
                  <td className="px-4 py-4 text-gray-400 max-w-[180px] truncate" title={(j.requirements || []).join(", ")}>
                    {(j.requirements || []).join(", ") || "—"}
                  </td>
                  <td className="px-4 py-4 text-gray-400 whitespace-nowrap">
                    {j.location}
                  </td>
                  <td className="px-4 py-4 text-gray-400 whitespace-nowrap">
                    {j.type}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <Badge status={j.isActive ? "open" : "closed"} />
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setModal(j)}
                        className="text-cyan-400 hover:text-cyan-300 transition p-1"
                      >
                        <Pencil size={15} />
                      </button>
                      <button
                        onClick={() => setConfirm(j)}
                        className="text-red-400 hover:text-red-300 transition p-1"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="grid gap-4 lg:hidden">
          {slice.map((j) => (
            <article
              key={j._id}
              className="rounded-3xl border p-5 shadow-md" style={{
                borderColor: "var(--border)",
                backgroundColor: "var(--bg-alt)"
              }}
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">
                      {j.department || "General"}
                    </p>
                    <Badge status={j.isActive ? "open" : "closed"} />
                  </div>
                  <h3 className="mt-3 text-lg font-black text-white">
                    {j.title}
                  </h3>
                  <p className="mt-3 max-w-xl text-sm leading-6 text-slate-400">
                    Skills: {(j.requirements || []).join(", ") || "—"}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2 text-xs text-gray-400">
                  <span className="rounded-full border border-gray-700 bg-gray-800/80 px-3 py-1">
                    {j.location}
                  </span>
                  <span className="rounded-full border border-gray-700 bg-gray-800/80 px-3 py-1">
                    {j.type}
                  </span>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-3 text-sm">
                <button
                  onClick={() => setModal(j)}
                  className="rounded-full bg-cyan-500/15 px-4 py-2 text-cyan-200 transition hover:bg-cyan-500/25"
                >
                  Edit
                </button>
                <button
                  onClick={() => setConfirm(j)}
                  className="rounded-full bg-red-500/15 px-4 py-2 text-red-300 transition hover:bg-red-500/25"
                >
                  Delete
                </button>
              </div>
            </article>
          ))}
        </div>

        {!jobs.length && (
          <p className="text-center text-gray-500 py-8 text-sm">
            No jobs posted yet.
          </p>
        )}
      </div>
      <div className="flex items-center justify-between mt-1">
        <Pagination
          page={page}
          totalPages={totalPages}
          setPage={setPage}
          total={jobs.length}
        />
      </div>
    </div>
  );
};

// ── Applications ──
const APPLICATION_STATUSES = ["pending", "reviewed", "accepted", "rejected"];

const ApplicationsSection = () => {
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);
  const { slice, page, totalPages, setPage } = usePagination(apps);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const d = await api.getApplications();
      setApps(d.data);
    } catch {
      /* handled silently */
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const changeStatus = async (id, status) => {
    await api.updateApplicationStatus(id, { status });
    setApps((prev) => prev.map((a) => (a._id === id ? { ...a, status } : a)));
  };

  if (loading) return <p className="text-gray-500 text-sm">Loading…</p>;

  return (
    <div>
      <h2 className="text-lg font-semibold text-white mb-5">
        Applications{" "}
        <span className="text-gray-500 text-sm font-normal">
          ({apps.length})
        </span>
      </h2>
      <div className="rounded-xl border border-gray-700 overflow-x-auto">
        <table className="w-full text-sm table-fixed min-w-[700px]">
          <thead className="bg-gray-800 border-b border-gray-700">
            <tr>
              <th className="px-3 py-3 text-left text-xs font-medium text-gray-400 w-[15%]">
                Name
              </th>
              <th className="px-3 py-3 text-left text-xs font-medium text-gray-400 w-[20%]">
                Email
              </th>
              <th className="px-3 py-3 text-left text-xs font-medium text-gray-400 w-[18%]">
                Job
              </th>
              <th className="px-3 py-3 text-left text-xs font-medium text-gray-400 w-[13%]">
                Phone
              </th>
              <th className="px-3 py-3 text-left text-xs font-medium text-gray-400 w-[12%]">
                Status
              </th>
              <th className="px-3 py-3 text-left text-xs font-medium text-gray-400 w-[12%]">
                Applied
              </th>
              <th className="px-3 py-3 text-left text-xs font-medium text-gray-400 w-[10%]">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700/50">
            {slice.map((a) => (
              <tr
                key={a._id}
                className="bg-gray-800/50 hover:bg-gray-800 transition"
              >
                <td className="px-3 py-3 text-white font-medium truncate">
                  {a.name}
                </td>
                <td className="px-3 py-3 text-gray-400 truncate">{a.email}</td>
                <td className="px-3 py-3 text-gray-300 truncate">
                  {a.jobTitle || "—"}
                </td>
                <td className="px-3 py-3 text-gray-400 truncate">
                  {a.phone || "—"}
                </td>
                <td className="px-3 py-3">
                  <Badge status={a.status} />
                </td>
                <td className="px-3 py-3 text-gray-500 text-xs">
                  {new Date(a.createdAt).toLocaleDateString()}
                </td>
                <td className="px-3 py-3">
                  <StatusSelect
                    current={a.status}
                    options={APPLICATION_STATUSES}
                    onChange={(s) => changeStatus(a._id, s)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {!apps.length && (
          <p className="text-center text-gray-500 py-8 text-sm">
            No applications yet.
          </p>
        )}
      </div>
      <div className="flex items-center justify-between mt-1">
        <Pagination
          page={page}
          totalPages={totalPages}
          setPage={setPage}
          total={apps.length}
        />
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
  const { slice, page, totalPages, setPage } = usePagination(contacts);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const d = await api.getContacts();
      setContacts(d.data);
    } catch {
      /* handled silently */
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const changeStatus = async (id, status) => {
    await api.updateContactStatus(id, { status });
    setContacts((prev) =>
      prev.map((c) => (c._id === id ? { ...c, status } : c)),
    );
  };

  if (loading) return <p className="text-gray-500 text-sm">Loading…</p>;

  return (
    <div>
      <h2 className="text-lg font-semibold text-white mb-5">
        Contact Submissions{" "}
        <span className="text-gray-500 text-sm font-normal">
          ({contacts.length})
        </span>
      </h2>
      <div className="rounded-xl border border-gray-700 overflow-x-auto">
        <table className="w-full text-sm table-fixed min-w-[700px]">
          <thead className="bg-gray-800 border-b border-gray-700">
            <tr>
              <th className="px-3 py-3 text-left text-xs font-medium text-gray-400 w-[16%]">
                Name
              </th>
              <th className="px-3 py-3 text-left text-xs font-medium text-gray-400 w-[20%]">
                Email
              </th>
              <th className="px-3 py-3 text-left text-xs font-medium text-gray-400 w-[15%]">
                Company
              </th>
              <th className="px-3 py-3 text-left text-xs font-medium text-gray-400 w-[15%]">
                Service
              </th>
              <th className="px-3 py-3 text-left text-xs font-medium text-gray-400 w-[12%]">
                Status
              </th>
              <th className="px-3 py-3 text-left text-xs font-medium text-gray-400 w-[12%]">
                Date
              </th>
              <th className="px-3 py-3 text-left text-xs font-medium text-gray-400 w-[10%]">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700/50">
            {slice.map((c) => (
              <>
                <tr
                  key={c._id}
                  className="bg-gray-800/50 hover:bg-gray-800 transition cursor-pointer"
                  onClick={() => setExpanded(expanded === c._id ? null : c._id)}
                >
                  <td className="px-3 py-3 text-white font-medium truncate">
                    {c.firstName} {c.lastName}
                  </td>
                  <td className="px-3 py-3 text-gray-400 truncate">
                    {c.email}
                  </td>
                  <td className="px-3 py-3 text-gray-400 truncate">
                    {c.company || "—"}
                  </td>
                  <td className="px-3 py-3 text-gray-400 truncate">
                    {c.service || "—"}
                  </td>
                  <td className="px-3 py-3">
                    <Badge status={c.status} />
                  </td>
                  <td className="px-3 py-3 text-gray-500 text-xs">
                    {new Date(c.createdAt).toLocaleDateString()}
                  </td>
                  <td
                    className="px-3 py-3"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <StatusSelect
                      current={c.status}
                      options={CONTACT_STATUSES}
                      onChange={(s) => changeStatus(c._id, s)}
                    />
                  </td>
                </tr>
                {expanded === c._id && (
                  <tr key={`${c._id}-msg`} className="bg-gray-900">
                    <td
                      colSpan={7}
                      className="px-6 py-3 text-gray-300 text-xs italic border-b border-gray-700"
                    >
                      {c.message}
                    </td>
                  </tr>
                )}
              </>
            ))}
          </tbody>
        </table>
        {!contacts.length && (
          <p className="text-center text-gray-500 py-8 text-sm">
            No contact submissions.
          </p>
        )}
      </div>
      <div className="flex items-center justify-between mt-1">
        <Pagination
          page={page}
          totalPages={totalPages}
          setPage={setPage}
          total={contacts.length}
        />
      </div>
    </div>
  );
};

// ─── Sidebar config ────────────────────────────────────────────────────────────
const TABS = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "users", label: "Users", icon: Users },
  { id: "jobs", label: "Jobs", icon: Briefcase },
  { id: "applications", label: "Applications", icon: FileText },
  { id: "contacts", label: "Contacts", icon: Mail },
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
    api
      .getDashboard()
      .then((d) => setStats(d.data))
      .catch((err) =>
        console.error(
          "Dashboard stats error:",
          err?.response?.data || err.message,
        ),
      );
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
    window.location.reload();
  };

  if (!user || user.role !== "admin") return null;

  const changeTab = (id) => {
    setTab(id);
    setSidebarOpen(false);
  };

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
