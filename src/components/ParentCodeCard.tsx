import React, { useState } from 'react';
import {
  Users,
  Copy,
  Check,
  CheckCircle2,
  RefreshCw,
  Send,
  Loader2,
  Unlink,
  ShieldCheck,
  Mail,
  KeyRound,
  AlertCircle,
  Lightbulb,
  ArrowUpRight
} from 'lucide-react';
import { maskEmail, mailingService } from '../services/mailingService';
import { parentPortalService } from '../services/parentPortalService';
import type { LessonData } from '../types';

export interface ParentCodeCardProps {
  code?: string;
  isConnected?: boolean;
  parentEmail?: string | null;
  lessons?: LessonData[];
  className?: string;
  onCodeRegenerated?: (newCode: string) => void;
  onConnectionChanged?: (connected: boolean, email: string | null) => void;
  onOpenPortal?: () => void;
}

export { maskEmail };

export const ParentCodeCard: React.FC<ParentCodeCardProps> = ({
  code: initialCode,
  isConnected: initialIsConnected,
  parentEmail: initialParentEmail,
  lessons = [],
  className = '',
  onCodeRegenerated,
  onConnectionChanged,
  onOpenPortal
}) => {
  const initialStored = parentPortalService.getState();

  const [code, setCode] = useState(initialCode ?? initialStored.studentCode);
  const [parentEmail, setParentEmail] = useState<string | null>(
    initialParentEmail !== undefined ? initialParentEmail : initialStored.parentEmail
  );
  const [isConnected, setIsConnected] = useState(
    initialIsConnected !== undefined ? initialIsConnected : initialStored.isConnected
  );

  // Copy status
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Email input & invite state
  const [inviteEmailInput, setInviteEmailInput] = useState('');
  const [sendingInvite, setSendingInvite] = useState(false);
  const [inviteError, setInviteError] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  // Code regeneration state
  const [regenerating, setRegenerating] = useState(false);

  // Disconnect state
  const [disconnecting, setDisconnecting] = useState(false);
  const [showDisconnectConfirm, setShowDisconnectConfirm] = useState(false);

  // Ensure standard MP- prefix
  const formattedCode = code.startsWith('MP-') ? code : `MP-${code}`;

  const syncAriaInvalid = (el: HTMLInputElement) => {
    try {
      if (typeof el.matches === 'function' && CSS.supports('selector(:user-invalid)')) {
        el.setAttribute('aria-invalid', el.matches(':user-invalid') ? 'true' : 'false');
      }
    } catch {
      // ignore selector support issues
    }
  };

  const copyToClipboard = async (text: string): Promise<boolean> => {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      const ta = document.createElement('textarea');
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand('copy');
        document.body.removeChild(ta);
        return true;
      } catch {
        document.body.removeChild(ta);
        return false;
      }
    }
  };

  const handleCopyCode = async () => {
    const success = await copyToClipboard(formattedCode);
    if (success) {
      setCopiedCode(true);
      setStatusMessage('Кодът е копиран в клипборда!');
      setTimeout(() => {
        setCopiedCode(false);
        setStatusMessage(null);
      }, 2500);
    }
  };

  const handleCopyLink = async () => {
    const origin =
      typeof window !== 'undefined' ? window.location.origin : 'https://studybg.vercel.app';
    const inviteUrl = `${origin}/?code=${formattedCode}#planner`;
    const success = await copyToClipboard(inviteUrl);
    if (success) {
      setCopiedLink(true);
      setStatusMessage('Линкът с покана е копиран в клипборда!');
      setTimeout(() => {
        setCopiedLink(false);
        setStatusMessage(null);
      }, 2500);
    }
  };

  // 1. Send Email Invite & Weekly Digest Handler (Option A)
  const handleSendInvite = async (e: React.FormEvent) => {
    e.preventDefault();
    setInviteError(null);
    setStatusMessage(null);

    const emailToSend = inviteEmailInput.trim().toLowerCase();
    if (!emailToSend || !emailToSend.includes('@') || !emailToSend.includes('.')) {
      setInviteError('Моля, въведете валиден имейл адрес на родителя.');
      return;
    }

    setSendingInvite(true);
    try {
      const digestData = parentPortalService.buildStudentWeeklyDigestData(lessons);
      const dispatch = await mailingService.sendWeeklyDigestEmail({
        toEmail: emailToSend,
        digestData
      });

      if (!dispatch.success) {
        throw new Error(dispatch.message || 'Неуспешно изпращане на поканата.');
      }

      parentPortalService.connectParent(emailToSend);
      setParentEmail(emailToSend);
      setIsConnected(true);
      setInviteEmailInput('');
      setStatusMessage(
        dispatch.deliveredVia === 'resend'
          ? `Седмичният отчет и поканата бяха изпратени чрез Resend до ${emailToSend}!`
          : `Връзката с ${emailToSend} е активирана! Седмичният отчет е готов.`
      );
      onConnectionChanged?.(true, emailToSend);
    } catch (err: unknown) {
      setInviteError(
        err instanceof Error ? err.message : 'Възникна грешка при изпращането.'
      );
    } finally {
      setSendingInvite(false);
    }
  };

  // 2. Regenerate Access Code (Option B)
  const handleRegenerateCode = () => {
    if (regenerating) return;
    setRegenerating(true);
    try {
      const newCode = parentPortalService.regenerateCode();
      setCode(newCode);
      setStatusMessage(`Генериран е нов код за достъп: ${newCode}`);
      onCodeRegenerated?.(newCode);
      setTimeout(() => setStatusMessage(null), 3000);
    } finally {
      setRegenerating(false);
    }
  };

  // 3. Disconnect Parent
  const handleDisconnect = () => {
    setDisconnecting(true);
    try {
      parentPortalService.disconnectParent();
      setIsConnected(false);
      setParentEmail(null);
      setShowDisconnectConfirm(false);
      setStatusMessage('Връзката с родителя беше прекратена успешно.');
      onConnectionChanged?.(false, null);
      setTimeout(() => setStatusMessage(null), 3000);
    } finally {
      setDisconnecting(false);
    }
  };

  return (
    <section
      aria-labelledby="parent-control-title"
      className={`relative rounded-2xl border border-slate-200/90 bg-white/95 p-6 sm:p-8 shadow-xs transition-all hover:border-slate-300 ${className}`}
    >
      {/* Decorative top sapphire-emerald gradient accent */}
      <div className="absolute top-0 left-8 right-8 h-[2px] bg-gradient-to-r from-transparent via-[#0a4b82] to-emerald-500 opacity-80" />

      {/* 1. Header Row: Title, Subtitle, Status Badge */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
        <div className="flex items-start gap-3.5">
          <div className="h-11 w-11 rounded-2xl bg-gradient-to-br from-blue-50 to-emerald-50 border border-blue-200/80 flex items-center justify-center text-[#0a4b82] shrink-0 shadow-2xs">
            <Users className="h-5 w-5" />
          </div>
          <div>
            <h2
              id="parent-control-title"
              className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight"
            >
              Родителски контрол и седмичен напредък
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-slate-500 max-w-2xl leading-relaxed">
              Свържи родителски имейл, за да получава автоматични официални отчети за решените задачи, симулациите и готовността за ДЗИ по стандартите на МОН.
            </p>
          </div>
        </div>

        {/* Status Badge + Open Portal Action */}
        <div className="flex flex-wrap items-center gap-2 shrink-0 self-start sm:self-auto">
          {isConnected && parentEmail ? (
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-800 shadow-2xs"
              title={`Свързан родител: ${parentEmail}`}
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span>Активна синхронизация:</span>
              <span className="font-mono font-bold text-emerald-800">
                {maskEmail(parentEmail)}
              </span>
            </div>
          ) : (
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-50 border border-amber-200/80 text-xs font-semibold text-amber-800 shadow-2xs">
              <span className="h-2 w-2 rounded-full bg-amber-500 shrink-0" />
              <span>Статус: Очаква свързване</span>
            </div>
          )}

          {onOpenPortal && (
            <button
              type="button"
              onClick={onOpenPortal}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#0a4b82] hover:bg-[#083c68] text-white text-xs font-bold shadow-2xs transition cursor-pointer"
            >
              <span>Родителски портал</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
      </div>

      {statusMessage && (
        <div className="mb-5 flex items-center gap-2 rounded-xl bg-emerald-50 border border-emerald-200 px-3.5 py-2.5 text-xs font-semibold text-emerald-800">
          <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
          <span>{statusMessage}</span>
        </div>
      )}

      {/* 2. Two-Channel Linking Grid: Option A (Direct Invite) + Option B (Access Code) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">
        {/* ================= OPTION A (7 cols): DIRECT EMAIL INVITE ================= */}
        <div className="lg:col-span-7 rounded-2xl border border-slate-200/80 bg-slate-50/70 p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-flex items-center gap-1 rounded-md bg-emerald-100/80 border border-emerald-300 px-2 py-0.5 text-xs font-bold text-emerald-800">
                <Lightbulb className="h-3 w-3 text-emerald-600" />
                Препоръчително: Директна покана и седмичен дайджест по имейл
              </span>
            </div>
            <p className="text-xs text-slate-500 mb-3 leading-relaxed">
              Въведи пощата на родителя. Системата автоматично ще му изпрати официален седмичен отчет чрез Resend с бутон за достъп до Родителския портал.
            </p>
          </div>

          <form onSubmit={handleSendInvite} className="space-y-2.5">
            {inviteError && (
              <div className="flex items-center gap-2 rounded-lg bg-rose-50 border border-rose-200 px-3 py-2 text-xs text-rose-700">
                <AlertCircle className="h-4 w-4 shrink-0 text-rose-600" />
                <span>{inviteError}</span>
              </div>
            )}

            <span id="parent-email-hint" className="block text-[11px] font-medium text-slate-500">
              Формат: roditel@example.bg (получава седмичния отчет на {formattedCode})
            </span>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
              <div className="relative flex-1">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="email"
                  required
                  autoComplete="email"
                  aria-describedby="parent-email-hint"
                  value={inviteEmailInput}
                  onChange={(e) => setInviteEmailInput(e.target.value)}
                  onBlur={(e) => syncAriaInvalid(e.currentTarget)}
                  onInput={(e) => {
                    if (e.currentTarget.hasAttribute('aria-invalid')) {
                      syncAriaInvalid(e.currentTarget);
                    }
                  }}
                  placeholder={
                    parentEmail
                      ? `Текущ: ${maskEmail(parentEmail)}`
                      : 'напр. roditel@example.bg'
                  }
                  className="w-full rounded-xl border border-slate-200 bg-white pl-9 pr-3.5 py-2.5 text-xs text-slate-900 placeholder:text-slate-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 user-invalid:border-rose-500 user-invalid:bg-rose-50/40 user-valid:border-emerald-500 transition"
                />
              </div>

              <button
                type="submit"
                disabled={sendingInvite}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white px-5 py-2.5 text-xs font-bold shadow-xs transition active:scale-98 disabled:opacity-60 disabled:cursor-not-allowed shrink-0 cursor-pointer"
              >
                {sendingInvite ? (
                  <>
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    <span>Изпращане...</span>
                  </>
                ) : (
                  <>
                    <Send className="h-3.5 w-3.5" />
                    <span>{isConnected ? 'Изпрати нов отчет' : 'Изпрати покана'}</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* ================= OPTION B (5 cols): ACCESS CODE / PIN ================= */}
        <div className="lg:col-span-5 rounded-2xl border border-slate-200/80 bg-slate-50/70 p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-flex items-center gap-1 rounded-md bg-blue-50 border border-blue-200 px-2 py-0.5 text-xs font-bold text-[#0a4b82]">
                <KeyRound className="h-3 w-3" />
                Бърз код за достъп (ПИН)
              </span>
            </div>
            <p className="text-xs text-slate-500 mb-3.5 leading-relaxed">
              Родителят може да въведе този 6-символен код ръчно в Родителския портал.
            </p>
          </div>

          {/* Single Action Input Container */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between gap-2 rounded-xl border border-slate-200 bg-white p-1.5 shadow-2xs">
              <span
                className="font-mono text-base sm:text-lg font-bold tracking-widest text-slate-900 px-3 py-1 select-all"
                title="Уникален свързващ код"
              >
                {formattedCode}
              </span>

              <button
                type="button"
                onClick={handleCopyCode}
                aria-label="Копирай свързващия код"
                className={`inline-flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-xs font-bold transition-all active:scale-98 shrink-0 shadow-2xs cursor-pointer ${
                  copiedCode
                    ? 'bg-emerald-700 text-white'
                    : 'bg-emerald-600 hover:bg-emerald-500 text-white'
                }`}
              >
                {copiedCode ? (
                  <>
                    <Check className="h-3.5 w-3.5" />
                    <span>Копирано!</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" />
                    <span>Копирай код</span>
                  </>
                )}
              </button>
            </div>

            {/* Sub-actions: Regenerate code & copy direct URL */}
            <div className="flex items-center justify-between gap-2 text-xs pt-1">
              <button
                type="button"
                onClick={handleRegenerateCode}
                disabled={regenerating}
                className="inline-flex items-center gap-1 text-slate-500 hover:text-[#0a4b82] font-semibold transition-colors disabled:opacity-50 cursor-pointer"
                title="Генерирай нов уникален код, ако старият е компрометиран"
              >
                <RefreshCw
                  className={`h-3 w-3 ${regenerating ? 'animate-spin text-indigo-600' : ''}`}
                />
                <span>Генерирай нов код при нужда</span>
              </button>

              <button
                type="button"
                onClick={handleCopyLink}
                className="inline-flex items-center gap-1 text-slate-500 hover:text-emerald-600 font-semibold transition-colors cursor-pointer"
                title="Копирай пълен URL адрес с попълнен код"
              >
                {copiedLink ? (
                  <>
                    <CheckCircle2 className="h-3 w-3 text-emerald-500" />
                    <span className="text-emerald-800 font-bold">Линкът е копиран!</span>
                  </>
                ) : (
                  <>
                    <span>🔗</span>
                    <span className="underline decoration-slate-300 underline-offset-2">
                      Директен линк
                    </span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Student Rights, Transparency & Disconnect */}
      <div className="pt-4 border-t border-slate-100 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700 mb-1.5">
            <ShieldCheck className="h-4 w-4 text-emerald-600" />
            <span>Права и видимост за родителя:</span>
          </div>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500">
            <span className="inline-flex items-center gap-1">
              <span className="text-emerald-800 font-bold">✓</span>
              <span>Процент изпълнение на седмичния план</span>
            </span>
            <span className="inline-flex items-center gap-1">
              <span className="text-emerald-800 font-bold">✓</span>
              <span>Резултати от официалните МОН симулации за ДЗИ (0–100 т.)</span>
            </span>
            <span className="inline-flex items-center gap-1">
              <span className="text-emerald-800 font-bold">✓</span>
              <span>Препоръчани теми за преговор</span>
            </span>
          </div>
        </div>

        {/* Disconnect Action (When linked) */}
        {isConnected && (
          <div className="shrink-0">
            {showDisconnectConfirm ? (
              <div className="flex items-center gap-2">
                <span className="text-xs text-rose-700 font-semibold">
                  Сигурни ли сте?
                </span>
                <button
                  type="button"
                  disabled={disconnecting}
                  onClick={handleDisconnect}
                  className="rounded-lg bg-rose-600 hover:bg-rose-700 text-white px-3 py-1.5 text-xs font-bold transition shadow-xs disabled:opacity-50 cursor-pointer"
                >
                  {disconnecting ? 'Прекратяване...' : 'Да, прекъсни'}
                </button>
                <button
                  type="button"
                  disabled={disconnecting}
                  onClick={() => setShowDisconnectConfirm(false)}
                  className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition cursor-pointer"
                >
                  Отказ
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setShowDisconnectConfirm(true)}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-rose-600 transition-colors p-1.5 rounded-lg hover:bg-rose-50 cursor-pointer"
                title="Прекрати достъпа на родителя до твоя академичен отчет"
              >
                <Unlink className="h-3.5 w-3.5" />
                <span>Прекъсни връзката</span>
              </button>
            )}
          </div>
        )}
      </div>
    </section>
  );
};
