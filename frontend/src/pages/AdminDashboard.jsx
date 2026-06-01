import { Fragment, useState, useEffect, useCallback, useRef } from "react";
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
  admin: "bg-blue-50 text-blue-700 border-blue-200",
  user: "bg-slate-50 text-slate-700 border-slate-200",
  new: "bg-sky-50 text-sky-700 border-sky-200",
  open: "bg-cyan-50 text-cyan-700 border-cyan-200",
  pending: "bg-amber-50 text-amber-700 border-amber-200",
  reviewed: "bg-violet-50 text-violet-700 border-violet-200",
  accepted: "bg-emerald-50 text-emerald-700 border-emerald-200",
  rejected: "bg-red-50 text-red-700 border-red-200",
  closed: "bg-slate-100 text-slate-600 border-slate-200",
};

const Badge = ({ status }) => (
  <span
    className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold capitalize ${STATUS_COLORS[status] ?? "bg-slate-50 text-slate-700 border-slate-200"}`}
  >
    {status}
  </span>
);

const StatCard = ({ label, value, icon: Icon, color }) => (
  <div className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/60">
    <div className={`grid h-12 w-12 place-items-center rounded-xl ${color}`}>
      <Icon size={22} style={{ color: "#ffffff" }} />
    </div>
    <div>
      <p className="text-3xl font-black leading-none text-slate-950">
        {value ?? <span className="text-sm font-semibold text-slate-400">Loading...</span>}
      </p>
      <p className="mt-2 text-sm font-medium text-slate-500">{label}</p>
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
    } else if (pages[pages.length - 1] !== "...") {
      pages.push("...");
    }
  }

  return (
    <div className="flex items-center justify-between mt-4 px-1">
      <p className="text-xs" style={{ color: "var(--text-secondary)" }}>
        {from}-{to} of {total}
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
          p === "..." ? (
            <span key={`ellipsis-${i}`} className="px-1 text-xs" style={{ color: "var(--text-secondary)" }}>
              ...
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
                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
              />
            </div>
          ))}
          <div>
            <label className="mb-1 block text-xs text-slate-500">Type</label>
            <select
              value={form.type}
              onChange={(e) => set("type", e.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
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
            <label className="mb-1 block text-xs text-slate-500">
              Description
            </label>
            <textarea
              value={form.description}
              onChange={(e) => set("description", e.target.value)}
              required
              rows={3}
              className="w-full resize-none rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
            />
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="active"
              checked={form.isActive}
              onChange={(e) => set("isActive", e.target.checked)}
              className="accent-blue-600"
            />
            <label htmlFor="active" className="text-xs text-slate-600">
              Active (visible to applicants)
            </label>
          </div>
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-lg border border-slate-200 py-2 text-sm font-semibold text-slate-600 transition hover:border-slate-300 hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="flex-1 rounded-lg bg-blue-600 py-2 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:opacity-60"
            >
              {saving ? "Saving..." : isEdit ? "Update" : "Create"}
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
        className="flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-xs font-semibold text-slate-600 transition hover:border-blue-300 hover:text-blue-700 whitespace-nowrap"
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
          className="min-w-28 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-xl shadow-slate-200/70"
        >
          {options.map((o) => (
            <button
              key={o}
              onClick={() => {
                onChange(o);
                setOpen(false);
              }}
              className={`w-full px-3 py-2 text-left text-xs font-medium capitalize transition hover:bg-blue-50 ${o === current ? "text-blue-700" : "text-slate-600"}`}
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
    <div className="mb-6">
      <p className="text-xs font-black uppercase tracking-[0.16em] text-blue-600">Admin Panel</p>
      <h2 className="mt-2 text-2xl font-black text-slate-950">Overview</h2>
      <p className="mt-1 text-sm text-slate-500">Monitor users, career activity, applications, and contact leads.</p>
    </div>
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
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

  if (loading) return <p className="text-sm text-slate-500">Loading...</p>;

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
                <td className="px-4 py-4 text-slate-500 whitespace-nowrap">
                  {new Date(u.createdAt).toLocaleDateString()}
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  {currentUser?._id !== u._id && (
                    <button
                      onClick={() => setConfirm(u)}
                      className="p-1 text-red-500 transition hover:text-red-700"
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
          <p className="py-8 text-center text-sm text-slate-500">
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

  if (loading) return <p className="text-sm text-slate-500">Loading...</p>;

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
        <h2 className="text-lg font-semibold text-slate-950">
          Jobs{" "}
          <span className="text-sm font-normal text-slate-500">
            ({jobs.length})
          </span>
        </h2>
        <button
          onClick={() => setModal("new")}
          className="flex items-center gap-1.5 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm shadow-blue-200 transition hover:bg-blue-700"
        >
          <Plus size={15} /> New Job
        </button>
      </div>
      <div className="space-y-4">
        <div className="hidden overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm lg:block">
          <table className="w-full text-sm">
            <thead className="border-b border-slate-200 bg-slate-50">
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
                    className="px-4 py-3 text-left text-xs font-semibold text-slate-500 whitespace-nowrap"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {slice.map((j) => (
                <tr
                  key={j._id}
                  className="bg-white transition hover:bg-blue-50/40"
                >
                  <td className="px-4 py-4 font-semibold text-slate-950 whitespace-nowrap">
                    {j.title}
                  </td>
                  <td className="px-4 py-4 text-slate-500 whitespace-nowrap">
                    {j.department || "-"}
                  </td>
                  <td className="px-4 py-4 text-slate-500 max-w-[180px] truncate" title={(j.requirements || []).join(", ")}>
                    {(j.requirements || []).join(", ") || "-"}
                  </td>
                  <td className="px-4 py-4 text-slate-500 whitespace-nowrap">
                    {j.location}
                  </td>
                  <td className="px-4 py-4 text-slate-500 whitespace-nowrap">
                    {j.type}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <Badge status={j.isActive ? "open" : "closed"} />
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setModal(j)}
                        className="p-1 text-blue-600 transition hover:text-blue-800"
                      >
                        <Pencil size={15} />
                      </button>
                      <button
                        onClick={() => setConfirm(j)}
                        className="p-1 text-red-500 transition hover:text-red-700"
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
              className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-200/60"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-sm font-semibold uppercase tracking-[0.16em] text-blue-600">
                      {j.department || "General"}
                    </p>
                    <Badge status={j.isActive ? "open" : "closed"} />
                  </div>
                  <h3 className="mt-3 text-lg font-black text-slate-950">
                    {j.title}
                  </h3>
                  <p className="mt-3 max-w-xl text-sm leading-6 text-slate-500">
                    Skills: {(j.requirements || []).join(", ") || "-"}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2 text-xs text-slate-500">
                  <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1">
                    {j.location}
                  </span>
                  <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1">
                    {j.type}
                  </span>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-3 text-sm">
                <button
                  onClick={() => setModal(j)}
                  className="rounded-lg bg-blue-50 px-4 py-2 font-semibold text-blue-700 transition hover:bg-blue-100"
                >
                  Edit
                </button>
                <button
                  onClick={() => setConfirm(j)}
                  className="rounded-lg bg-red-50 px-4 py-2 font-semibold text-red-700 transition hover:bg-red-100"
                >
                  Delete
                </button>
              </div>
            </article>
          ))}
        </div>

        {!jobs.length && (
          <p className="py-8 text-center text-sm text-slate-500">
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

  if (loading) return <p className="text-sm text-slate-500">Loading...</p>;

  return (
    <div>
      <h2 className="mb-5 text-lg font-semibold text-slate-950">
        Applications{" "}
        <span className="text-sm font-normal text-slate-500">
          ({apps.length})
        </span>
      </h2>
      <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
        <table className="w-full text-sm table-fixed min-w-[700px]">
          <thead className="border-b border-slate-200 bg-slate-50">
            <tr>
              <th className="px-3 py-3 text-left text-xs font-semibold text-slate-500 w-[15%]">
                Name
              </th>
              <th className="px-3 py-3 text-left text-xs font-semibold text-slate-500 w-[20%]">
                Email
              </th>
              <th className="px-3 py-3 text-left text-xs font-semibold text-slate-500 w-[18%]">
                Job
              </th>
              <th className="px-3 py-3 text-left text-xs font-semibold text-slate-500 w-[13%]">
                Phone
              </th>
              <th className="px-3 py-3 text-left text-xs font-semibold text-slate-500 w-[12%]">
                Status
              </th>
              <th className="px-3 py-3 text-left text-xs font-semibold text-slate-500 w-[12%]">
                Applied
              </th>
              <th className="px-3 py-3 text-left text-xs font-semibold text-slate-500 w-[10%]">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {slice.map((a) => (
              <tr
                key={a._id}
                className="bg-white transition hover:bg-blue-50/40"
              >
                <td className="px-3 py-3 font-semibold text-slate-950 truncate">
                  {a.name}
                </td>
                <td className="px-3 py-3 text-slate-500 truncate">{a.email}</td>
                <td className="px-3 py-3 text-slate-700 truncate">
                  {a.jobTitle || "-"}
                </td>
                <td className="px-3 py-3 text-slate-500 truncate">
                  {a.phone || "-"}
                </td>
                <td className="px-3 py-3">
                  <Badge status={a.status} />
                </td>
                <td className="px-3 py-3 text-slate-500 text-xs">
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
          <p className="py-8 text-center text-sm text-slate-500">
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

  if (loading) return <p className="text-sm text-slate-500">Loading...</p>;

  return (
    <div>
      <h2 className="mb-5 text-lg font-semibold text-slate-950">
        Contact Submissions{" "}
        <span className="text-sm font-normal text-slate-500">
          ({contacts.length})
        </span>
      </h2>
      <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
        <table className="w-full text-sm table-fixed min-w-[700px]">
          <thead className="border-b border-slate-200 bg-slate-50">
            <tr>
              <th className="px-3 py-3 text-left text-xs font-semibold text-slate-500 w-[16%]">
                Name
              </th>
              <th className="px-3 py-3 text-left text-xs font-semibold text-slate-500 w-[20%]">
                Email
              </th>
              <th className="px-3 py-3 text-left text-xs font-semibold text-slate-500 w-[15%]">
                Company
              </th>
              <th className="px-3 py-3 text-left text-xs font-semibold text-slate-500 w-[15%]">
                Service
              </th>
              <th className="px-3 py-3 text-left text-xs font-semibold text-slate-500 w-[12%]">
                Status
              </th>
              <th className="px-3 py-3 text-left text-xs font-semibold text-slate-500 w-[12%]">
                Date
              </th>
              <th className="px-3 py-3 text-left text-xs font-semibold text-slate-500 w-[10%]">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {slice.map((c) => (
              <Fragment key={c._id}>
                <tr
                  className="cursor-pointer bg-white transition hover:bg-blue-50/40"
                  onClick={() => setExpanded(expanded === c._id ? null : c._id)}
                >
                  <td className="px-3 py-3 font-semibold text-slate-950 truncate">
                    {c.firstName} {c.lastName}
                  </td>
                  <td className="px-3 py-3 text-slate-500 truncate">
                    {c.email}
                  </td>
                  <td className="px-3 py-3 text-slate-500 truncate">
                    {c.company || "-"}
                  </td>
                  <td className="px-3 py-3 text-slate-500 truncate">
                    {c.service || "-"}
                  </td>
                  <td className="px-3 py-3">
                    <Badge status={c.status} />
                  </td>
                  <td className="px-3 py-3 text-slate-500 text-xs">
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
                  <tr key={`${c._id}-msg`} className="bg-blue-50/50">
                    <td
                      colSpan={7}
                      className="border-b border-blue-100 px-6 py-3 text-xs italic text-slate-600"
                    >
                      {c.message}
                    </td>
                  </tr>
                )}
              </Fragment>
            ))}
          </tbody>
        </table>
        {!contacts.length && (
          <p className="py-8 text-center text-sm text-slate-500">
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
    <div className="flex min-h-screen bg-slate-50 text-slate-900">
      {/* Sidebar overlay (mobile) */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-slate-950/30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed md:static z-40 top-0 left-0 flex h-full w-64 flex-col border-r border-slate-200 bg-white shadow-xl shadow-slate-200/60 transition-transform duration-200 md:shadow-none ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
        <div className="border-b border-slate-200 px-5 py-5">
          <p className="text-xl font-black text-blue-600">
            Zenvora
          </p>
          <p className="mt-0.5 text-xs font-medium text-slate-500">Admin Panel</p>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {TABS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => changeTab(id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors text-left ${
                tab === id
                  ? "border border-blue-200 bg-blue-50 text-blue-700 shadow-sm"
                  : "text-slate-500 hover:bg-slate-50 hover:text-slate-950"
              }`}
            >
              <Icon size={16} />
              {label}
            </button>
          ))}
        </nav>

        <div className="space-y-2 border-t border-slate-200 px-3 py-4">
          <p className="px-3 text-xs font-medium text-slate-500 truncate">{user.name}</p>
          <button
            onClick={logout}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-semibold text-red-600 transition hover:bg-red-50"
          >
            <LogOut size={16} /> Logout
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 flex flex-col min-h-screen overflow-x-hidden">
        {/* Top bar */}
        <header className="flex items-center gap-3 border-b border-slate-200 bg-white px-5 py-4 md:hidden">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-slate-500 transition hover:text-blue-700"
          >
            <Menu size={20} />
          </button>
          <p className="text-sm font-semibold capitalize text-slate-950">{tab}</p>
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
