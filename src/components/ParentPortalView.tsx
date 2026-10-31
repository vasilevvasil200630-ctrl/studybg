import React, { useState, useEffect } from 'react';
import {
  PlusCircle,
  Award,
  BookOpen,
  Calculator,
  Clock,
  AlertTriangle,
  CheckCircle2,
  KeyRound,
  Loader2,
  Shield,
  ArrowLeft,
  X,
  Mail,
  Lightbulb,
  Eye
} from 'lucide-react';
import {
  parentPortalService,
  normalizeParentCode,
  stripStudentCodePrefix,
  type PortalChildData
} from '../services/parentPortalService';
import {
  buildWeeklyDigestHtml,
  mailingService,
  maskEmail
} from '../services/mailingService';
import type { LessonData } from '../types';

export interface ParentPortalViewProps {
  lessons: LessonData[];
  onClose?: () => void;
}

export const ParentPortalView: React.FC<ParentPortalViewProps> = ({
  lessons,
  onClose
}) => {
  const [childData, setChildData] = useState<PortalChildData>(() =>
    parentPortalService.computeChildPortalData(lessons)
  );
  const [portalState, setPortalState] = useState(() => parentPortalService.getState());

  // Link child modal state
  const [showLinkModal, setShowLinkModal] = useState(false);
  const [inputCode, setInputCode] = useState('');
  const [parentEmailModalInput, setParentEmailModalInput] = useState(
    portalState.parentEmail ?? ''
  );
  const [linkConsent, setLinkConsent] = useState(true);
  const [linking, setLinking] = useState(false);
  const [linkError, setLinkError] = useState<string | null>(null);
  const [linkSuccess, setLinkSuccess] = useState<string | null>(null);

  // Weekly digest preview modal
  const [showDigestPreview, setShowDigestPreview] = useState(false);

  // Email sending state
  const [emailSending, setEmailSending] = useState(false);
  const [emailToast, setEmailToast] = useState<string | null>(null);

  useEffect(() => {
    setChildData(parentPortalService.computeChildPortalData(lessons));
    setPortalState(parentPortalService.getState());
  }, [lessons]);

  // Покана от детето (/?code=MP-XXXXXX): отваря свързването с попълнен код
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const invited = new URLSearchParams(window.location.search).get('code');
    if (invited) {
      setInputCode(invited.trim().toUpperCase());
    }
  }, []);

  const digestData = parentPortalService.buildStudentWeeklyDigestData(lessons);
  const digestPreviewHtml = buildWeeklyDigestHtml(digestData);

  const handleSendDigestEmail = async () => {
    const currentEmail = portalState.parentEmail;
    if (!currentEmail) {
      setShowLinkModal(true);
      return;
    }

    setEmailSending(true);
    setEmailToast(null);
    try {
      const res = await mailingService.sendWeeklyDigestEmail({
        toEmail: currentEmail,
        digestData
      });
      setEmailToast(res.message);
      setTimeout(() => setEmailToast(null), 6000);
    } catch {
      setEmailToast('Възникна грешка при изпращане на седмичния отчет.');
    } finally {
      setEmailSending(false);
    }
  };

  const handleLinkStudent = async (e: React.FormEvent) => {
    e.preventDefault();
    setLinkError(null);
    setLinkSuccess(null);

    const normalized = stripStudentCodePrefix(normalizeParentCode(inputCode || portalState.studentCode));
    if (normalized.length < 4) {
      setLinkError('Моля, въведете валиден 6-символен код на ученика (напр. MP-8492AB).');
      return;
    }

    const emailClean = parentEmailModalInput.trim().toLowerCase();
    if (!emailClean || !emailClean.includes('@') || !emailClean.includes('.')) {
      setLinkError('Моля, въведете валиден имейл адрес за получаване на седмичните отчети.');
      return;
    }

    if (!linkConsent) {
      setLinkError('Необходимо е потвърждение за родителски достъп по GDPR.');
      return;
    }

    setLinking(true);
    try {
      const updatedState = parentPortalService.connectParent(emailClean);
      setPortalState(updatedState);
      setChildData(parentPortalService.computeChildPortalData(lessons));

      const sendRes = await mailingService.sendWeeklyDigestEmail({
        toEmail: emailClean,
        digestData
      });

      setLinkSuccess(
        sendRes.deliveredVia === 'resend'
          ? `Успешно свързване! Първият седмичен отчет беше изпратен на ${emailClean}.`
          : `Ученикът (${updatedState.studentCode}) беше свързан успешно с ${emailClean}!`
      );
      setTimeout(() => {
        setShowLinkModal(false);
        setLinkSuccess(null);
      }, 1500);
    } catch {
      setLinkError('Възникна грешка при свързването.');
    } finally {
      setLinking(false);
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Top Header */}
      <div className="flex flex-col justify-between gap-4 rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs sm:flex-row sm:items-center">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            {onClose && (
              <button
                type="button"
                onClick={onClose}
                className="inline-flex items-center gap-1 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-700 transition cursor-pointer mr-1"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                <span>Назад към Моят План</span>
              </button>
            )}
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-100 text-emerald-800">
              <Shield className="h-5 w-5" />
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-slate-900">
              Родителски портал
            </h1>
            <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-800 border border-emerald-200">
              Само аналитика
            </span>
          </div>
          <p className="mt-1.5 text-xs text-slate-500">
            Следи готовността за ДЗИ (Матура) и изпитите на МОН без излишен стрес.
            {portalState.parentEmail ? (
              <span className="ml-2 font-semibold text-emerald-700">
                • Свързан имейл: {maskEmail(portalState.parentEmail)}
              </span>
            ) : null}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setShowDigestPreview(true)}
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-xs font-semibold text-slate-700 shadow-2xs hover:bg-slate-50 transition cursor-pointer"
          >
            <Eye className="h-4 w-4 text-[#0a4b82]" />
            <span>Преглед на дайджеста</span>
          </button>

          <button
            type="button"
            onClick={handleSendDigestEmail}
            disabled={emailSending}
            title="Изпрати седмичен отчет на регистрирания имейл чрез Resend"
            className="inline-flex items-center gap-1.5 rounded-lg border border-emerald-200 bg-emerald-50/70 px-3.5 py-2.5 text-xs font-bold text-emerald-900 shadow-2xs hover:bg-emerald-100 transition cursor-pointer disabled:opacity-50"
          >
            {emailSending ? (
              <Loader2 className="h-4 w-4 animate-spin text-emerald-600" />
            ) : (
              <Mail className="h-4 w-4 text-emerald-600" />
            )}
            <span>Седмичен отчет на имейл</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setInputCode(portalState.studentCode);
              setParentEmailModalInput(portalState.parentEmail ?? '');
              setShowLinkModal(true);
            }}
            className="inline-flex items-center gap-1.5 rounded-lg bg-[#0a4b82] px-4 py-2.5 text-xs font-bold text-white shadow-xs transition hover:bg-[#083c68] cursor-pointer"
          >
            <PlusCircle className="h-4 w-4" />
            <span>{portalState.isConnected ? 'Настройки на връзката' : 'Свържи родител'}</span>
          </button>
        </div>
      </div>

      {emailToast && (
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-3.5 text-xs font-semibold text-emerald-800 flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
          <span>{emailToast}</span>
        </div>
      )}

      {/* Active Student Pill */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-3">
        <div className="flex items-center gap-2.5 rounded-xl border border-emerald-500 bg-emerald-50 px-4 py-2 text-xs font-semibold text-emerald-900 shadow-2xs">
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-200/80 text-xs font-bold text-emerald-800">
            {childData.name.charAt(0) || 'З'}
          </div>
          <span>{childData.name}</span>
          <span className="rounded bg-white px-2 py-0.5 font-mono text-xs font-bold text-slate-700 border border-emerald-200">
            {childData.studentCode}
          </span>
        </div>
      </div>

      {/* Main Analytics View for Active Student */}
      <div className="space-y-6">
        {/* ROW 1: Hero Readiness & Key Scores */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {/* MON Readiness Card */}
          <div className="relative overflow-hidden rounded-2xl border border-emerald-200/80 bg-gradient-to-br from-white to-emerald-50/40 p-6 shadow-xs md:col-span-1">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                Стандарт МОН • ДЗИ
              </span>
              <Award className="h-5 w-5 text-emerald-600" />
            </div>

            <div className="mt-5 text-center">
              <div className="relative inline-flex items-center justify-center">
                <svg className="h-36 w-36 transform -rotate-90">
                  <circle
                    cx="72"
                    cy="72"
                    r="58"
                    stroke="currentColor"
                    strokeWidth="10"
                    className="text-slate-100"
                    fill="transparent"
                  />
                  <circle
                    cx="72"
                    cy="72"
                    r="58"
                    stroke="currentColor"
                    strokeWidth="10"
                    strokeDasharray={2 * Math.PI * 58}
                    strokeDashoffset={2 * Math.PI * 58 * (1 - childData.monReadiness / 100)}
                    strokeLinecap="round"
                    className="text-emerald-700 transition-all duration-1000 ease-out"
                    fill="transparent"
                  />
                </svg>
                <div className="absolute flex flex-col items-center justify-center">
                  <span className="text-3xl font-black text-slate-900 tabular-nums">
                    {childData.monReadiness}%
                  </span>
                  <span className="text-xs font-medium text-slate-500">
                    Готовност
                  </span>
                </div>
              </div>

              <h3 className="mt-3 text-sm font-bold text-slate-900">
                {childData.monReadiness >= 80
                  ? 'Отличен напредък'
                  : childData.monReadiness >= 55
                  ? 'Добро темпо на усвояване'
                  : 'Изисква допълнителна подготовка'}
              </h3>
              <p className="mt-1 text-xs text-slate-500">
                Прогнозна оценка:{' '}
                <strong className="text-emerald-800">
                  {childData.estimatedGrade}
                </strong>
              </p>
            </div>
          </div>

          {/* BEL Subject Card */}
          <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="rounded-xl bg-emerald-50 p-2 text-emerald-800">
                  <BookOpen className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    Български език и лит.
                  </h3>
                  <p className="text-xs text-slate-500">Задължителен ДЗИ (12. клас)</p>
                </div>
              </div>
              <span className="text-lg font-extrabold text-emerald-800 tabular-nums">
                {childData.bel.averagePercent !== null ? `${childData.bel.averagePercent}%` : 'Няма данни'}
              </span>
            </div>

            <div className="mt-6 space-y-3">
              <div>
                <div className="flex justify-between text-xs font-medium text-slate-600 mb-1">
                  <span>Успеваемост по канон и езикова норма</span>
                  <span className="tabular-nums">{childData.bel.averagePercent || 0}%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-slate-100">
                  <div
                    className="h-2 rounded-full bg-[#1ea858] transition-all duration-500"
                    style={{ width: `${childData.bel.averagePercent || 5}%` }}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between rounded-xl bg-emerald-50/50 p-3 text-xs text-slate-600">
                <span>Решени модули и тестове</span>
                <span className="font-bold text-slate-900 tabular-nums">
                  {childData.bel.testsDone}
                </span>
              </div>
            </div>
          </div>

          {/* Second DZI / Math Subject Card */}
          <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="rounded-xl bg-blue-100 p-2 text-blue-700">
                  <Calculator className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    Втори ДЗИ / Профилиращ предмет
                  </h3>
                  <p className="text-xs text-slate-500">Математика, СТЕМ и конспекти МОН</p>
                </div>
              </div>
              <span className="text-lg font-extrabold text-blue-700 tabular-nums">
                {childData.math.averagePercent !== null ? `${childData.math.averagePercent}%` : 'Няма данни'}
              </span>
            </div>

            <div className="mt-6 space-y-3">
              <div>
                <div className="flex justify-between text-xs font-medium text-slate-600 mb-1">
                  <span>Успеваемост по профилиращи теми</span>
                  <span className="tabular-nums">{childData.math.averagePercent || 0}%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-slate-100">
                  <div
                    className="h-2 rounded-full bg-blue-600 transition-all duration-500"
                    style={{ width: `${childData.math.averagePercent || 5}%` }}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between rounded-xl bg-blue-50/50 p-3 text-xs text-slate-600">
                <span>Решени изпитни симулации</span>
                <span className="font-bold text-slate-900 tabular-nums">
                  {childData.math.testsDone}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ROW 2: Weak Areas (Проблемни теми) & Strengths */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Problem Areas */}
          <div className="rounded-2xl border border-rose-200/80 bg-white p-6 shadow-xs">
            <div className="flex items-center gap-2 mb-4">
              <div className="rounded-xl bg-rose-100 p-2 text-rose-700">
                <AlertTriangle className="h-4 w-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  Проблемни зони и пропуски
                </h3>
                <p className="text-xs text-slate-500">
                  Теми от Банката с грешки и симулации под 65%, които изискват затвърждаване
                </p>
              </div>
            </div>

            {childData.weakAreas.length === 0 ? (
              <div className="rounded-2xl bg-slate-50 p-6 text-center text-xs text-slate-500">
                <CheckCircle2 className="mx-auto h-6 w-6 text-emerald-500 mb-2" />
                Няма засечени сериозни пропуски! Ученикът се справя уверено с основните теми за ДЗИ.
              </div>
            ) : (
              <div className="space-y-2.5">
                {childData.weakAreas.map((w, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between rounded-xl border border-rose-100 bg-rose-50/40 p-3 text-xs gap-2"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="rounded bg-rose-200 px-1.5 py-0.5 text-xs font-bold text-rose-800 shrink-0">
                        {w.subject === 'MATH' ? 'ПРОФИЛ' : 'БЕЛ'}
                      </span>
                      <span className="font-medium text-slate-800 truncate">
                        {w.topic}
                      </span>
                    </div>
                    <span className="font-mono font-bold text-rose-700 shrink-0">
                      {w.avgPct}% успеваемост
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Strengths */}
          <div className="rounded-2xl border border-emerald-200/80 bg-white p-6 shadow-xs">
            <div className="flex items-center gap-2 mb-4">
              <div className="rounded-xl bg-emerald-100 p-2 text-emerald-800">
                <CheckCircle2 className="h-4 w-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  Силни страни и усвоени модули
                </h3>
                <p className="text-xs text-slate-500">
                  Теми и автори от канона с резултат 80% или по-висок
                </p>
              </div>
            </div>

            {childData.strengths.length === 0 ? (
              <div className="rounded-2xl bg-slate-50 p-6 text-center text-xs text-slate-500">
                Решете повече тестове и отметнете научените автори за формиране на категорични силни страни.
              </div>
            ) : (
              <div className="space-y-2.5">
                {childData.strengths.map((s, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between rounded-xl border border-emerald-100 bg-emerald-50/40 p-3 text-xs gap-2"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="rounded bg-emerald-200 px-1.5 py-0.5 text-xs font-bold text-emerald-800 shrink-0">
                        {s.subject === 'MATH' ? 'ПРОФИЛ' : 'БЕЛ'}
                      </span>
                      <span className="font-medium text-slate-800 truncate">
                        {s.topic}
                      </span>
                    </div>
                    <span className="font-mono font-bold text-emerald-800 shrink-0">
                      {s.avgPct}% овладяно
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* TOPIC MASTERY FEED: Индивидуално овладяване на конспекта по МОН */}
        <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
            <div className="flex items-center gap-2.5">
              <div className="rounded-xl bg-[#eef5fb] p-2 text-[#0a4b82]">
                <Lightbulb className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  Учебен конспект на МОН за ДЗИ (Овладяване на темите)
                </h3>
                <p className="text-xs text-slate-500">
                  Следене напредъка по задължителния Литературен канон (15 автори) и профилиращите ядра по МОН
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="rounded-xl bg-emerald-50 px-3 py-1 text-xs font-black text-emerald-800">
                Овладени: {childData.topicMastery.masteredCount} от {childData.topicMastery.totalCurriculumTopics} основни теми
              </span>
            </div>
          </div>

          {/* Overall Curriculum Progress Bar */}
          <div className="mt-4 rounded-2xl bg-slate-50/70 p-4 border border-slate-100">
            <div className="flex justify-between text-xs font-bold text-slate-700 mb-1.5">
              <span>Обща готовност по изпитния конспект за ДЗИ</span>
              <span className="text-[#0a4b82] font-black tabular-nums">
                {childData.topicMastery.overallProgressPct}%
              </span>
            </div>
            <div className="h-2.5 w-full rounded-full bg-slate-200 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#0a4b82] to-[#1ea858] transition-all duration-700"
                style={{ width: `${childData.topicMastery.overallProgressPct}%` }}
              />
            </div>
            <div className="mt-2 flex items-center justify-between text-xs text-slate-500">
              <span>Държавни образователни стандарти на МОН</span>
              <span>Цел: Отличен (6.00) на матурата</span>
            </div>
          </div>

          {/* 2 Columns: Recently Mastered Topics vs Recommended for Review */}
          <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
            {/* Column 1: Последно овладени теми */}
            <div className="space-y-3">
              <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-800">
                <CheckCircle2 className="h-4 w-4" />
                <span>Последно овладени теми и автори (100% готовност)</span>
              </div>

              {childData.topicMastery.recentlyMastered.length === 0 ? (
                <div className="rounded-2xl border border-slate-100 bg-slate-50/50 p-5 text-center text-xs text-slate-500">
                  След преминаване на теорията, Leitner флаш картите и теста, овладените теми се появяват тук.
                </div>
              ) : (
                <div className="space-y-2">
                  {childData.topicMastery.recentlyMastered.map((topic, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between rounded-xl border border-emerald-100 bg-emerald-50/30 p-3 text-xs"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <span className="grid h-7 w-7 place-items-center rounded-lg bg-emerald-100 text-sm shrink-0">
                          {topic.badgeIcon}
                        </span>
                        <div className="min-w-0">
                          <p className="font-bold text-slate-900 truncate">
                            {topic.title}
                          </p>
                          <p className="text-xs text-slate-500">
                            Значка: {topic.badgeName}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0 ml-2">
                        <span
                          className={`rounded px-1.5 py-0.5 text-xs font-bold uppercase ${
                            topic.subject === 'math'
                              ? 'bg-[#eef5fb] text-[#0a4b82]'
                              : 'bg-emerald-50 text-emerald-800'
                          }`}
                        >
                          {topic.subject === 'math' ? 'ПРОФИЛ' : 'БЕЛ'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Column 2: Препоръчано за преговор */}
            <div className="space-y-3">
              <div className="flex items-center gap-1.5 text-xs font-bold text-amber-700">
                <AlertTriangle className="h-4 w-4" />
                <span>Препоръчано за преговор (от Банката с грешки)</span>
              </div>

              {childData.topicMastery.needsReview.length === 0 ? (
                <div className="rounded-2xl border border-slate-100 bg-slate-50/50 p-5 text-center text-xs text-slate-500">
                  <CheckCircle2 className="mx-auto h-5 w-5 text-emerald-500 mb-1" />
                  Всички взети тестове са без активни грешки. Няма теми със затруднения.
                </div>
              ) : (
                <div className="space-y-2">
                  {childData.topicMastery.needsReview.map((topic, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between rounded-xl border border-amber-200/80 bg-amber-50/40 p-3 text-xs"
                    >
                      <div className="min-w-0 pr-2">
                        <div className="flex items-center gap-2">
                          <span
                            className={`rounded px-1.5 py-0.5 text-xs font-bold uppercase ${
                              topic.subject === 'math'
                                ? 'bg-[#eef5fb] text-[#0a4b82]'
                                : 'bg-emerald-50 text-emerald-800'
                            }`}
                          >
                            {topic.subject === 'math' ? 'ПРОФИЛ' : 'БЕЛ'}
                          </span>
                          <p className="font-bold text-slate-900 truncate">
                            {topic.title}
                          </p>
                        </div>
                        <p className="mt-0.5 text-xs text-amber-800">
                          {topic.reason}
                        </p>
                      </div>

                      <div className="shrink-0 text-right">
                        <span className="rounded-md bg-amber-100 px-2 py-0.5 text-xs font-black text-amber-800">
                          За преговор
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ROW 3: Timeline of Test Attempts (Хронология на тестовете) */}
        <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-[#0a4b82]" />
              <h3 className="text-sm font-bold text-slate-900">
                Хронология на активността и изпитните симулации
              </h3>
            </div>
            <span className="text-xs text-slate-500">
              Общо {childData.totalTestsDone} решени модула/симулации
            </span>
          </div>

          {childData.recentAttempts.length === 0 ? (
            <div className="rounded-2xl bg-slate-50 p-8 text-center text-xs text-slate-500">
              Ученикът все още не е предал пълна 100-точкова симулация в това устройство. Когато реши изпитен вариант, резултатите ще се появят тук в реално време.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500">
                    <th className="pb-3 font-semibold">Дата</th>
                    <th className="pb-3 font-semibold">Направление</th>
                    <th className="pb-3 font-semibold">Тема / Изпитен вариант</th>
                    <th className="pb-3 font-semibold text-center">Точки</th>
                    <th className="pb-3 font-semibold text-right">Успеваемост</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {childData.recentAttempts.map((attempt) => (
                    <tr key={attempt.id} className="hover:bg-slate-50/50">
                      <td className="py-3 text-slate-500">
                        {new Date(attempt.completedAt).toLocaleDateString('bg-BG', {
                          day: '2-digit',
                          month: 'short',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </td>
                      <td className="py-3">
                        <span
                          className={`rounded px-2 py-0.5 text-xs font-bold ${
                            attempt.subject === 'MATH'
                              ? 'bg-[#eef5fb] text-[#0a4b82]'
                              : 'bg-emerald-50 text-emerald-800'
                          }`}
                        >
                          {attempt.subject === 'MATH' ? 'Профил / СТЕМ' : 'ДЗИ БЕЛ'}
                        </span>
                      </td>
                      <td className="py-3 font-medium text-slate-900">
                        {attempt.topic}
                      </td>
                      <td className="py-3 text-center font-mono text-slate-600">
                        {attempt.score} / {attempt.maxScore}
                      </td>
                      <td className="py-3 text-right">
                        <span
                          className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${
                            attempt.scorePercent >= 80
                              ? 'bg-emerald-100 text-emerald-800'
                              : attempt.scorePercent >= 50
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-rose-100 text-rose-800'
                          }`}
                        >
                          {attempt.scorePercent}%
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* MODAL: Link Student / Configure Parent Email */}
      {showLinkModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
          <div className="relative w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-xl">
            <button
              type="button"
              aria-label="Затвори прозореца за свързване"
              onClick={() => {
                setShowLinkModal(false);
                setLinkError(null);
                setLinkSuccess(null);
              }}
              className="absolute right-4 top-4 rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600 cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex items-center gap-2.5 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#eef5fb] text-[#0a4b82]">
                <KeyRound className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Свързване на родителски имейл с код
                </h3>
                <p className="text-xs text-slate-500">
                  Активирай седмичния аналитичен дайджест по стандартите на МОН
                </p>
              </div>
            </div>

            <form onSubmit={handleLinkStudent} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">
                  Код на ученика
                </label>
                <input
                  type="text"
                  value={inputCode}
                  onChange={(e) => setInputCode(e.target.value.toUpperCase())}
                  placeholder={portalState.studentCode}
                  maxLength={9}
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 font-mono text-sm tracking-wider uppercase text-slate-900 focus:border-[#0a4b82] focus:outline-none focus:ring-2 focus:ring-[#0a4b82]/20"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">
                  Имейл на родителя за седмичния отчет
                </label>
                <span id="modal-parent-email-hint" className="block text-[11px] text-slate-500 mb-1">
                  Формат: roditel@example.bg
                </span>
                <input
                  type="email"
                  required
                  autoComplete="email"
                  aria-describedby="modal-parent-email-hint"
                  value={parentEmailModalInput}
                  onChange={(e) => setParentEmailModalInput(e.target.value)}
                  placeholder="напр. roditel@example.bg"
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 focus:border-[#0a4b82] focus:outline-none focus:ring-2 focus:ring-[#0a4b82]/20 user-invalid:border-rose-500 user-valid:border-emerald-500"
                />
              </div>

              <label className="flex items-start gap-2.5 rounded-xl bg-slate-50 border border-slate-200 p-3 text-xs text-slate-600 cursor-pointer">
                <input
                  type="checkbox"
                  checked={linkConsent}
                  onChange={(e) => setLinkConsent(e.target.checked)}
                  className="mt-0.5 rounded border-slate-300 text-[#0a4b82] focus:ring-[#0a4b82]"
                />
                <span>
                  Потвърждавам, че съм родител/настойник на ученика и желая да получавам седмични отчети за напредъка по ДЗИ съгласно правилата за поверителност (GDPR).
                </span>
              </label>

              {linkError && (
                <p className="text-xs font-semibold text-rose-600">{linkError}</p>
              )}
              {linkSuccess && (
                <p className="text-xs font-semibold text-emerald-700">{linkSuccess}</p>
              )}

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowLinkModal(false)}
                  className="flex-1 rounded-lg border border-slate-300 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer"
                >
                  Отказ
                </button>
                <button
                  type="submit"
                  disabled={linking}
                  className="flex-1 rounded-lg bg-[#0a4b82] py-2.5 text-xs font-bold text-white shadow-xs hover:bg-[#083c68] disabled:opacity-50 cursor-pointer"
                >
                  {linking ? <Loader2 className="h-4 w-4 animate-spin mx-auto" /> : 'Свържи и изпрати отчет'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: Preview Weekly Digest HTML (buildWeeklyDigestHtml) */}
      {showDigestPreview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
          <div className="relative w-full max-w-2xl max-h-[90vh] flex flex-col rounded-2xl border border-slate-200 bg-white shadow-xl overflow-hidden">
            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4 bg-slate-50">
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  Преглед на Родителския седмичен дайджест (HTML шаблон)
                </h3>
                <p className="text-xs text-slate-500">
                  Генериран от buildWeeklyDigestHtml за {digestData.studentName} (Седмица {digestData.weekNumber})
                </p>
              </div>
              <button
                type="button"
                aria-label="Затвори прегледа на седмичния дайджест"
                onClick={() => setShowDigestPreview(false)}
                className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-200 hover:text-slate-700 cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto bg-slate-100 p-4">
              <div
                className="mx-auto max-w-[600px]"
                dangerouslySetInnerHTML={{ __html: digestPreviewHtml }}
              />
            </div>
            <div className="flex items-center justify-between border-t border-slate-200 px-6 py-3.5 bg-white">
              <span className="text-xs text-slate-500">
                Готов за изпращане чрез Resend (/api/send-email)
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setShowDigestPreview(false)}
                  className="rounded-lg border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer"
                >
                  Затвори
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowDigestPreview(false);
                    void handleSendDigestEmail();
                  }}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 px-4 py-2 text-xs font-bold text-white cursor-pointer"
                >
                  <Mail className="h-3.5 w-3.5" />
                  <span>Изпрати на имейл</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
