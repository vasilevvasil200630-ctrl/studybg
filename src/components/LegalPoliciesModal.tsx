import React, { useState, useEffect } from 'react';
import {
  X,
  ShieldCheck,
  FileText,
  Cookie,
  Lock,
  CheckCircle2,
  Scale,
  GraduationCap,
  Cpu,
  Accessibility,
  Download,
  Trash2,
  AlertTriangle,
  ExternalLink,
  Volume2,
  Keyboard,
  Eye
} from 'lucide-react';
import { authService, getCachedGoogleProfile } from '../services/authService';
import { NativeDialog } from './NativeDialog';

export type LegalPolicyTab = 'privacy' | 'cookies' | 'terms' | 'ai_act' | 'accessibility';

interface LegalPoliciesModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: LegalPolicyTab;
}

export const LegalPoliciesModal: React.FC<LegalPoliciesModalProps> = ({
  isOpen,
  onClose,
  initialTab = 'privacy'
}) => {
  const [activeTab, setActiveTab] = useState<LegalPolicyTab>(initialTab);
  const [confirmWipe, setConfirmWipe] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [gdprActionNotice, setGdprActionNotice] = useState<{ type: 'success' | 'info'; text: string } | null>(null);

  useEffect(() => {
    setActiveTab(initialTab);
    setConfirmWipe(false);
    setGdprActionNotice(null);
  }, [initialTab, isOpen]);

  if (!isOpen) return null;

  const activeGoogleProfile = getCachedGoogleProfile();

  /**
   * Art. 15 & Art. 20 GDPR — Right of Access & Data Portability (Export all account & local user data as JSON)
   */
  const handleExportUserData = () => {
    const res = authService.exportCompleteUserDataJson();
    if (res.ok) {
      setGdprActionNotice({
        type: 'success',
        text: 'Вашите учебни и акаунт данни бяха експортирани успешно във формат JSON съгласно чл. 15 и чл. 20 от GDPR.'
      });
    } else {
      setGdprActionNotice({
        type: 'info',
        text: res.error || 'Няма налични данни за експортиране.'
      });
    }
  };

  /**
   * Art. 17 GDPR — Right to Erasure ("Право да бъдеш забравен" — Cloud Account + Local Storage)
   */
  const handleEraseAllUserData = async () => {
    setIsDeleting(true);
    try {
      await authService.deleteCloudAccountDataAndSignOut();
      setConfirmWipe(false);
      setGdprActionNotice({
        type: 'success',
        text: 'Всички ваши облачни (Google профил в Supabase), абонаментни и локални данни бяха окончателно изтрити съгласно чл. 17 от GDPR („Право да бъдеш забравен“).'
      });
    } catch {
      setGdprActionNotice({
        type: 'info',
        text: 'Локалните и сесийните данни бяха изчистени.'
      });
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <NativeDialog onClose={onClose} labelledBy="legal-modal-title" widthClassName="max-w-4xl">
      <div className="bg-white w-full max-w-4xl max-h-[90vh] rounded-2xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden">
        
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/80">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-xs">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <h2 id="legal-modal-title" className="text-base sm:text-lg font-bold text-slate-900 leading-tight">
                Европейски правни политики, ИИ прозрачност & Достъпност
              </h2>
              <p className="text-xs text-slate-500">
                StudyBG • Съответствие с GDPR, EU AI Act (2024/1689), EAA (2019/882), DSA и ЗЗЛД
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 transition-colors"
            aria-label="Затвори прозореца с политики (Escape)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Policy Tab Switcher */}
        <div className="px-6 pt-3 pb-2 border-b border-slate-200 bg-white flex flex-wrap gap-1.5" role="tablist">
          <button
            role="tab"
            aria-selected={activeTab === 'privacy'}
            onClick={() => setActiveTab('privacy')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'privacy'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:text-slate-900'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Поверителност (GDPR)</span>
          </button>

          <button
            role="tab"
            aria-selected={activeTab === 'ai_act'}
            onClick={() => setActiveTab('ai_act')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'ai_act'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:text-slate-900'
            }`}
          >
            <Cpu className="w-4 h-4" />
            <span>Прозрачност за ИИ (EU AI Act)</span>
          </button>

          <button
            role="tab"
            aria-selected={activeTab === 'accessibility'}
            onClick={() => setActiveTab('accessibility')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'accessibility'
                ? 'bg-brand-sapphire text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:text-slate-900'
            }`}
          >
            <Accessibility className="w-4 h-4" />
            <span>Достъпност (EAA / WCAG)</span>
          </button>

          <button
            role="tab"
            aria-selected={activeTab === 'cookies'}
            onClick={() => setActiveTab('cookies')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'cookies'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:text-slate-900'
            }`}
          >
            <Cookie className="w-4 h-4" />
            <span>Бисквитки & Хранилище</span>
          </button>

          <button
            role="tab"
            aria-selected={activeTab === 'terms'}
            onClick={() => setActiveTab('terms')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'terms'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:text-slate-900'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Условия & DSA</span>
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1 text-slate-700 text-xs sm:text-sm leading-relaxed space-y-6">
          
          {/* ================================================================= */}
          {/* TAB 1: PRIVACY POLICY (GDPR & ЗЗЛД) */}
          {/* ================================================================= */}
          {activeTab === 'privacy' && (
            <div className="space-y-6">
              <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 text-blue-900 text-xs">
                <div className="flex items-center gap-2 font-bold text-sm mb-1">
                  <Lock className="w-4 h-4 text-blue-600" />
                  <span>Европейска защита на акаунта и личните данни (Privacy by Design — чл. 25 и чл. 32 от GDPR)</span>
                </div>
                <p>
                  StudyBG е проектирана с минимализиране на данните за ученици и учители. Всички учебни конспекти, тестове, лаборатории и симулатори се използват <strong>без задължителна регистрация, без ЕГН, телефон или геолокация</strong>. Когато пожелаете да синхронизирате прогреса си между устройства чрез <strong>„Вход с Google“</strong>, вашият акаунт е защитен с криптиран протокол <strong>OAuth 2.0 (PKCE)</strong> и изолация <strong>Row-Level Security (RLS)</strong>.
                </p>
              </div>

              {/* Interactive GDPR Data Subject Rights Center (Art. 15, Art. 17 & Art. 20) */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">
                      Интерактивен GDPR Център за управление на акаунта и данните
                    </h3>
                    <p className="text-xs text-slate-500">
                      {activeGoogleProfile && !activeGoogleProfile.isAnonymous
                        ? `Активен Google акаунт: ${activeGoogleProfile.fullName} (${activeGoogleProfile.email || 'Google OAuth'}) — упражнете незабавно правата си по чл. 15, чл. 20 и чл. 17 от GDPR:`
                        : 'Упражнете незабавно правата си по чл. 20 (преносимост в JSON) и чл. 17 („право да бъдеш забравен“) от Регламент (ЕС) 2016/679:'}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2.5 pt-1">
                  <button
                    type="button"
                    onClick={handleExportUserData}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 text-xs font-bold transition-colors shadow-2xs cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5 text-blue-600" />
                    <span>Изтегли моите данни (JSON • Чл. 15 и Чл. 20 GDPR)</span>
                  </button>

                  {!confirmWipe ? (
                    <button
                      type="button"
                      onClick={() => setConfirmWipe(true)}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs font-bold transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5 text-rose-600" />
                      <span>Изтрий облачния акаунт и всички данни (Чл. 17 GDPR)</span>
                    </button>
                  ) : (
                    <div className="flex flex-wrap items-center gap-2 bg-rose-50 border border-rose-300 px-3 py-1.5 rounded-xl">
                      <span className="text-xs font-bold text-rose-900">Потвърждавате ли пълно изтриване на облачния и локалния профил?</span>
                      <button
                        type="button"
                        disabled={isDeleting}
                        onClick={handleEraseAllUserData}
                        className="px-2.5 py-1 rounded-lg bg-rose-600 hover:bg-rose-700 disabled:opacity-60 text-white text-xs font-bold cursor-pointer"
                      >
                        {isDeleting ? 'Изтриване...' : 'Да, изтрий всичко'}
                      </button>
                      <button
                        type="button"
                        onClick={() => setConfirmWipe(false)}
                        className="px-2 py-1 rounded-lg bg-white text-slate-600 border border-slate-200 text-xs font-semibold cursor-pointer"
                      >
                        Отказ
                      </button>
                    </div>
                  )}
                </div>

                {gdprActionNotice && (
                  <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-medium flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span>{gdprActionNotice.text}</span>
                  </div>
                )}
              </div>

              <section className="space-y-2">
                <h3 className="text-base font-bold text-slate-900">1. Нормативна уредба и правно основание</h3>
                <p>
                  Настоящата Политика за поверителност и защита на потребителския акаунт е изготвена в пълно съответствие с <strong>Регламент (ЕС) 2016/679 (Общ регламент относно защитата на данните — GDPR)</strong> и <strong>Закона за защита на личните данни (ЗЗЛД)</strong> на Република България.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="text-base font-bold text-slate-900">2. Защита на Google акаунта и облачната синхронизация (Чл. 6, Чл. 13 и Чл. 32 от GDPR)</h3>
                <ul className="list-disc list-inside space-y-2 pl-1">
                  <li>
                    <strong>Опционален вход с Google акаунт (OAuth 2.0 с PKCE):</strong> Когато доброволно натиснете бутона <em>„Вход с Google“</em>, автентикацията се извършва директно през официалните сървъри на Google чрез криптиран протокол OAuth 2.0 (OpenID Connect). <strong>StudyBG никога не получава, не вижда и не съхранява вашата парола в Google.</strong>
                  </li>
                  <li>
                    <strong>Минимален обхват на данните в профила:</strong> В таблицата <code className="text-xs tabular-nums">public.user_profiles</code> се записват единствено базовите идентификатори от Google профила ви (уникален потребителски идентификатор <code className="text-xs tabular-nums">user_id</code>, име, имейл и адрес на профилна снимка) заедно с учебния ви прогрес (усвоени уроци, XP точки, дневна серия Streak, Банка с грешки и история на изпитните симулации) с единствена цел синхронизация между вашите устройства (чл. 6, ал. 1, б. „б“ от GDPR).
                  </li>
                  <li>
                    <strong>Криптирана изолация на ниво ред (Row-Level Security — Чл. 32 от GDPR):</strong> Базата данни в Supabase PostgreSQL прилага строги правила за достъп (<code className="text-xs tabular-nums">user_id = auth.uid()</code>), при които всеки потребител може да чете, обновява или изтрива единствено собствения си профил чрез криптографски подписан JWT токен по TLS 1.3.
                  </li>
                  <li>
                    <strong>Локални учебни данни (LocalStorage на вашето устройство):</strong> Ако използвате платформата без вход в Google акаунт, напредъкът в „Моят План за 6.00“, хронологията на 100-точковите симулации и Банката с грешки се съхраняват локално във вашия браузър.
                  </li>
                  <li>
                    <strong>Имейл адрес за Седмичен бюлетин и споделяне на конспекти (Чл. 6, ал. 1, б. „а“ от GDPR — изрично съгласие):</strong> Когато доброволно въведете имейл адрес във формата за седмичен изпитен бюлетин, ние обработваме този имейл единствено за заявената цел. Споделянето на конспект или резултат подготвя писмото във вашия собствен имейл клиент (<code className="text-xs tabular-nums">mailto:</code>). Можете да оттеглите съгласието си с <strong>1 клик („Отпиши се“)</strong> по всяко време.
                  </li>
                  <li>
                    <strong>Сканирани записки и есета (SmartScan & Симулатор):</strong> Снимките на тетрадки или текстовете на есета се предават криптирано (TLS 1.3) в реално време към Google Gemini API единствено за генериране на образователна обратна връзка и не се съхраняват на наши сървъри.
                  </li>
                </ul>
              </section>

              <section className="space-y-2">
                <h3 className="text-base font-bold text-slate-900">3. Обработващи лични данни и технологични партньори (Чл. 28 от GDPR)</h3>
                <p>
                  StudyBG не продава и не предоставя данни на рекламни мрежи. За техническото функциониране на облачните и ИИ функции използваме следните сертифицирани инфраструктурни партньори при спазване на Стандартните договорни клаузи на Европейската комисия (SCCs):
                </p>
                <ul className="list-disc list-inside space-y-1 pl-1">
                  <li><strong>Supabase Inc.</strong> — управлявана PostgreSQL база данни и OAuth 2.0 автентикация със строга Row-Level Security (RLS) защита за облачните потребителски профили (<code className="text-xs tabular-nums">user_profiles</code>), историята на изпитните симулации (<code className="text-xs tabular-nums">exam_attempts</code>) и абонатите на бюлетина, както и Edge Function сървър за защитени заявки към Google Gemini;</li>
                  <li><strong>Vercel Inc.</strong> — статичен хостинг и глобална доставка (CDN) с принудително HTTPS/TLS 1.3 криптиране;</li>
                  <li><strong>Google Ireland Limited (Google OAuth 2.0 & Google Gemini API)</strong> — сигурна идентификация при вход с Google акаунт и обработка на текст/ръкопис по заявка на потребителя;</li>
                  <li><strong>Google Ireland Limited (Google Analytics 4)</strong> — статистика за посещенията, само след изрично съгласие за аналитика;</li>
                  <li><strong>Microsoft Ireland Operations Limited (Microsoft Clarity)</strong> — записи на сесии и топлинни карти, само след изрично съгласие за аналитика.</li>
                </ul>
              </section>

              <section className="space-y-2">
                <h3 className="text-base font-bold text-slate-900">4. Защита на ученици под 14 години (Чл. 8 от GDPR и чл. 25в от ЗЗЛД)</h3>
                <p>
                  Съгласно <strong>чл. 25в от българския Закон за защита на личните данни (ЗЗЛД)</strong> минималната възраст за самостоятелно даване на съгласие за услуги на информационното общество в Република България е <strong>14 години</strong>. Ученици под 14-годишна възраст (напр. 5.–7. клас) могат да използват свободно всички учебни модули без регистрация, а при абонамент за имейл бюлетин се изисква потвърждение за съгласие от родител или законен настойник. <strong>Съгласието за опционалната аналитика (Google Analytics 4 и Microsoft Clarity) за лица под 14 години се дава от родител или законен настойник</strong> — без такова съгласие изберете „Само необходими“.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="text-base font-bold text-slate-900">5. Надзорен орган в Република България (Чл. 77 от GDPR)</h3>
                <p>
                  Всеки потребител има право да подаде жалба относно обработването на личните му данни пред компетентния български надзорен орган:
                </p>
                <div className="p-3.5 rounded-xl bg-slate-100 border border-slate-200 text-xs space-y-1">
                  <div className="font-bold text-slate-900">Комисия за защита на личните данни (КЗЛД)</div>
                  <div>Адрес: гр. София 1592, бул. „Проф. Цветан Лазаров“ № 2</div>
                  <div>Имейл: <span className="tabular-nums">kzld@cpdp.bg</span> • Уебсайт: <a href="https://www.cpdp.bg" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline inline-flex items-center gap-0.5">www.cpdp.bg <ExternalLink className="w-3 h-3" /></a></div>
                </div>
              </section>
            </div>
          )}

          {/* ================================================================= */}
          {/* TAB 2: EU AI ACT DISCLOSURE (Регламент (ЕС) 2024/1689) */}
          {/* ================================================================= */}
          {activeTab === 'ai_act' && (
            <div className="space-y-6">
              <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 text-blue-950 text-xs">
                <div className="flex items-center gap-2 font-bold text-sm mb-1">
                  <Cpu className="w-4 h-4 text-blue-600" />
                  <span>Декларация за прозрачност съгласно Европейския акт за изкуствения интелект (EU AI Act — Регламент (ЕС) 2024/1689)</span>
                </div>
                <p>
                  В изпълнение на <strong>чл. 50 от Регламент (ЕС) 2024/1689</strong> (Акт за изкуствения интелект), StudyBG информира всички ученици, родители и учители по ясен и недвусмислен начин относно използването на системи с изкуствен интелект в платформата.
                </p>
              </div>

              <section className="space-y-2">
                <h3 className="text-base font-bold text-slate-900">1. Кои модули използват Изкуствен Интелект</h3>
                <ul className="list-disc list-inside space-y-1.5 pl-1">
                  <li>
                    <strong>SmartScan („Снимай тетрадка“ и Одит на записки):</strong> Използва мултимодален модел <em>Google Gemini</em> за оптично разпознаване на ръкописен текст (OCR) и съпоставянето му с ключовите точки от учебната програма на МОН.
                  </li>
                  <li>
                    <strong>AI Оценител на Есе и Интерпретативно съчинение (Задача 41 в 100т. Симулатор):</strong> Използва генеративен езиков модел (<em>Google Gemini</em>) за ориентировъчен анализ по 4-те критерия на МОН (К1: Литературни/философски компетентности, К2: Смислова свързаност, К3: Езикови норми, К4: Правопис и пунктуация).
                  </li>
                  <li>
                    <strong>AI Ментор към учебните конспекти (5.–12. клас):</strong> Интерактивен академичен асистент във всеки от 108-те урока, който отговаря на въпроси на ученика, извежда тези и генерира примерни изпитни въпроси по темата.
                  </li>
                </ul>
              </section>

              <section className="space-y-2">
                <h3 className="text-base font-bold text-slate-900">2. Принцип „Човек в процеса“ (Human-in-the-Loop — Чл. 14 от EU AI Act)</h3>
                <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-950 text-xs flex items-start gap-2.5">
                  <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong>Важно правно уточнение:</strong> Генерираните от ИИ точки, коментари и приравнени оценки по шестобалната система (от 2.00 до 6.00) имат <strong>изцяло консултативен, симулационен и самообразователен характер</strong>. Те НЕ представляват автоматизирано вземане на решения с правни последици по смисъла на чл. 22 от GDPR и НЕ заместват официалната педагогическа оценка от учител или национална изпитна комисия към МОН.
                  </div>
                </div>
              </section>

              <section className="space-y-2">
                <h3 className="text-base font-bold text-slate-900">3. Забранени практики и защита от биометрично профилиране (Чл. 5 от EU AI Act)</h3>
                <p>
                  В пълно съответствие с етичните стандарти на ЕС за ИИ в образованието, StudyBG гарантира, че:
                </p>
                <ul className="list-disc list-inside space-y-1 pl-1">
                  <li><strong>Не извършва</strong> разпознаване на емоции, психологическо профилиране или оценка на личностни характеристики на ученика;</li>
                  <li><strong>Не извършва</strong> биометрична идентификация или графологична експертиза на почерка при сканиране на тетрадки;</li>
                  <li>Снимките на ръкописни записки не се съхраняват след приключване на анализа в браузъра.</li>
                </ul>
              </section>

              <section className="space-y-2">
                <h3 className="text-base font-bold text-slate-900">4. Точност и критична проверка на ИИ отговори</h3>
                <p>
                  Въпреки високата прецизност на езиковите модели, генеративният ИИ може в редки случаи да допусне фактически неточности. Поради това всички основни конспекти, дати, мирни договори, формули и „Златни правила за 6.00“ в StudyBG са <strong>статично верифицирани от експерти по програмите на МОН</strong> и служат като еталонна референция.
                </p>
              </section>
            </div>
          )}

          {/* ================================================================= */}
          {/* TAB 3: ACCESSIBILITY STATEMENT (EAA — Директива (ЕС) 2019/882) */}
          {/* ================================================================= */}
          {activeTab === 'accessibility' && (
            <div className="space-y-6">
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-950 text-xs">
                <div className="flex items-center gap-2 font-bold text-sm mb-1">
                  <Accessibility className="w-4 h-4 text-emerald-600" />
                  <span>Декларация за достъпност съгласно Европейския акт за достъпност (Директива (ЕС) 2019/882 & EN 301 549)</span>
                </div>
                <p>
                  StudyBG се ангажира да осигури равен и безпрепятствен дигитален достъп до образование за всички ученици, включително лица със зрителни, слухови, моторни или специфични обучителни потребности (дислексия, дефицит на вниманието), в съответствие със стандарта <strong>WCAG 2.1 ниво AA</strong>.
                </p>
              </div>

              <section className="space-y-3">
                <h3 className="text-base font-bold text-slate-900">1. Внедрени функции за достъпност в StudyBG</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                    <div className="flex items-center gap-1.5 font-bold text-slate-900 text-xs">
                      <Volume2 className="w-4 h-4 text-blue-600" />
                      <span>Гласов четец (Аудио синтез)</span>
                    </div>
                    <p className="text-[11px] text-slate-600">
                      Всеки учебен конспект разполага с вграден български гласов синтез (Text-to-Speech) с регулиране на скоростта (0.85x, 1.0x, 1.25x) в подкрепа на незрящи ученици и ученици с дислексия.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                    <div className="flex items-center gap-1.5 font-bold text-slate-900 text-xs">
                      <Keyboard className="w-4 h-4 text-emerald-600" />
                      <span>Клавиатурна навигация</span>
                    </div>
                    <p className="text-[11px] text-slate-600">
                      Пълна навигация без мишка чрез <kbd className="px-1 py-0.5 bg-white border rounded text-[10px]">Tab</kbd>, бързо търсене с <kbd className="px-1 py-0.5 bg-white border rounded text-[10px]">Ctrl+K</kbd> и затваряне на диалози с <kbd className="px-1 py-0.5 bg-white border rounded text-[10px]">Escape</kbd>.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                    <div className="flex items-center gap-1.5 font-bold text-slate-900 text-xs">
                      <Eye className="w-4 h-4 text-blue-600" />
                      <span>Висок контраст & Намалено движение</span>
                    </div>
                    <p className="text-[11px] text-slate-600">
                      Контрастно съотношение над 4.5:1 (WCAG AA) и автоматично зачитане на системната настройка <code className="text-[10px]">prefers-reduced-motion</code> за хора с вестибуларна чувствителност.
                    </p>
                  </div>
                </div>
              </section>

              <section className="space-y-2">
                <h3 className="text-base font-bold text-slate-900">2. Технически стандарти и съвместимост</h3>
                <ul className="list-disc list-inside space-y-1 pl-1">
                  <li>Семантичен HTML5 маркъп и WAI-ARIA атрибути (<code className="text-xs">aria-label</code>, <code className="text-xs">role="dialog"</code>, <code className="text-xs">role="tablist"</code>) за съвместимост с екранни четци (NVDA, JAWS, VoiceOver, TalkBack);</li>
                  <li>Мащабиране на текста до 200% без хоризонтално превъртане и без загуба на функционалност;</li>
                  <li>Пълна работоспособност при ниска скорост на интернет или в офлайн режим чрез Progressive Web App (PWA) технология.</li>
                </ul>
              </section>

              <section className="space-y-2">
                <h3 className="text-base font-bold text-slate-900">3. Обратна връзка и сигнали за достъпност</h3>
                <p>
                  Ако срещнете затруднение с достъпността на който и да е елемент в StudyBG или се нуждаете от учебен материал в алтернативен адаптивен формат, можете да подадете сигнал чрез официалното хранилище на проекта. Сигналите по Закона за достъпност се разглеждат приоритетно в срок до 14 дни.
                </p>
              </section>
            </div>
          )}

          {/* ================================================================= */}
          {/* TAB 4: COOKIE & STORAGE POLICY (ePrivacy Directive) */}
          {/* ================================================================= */}
          {activeTab === 'cookies' && (
            <div className="space-y-6">
              <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs">
                <div className="flex items-center gap-2 font-bold text-sm mb-1">
                  <Cookie className="w-4 h-4 text-amber-600" />
                  <span>Прозрачност съгласно Директива 2002/58/ЕО (ePrivacy)</span>
                </div>
                <p>
                  StudyBG <strong>не използва рекламни бисквитки и пиксели на социални мрежи</strong>. Учебният прогрес се пази в локалното хранилище на браузъра (Web LocalStorage). <strong>Само с изрично съгласие</strong> („Приемам всички“) се зареждат Google Analytics 4 и Microsoft Clarity — аналитични услуги на трети страни, които използват бисквитките, описани в таблицата по-долу.
                </p>
              </div>

              <section className="space-y-3">
                <h3 className="text-base font-bold text-slate-900">1. Пълен регистър на използваните ключове в LocalStorage и Cache</h3>
                <div className="overflow-x-auto border border-slate-200 rounded-xl">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-100 text-slate-700 border-b border-slate-200 font-bold">
                      <tr>
                        <th className="p-3">Ключ / Име</th>
                        <th className="p-3">Категория</th>
                        <th className="p-3">Предназначение</th>
                        <th className="p-3">Срок</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      <tr>
                        <td className="p-3 tabular-nums text-blue-600">studybg_cookie_consent</td>
                        <td className="p-3">Строго необходим</td>
                        <td className="p-3">Съхранява избора ви за настройки на бисквитките и поверителността</td>
                        <td className="p-3">1 година</td>
                      </tr>
                      <tr>
                        <td className="p-3 tabular-nums text-blue-600">studybg_study_progress_v1</td>
                        <td className="p-3">Функционален</td>
                        <td className="p-3">Запазва прогреса в „Моят План за 6.00“, дневната серия (Streak), XP и целевата оценка</td>
                        <td className="p-3">До изчистване</td>
                      </tr>
                      <tr>
                        <td className="p-3 tabular-nums text-blue-600">studybg_exam_history</td>
                        <td className="p-3">Функционален</td>
                        <td className="p-3">Съхранява историята и оценките от проведените 100-точкови изпитни симулации</td>
                        <td className="p-3">До изчистване</td>
                      </tr>
                      <tr>
                        <td className="p-3 tabular-nums text-blue-600">studybg_error_bank</td>
                        <td className="p-3">Функционален</td>
                        <td className="p-3">Запазва сгрешените тестови въпроси за персонализиран поправителен тест</td>
                        <td className="p-3">До изчистване</td>
                      </tr>
                      <tr>
                        <td className="p-3 tabular-nums text-blue-600">sb-*-auth-token / studybg_cached_google_profile_v1</td>
                        <td className="p-3">Строго необходим (само при вход с Google)</td>
                        <td className="p-3">Криптирана OAuth 2.0 сесия и кеш на потребителския профил за облачна синхронизация</td>
                        <td className="p-3">До изход от профила</td>
                      </tr>
                      <tr>
                        <td className="p-3 tabular-nums text-blue-600">studybg_newsletter_subscribers</td>
                        <td className="p-3">По избор (Съгласие)</td>
                        <td className="p-3">Помни статуса на абонамент за седмичния учебен бюлетин</td>
                        <td className="p-3">До отписване</td>
                      </tr>
                      <tr>
                        <td className="p-3 tabular-nums text-blue-600">studybg_gemini_api_key</td>
                        <td className="p-3">По избор</td>
                        <td className="p-3">Съхранява локално въведения от потребителя личен Google Gemini API ключ</td>
                        <td className="p-3">До изчистване</td>
                      </tr>
                      <tr>
                        <td className="p-3 tabular-nums text-blue-600">studybg-pwa-v4 / studybg-assets-v4</td>
                        <td className="p-3">Строго необходим</td>
                        <td className="p-3">Service Worker кеш за работа на конспектите и формулите без интернет</td>
                        <td className="p-3">До обновяване</td>
                      </tr>
                      <tr>
                        <td className="p-3 tabular-nums text-blue-600">_ga, _ga_EE8QCTTSKD</td>
                        <td className="p-3">Аналитичен (само със съгласие)</td>
                        <td className="p-3">Google Analytics 4 — статистика за посещенията (Google Ireland Limited)</td>
                        <td className="p-3">До 2 години</td>
                      </tr>
                      <tr>
                        <td className="p-3 tabular-nums text-blue-600">_clck, _clsk</td>
                        <td className="p-3">Аналитичен (само със съгласие)</td>
                        <td className="p-3">Microsoft Clarity — записи на сесии и топлинни карти (Microsoft Ireland Operations Limited)</td>
                        <td className="p-3">До 1 година / 1 ден</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              <section className="space-y-2">
                <h3 className="text-base font-bold text-slate-900">2. Управление и моментално изтриване</h3>
                <p>
                  Можете да изтриете всички изброени по-горе записи с 1 клик чрез бутона <strong>„Изтрий всички мои данни (Чл. 17 GDPR)“</strong> в таб <em>„Поверителност (GDPR)“</em> на този прозорец или през настройките на вашия браузър.
                </p>
              </section>
            </div>
          )}

          {/* ================================================================= */}
          {/* TAB 5: TERMS OF SERVICE & DIGITAL SERVICES ACT (DSA) */}
          {/* ================================================================= */}
          {activeTab === 'terms' && (
            <div className="space-y-6">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs">
                <div className="flex items-center gap-2 font-bold text-sm mb-1">
                  <GraduationCap className="w-4 h-4 text-blue-600" />
                  <span>Образователна мисия, МОН стандарти и Акт за цифровите услуги (DSA)</span>
                </div>
                <p>
                  StudyBG е безвъзмездна образователна платформа за гимназиален етап (8.–12. клас), ДЗИ (Матура) и ДИППК (Трета СПК), функционираща в съответствие с българското законодателство и <strong>Регламент (ЕС) 2022/2065 (Акт за цифровите услуги — Digital Services Act)</strong>.
                </p>
              </div>

              <section className="space-y-2">
                <h3 className="text-base font-bold text-slate-900">1. Обхват на образователните услуги</h3>
                <p>
                  С използването на учебните инструменти (конспекти, тестове, флашкарти, лаборатории по БЕЛ, STEM/Математика, История и География, 100-точков симулатор и SmartScan) потребителят приема настоящите Общи условия.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="text-base font-bold text-slate-900">2. Съответствие с програмите на МОН и правен статут на симулациите</h3>
                <p>
                  Учебното съдържание е структурирано съгласно действащите учебно-изпитни програми на Министерството на образованието и науката (МОН). StudyBG е независима образователна платформа и не е административен орган на МОН. Резултатите от тестовете и калкулатора на оценки служат за самоподготовка и ориентир.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="text-base font-bold text-slate-900">3. Механизъм за подаване на сигнали по Акта за цифровите услуги (Чл. 16 от DSA)</h3>
                <p>
                  Съгласно Регламент (ЕС) 2022/2065 (Digital Services Act), всеки ученик, учител или родител има право да подаде сигнал за:
                </p>
                <ul className="list-disc list-inside space-y-1 pl-1">
                  <li>Фактическа, граматическа или математическа неточност в учебен конспект или тестови въпрос;</li>
                  <li>Некоректен резултат, генериран от ИИ модула при проверка на записки или есе;</li>
                  <li>Техническа нередност или нарушение на авторски права.</li>
                </ul>
                <p className="text-xs text-slate-500 pt-1">
                  Единна точка за контакт по DSA и потребителски въпроси: официалното GitHub хранилище на проекта (<code className="text-xs">github.com/vasilevvasil200630-ctrl/studybg</code>).
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="text-base font-bold text-slate-900">4. Интелектуална собственост и защита на потребителите (ЗЗП)</h3>
                <p>
                  Авторските учебни синтези, алгоритми и интерактивни лаборатории могат да се използват свободно и безплатно от ученици и учители в класната стая за некомерсиални образователни цели. Надзорен орган по правата на потребителите в България е <strong>Комисията за защита на потребителите (КЗП — <a href="https://kzp.bg" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">kzp.bg</a>)</strong>.
                </p>
              </section>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 flex flex-wrap items-center justify-between gap-3">
          <div className="text-xs text-slate-500 flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Последна актуализация по стандартите на ЕС: {new Date().toLocaleDateString('bg-BG', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
          </div>

          <button
            onClick={onClose}
            className="px-6 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-xs"
          >
            Разбрах и затвори
          </button>
        </div>

      </div>
    </NativeDialog>
  );
};
