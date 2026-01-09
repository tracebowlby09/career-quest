import Link from "next/link";
import React from "react";

export function Container({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ minHeight: "100vh", padding: 22 }}>
      <div style={{ maxWidth: 980, margin: "0 auto" }}>{children}</div>
    </div>
  );
}

export function Header({
  title,
  subtitle,
  right,
}: {
  title: string;
  subtitle?: string;
  right?: React.ReactNode;
}) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        gap: 14,
        flexWrap: "wrap",
        alignItems: "center",
        marginBottom: 16,
      }}
    >
      <div>
        <div style={{ fontSize: 34, fontWeight: 900, letterSpacing: -0.4 }}>{title}</div>
        {subtitle && <div style={{ marginTop: 6, opacity: 0.75, lineHeight: 1.5 }}>{subtitle}</div>}
      </div>
      {right}
    </div>
  );
}

export function Card({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        border: "1px solid var(--border)",
        background: "var(--panel)",
        borderRadius: "var(--radius)",
        padding: 16,
        boxShadow: "var(--shadow)",
        backdropFilter: "blur(10px)",
      }}
    >
      {children}
    </div>
  );
}

export function CardTitle({ children }: { children: React.ReactNode }) {
  return <div style={{ fontSize: 18, fontWeight: 900, marginBottom: 8 }}>{children}</div>;
}

export function Row({ children }: { children: React.ReactNode }) {
  return <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>{children}</div>;
}

export function Button({
  children,
  onClick,
  type = "button",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      style={{
        padding: "10px 14px",
        borderRadius: 14,
        border: "1px solid var(--border)",
        background: "var(--panel2)",
        color: "var(--text)",
        fontWeight: 900,
        cursor: "pointer",
      }}
    >
      {children}
    </button>
  );
}

export function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        padding: "6px 10px",
        borderRadius: 999,
        border: "1px solid var(--border)",
        background: "rgba(255,255,255,0.06)",
        fontWeight: 800,
        fontSize: 12,
        opacity: 0.9,
      }}
    >
      {children}
    </span>
  );
}

export function TextLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      style={{
        textDecoration: "none",
        fontWeight: 900,
        padding: "10px 12px",
        borderRadius: 14,
        border: "1px solid var(--border)",
        background: "rgba(255,255,255,0.05)",
      }}
    >
      {children}
    </Link>
  );
}
