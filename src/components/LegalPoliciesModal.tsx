import React, { useState } from 'react';
import { X, ShieldCheck, FileText, Cookie, Lock, CheckCircle2, Scale, GraduationCap } from 'lucide-react';

export type LegalPolicyTab = 'privacy' | 'terms' | 'cookies';

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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white w-full max-w-4xl max-h-[90vh] rounded-2xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden">
        
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/80">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-xs">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-extrabold text-slate-900 leading-tight">
                Правни политики & Защита на личните данни
              </h2>
              <p className="text-xs text-slate-500">
                StudyBG • Пълно съответствие с GDPR (Регламент ЕС 2016/679) и МОН стандарти
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 transition-colors"
            aria-label="Затвори"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Policy Tab Switcher */}
        <div className="px-6 pt-3 pb-2 border-b border-slate-200 bg-white flex flex-wrap gap-2">
          <button
            onClick={() => setActiveTab('privacy')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'privacy'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:text-slate-900'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Политика за поверителност (GDPR)</span>
          </button>

          <button
            onClick={() => setActiveTab('cookies')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'cookies'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:text-slate-900'
            }`}
          >
            <Cookie className="w-4 h-4" />
            <span>Политика за бисквитките</span>
          </button>

          <button
            onClick={() => setActiveTab('terms')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'terms'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:text-slate-900'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Условия за ползване</span>
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1 text-slate-700 text-xs sm:text-sm leading-relaxed space-y-6">
          
          {/* ================================================================= */}
          {/* TAB 1: PRIVACY POLICY */}
          {/* ================================================================= */}
          {activeTab === 'privacy' && (
            <div className="space-y-6">
              <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 text-blue-900 text-xs">
                <div className="flex items-center gap-2 font-bold text-sm mb-1">
                  <Lock className="w-4 h-4 text-blue-600" />
                  <span>Принцип на нулево събиране на лични идентификатори (Privacy by Design)</span>
                </div>
                <p>
                  StudyBG е образователна платформа, създадена с максимално уважение към личната неприкосновеност на учениците и учителите. Ние <strong>не събираме</strong> имена, ЕГН, домашни адреси, телефони или местоположение. Всички бележки, конспекти и тестови резултати се съхраняват локално на вашето крайно устройство.
                </p>
              </div>

              <section className="space-y-2">
                <h3 className="text-base font-bold text-slate-900">1. Администратор на лични данни</h3>
                <p>
                  Платформата StudyBG се администрира съгласно изискванията на Регламент (ЕС) 2016/679 на Европейския парламент и на Съвета (Общ регламент относно защитата на данните — GDPR) и Закона за защита на личните данни на Република България.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="text-base font-bold text-slate-900">2. Какви данни обработваме и защо</h3>
                <ul className="list-disc list-inside space-y-1.5 pl-1">
                  <li>
                    <strong>Локални учебни данни (Local Storage):</strong> Вашият напредък по конспектите, отбелязаните чеклисти за „Отличен (6.00)“, сгрешените въпроси в Банката за грешки и резултатите от 100-точковия симулатор се записват единствено във вашия уеб браузър.
                  </li>
                  <li>
                    <strong>Сканирани записки и текст (SmartScan):</strong> Текстът от въведените или снимани тетрадки се използва единствено в реално време за съпоставка с учебната програма на МОН.
                  </li>
                  <li>
                    <strong>Google Gemini API ключ:</strong> Ако доброволно въведете личен ключ за разпознаване на ръкопис или AI ментор, той остава криптиран локално във вашия браузър и се изпраща директно към официалния защитен API сървър на Google без посредничество.
                  </li>
                </ul>
              </section>

              <section className="space-y-2">
                <h3 className="text-base font-bold text-slate-900">3. Защита на непълнолетни лица</h3>
                <p>
                  Платформата е предназначена за ученици от 5. до 12. клас. Тъй като не се изисква създаване на профил с лични данни, пароли или имейл за ползване на учебната академия, симулатора и общата култура, платформата е напълно безопасна за използване от непълнолетни лица без риск от профилиране или маркетингово таргетиране.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="text-base font-bold text-slate-900">4. Вашите права съгласно GDPR</h3>
                <p>Имате право по всяко време на:</p>
                <ul className="list-disc list-inside space-y-1 pl-1">
                  <li>Пълно изтриване на локалната учебна история чрез бутона за изчистване на кеша в браузъра или настройките на StudyBG.</li>
                  <li>Прекратяване на съгласието за функционални бисквитки от банера за бисквитки.</li>
                  <li>Отказ от въвеждане на снимки или външни API ключове, като ползвате готовите учебни образци.</li>
                </ul>
              </section>

              <section className="space-y-2">
                <h3 className="text-base font-bold text-slate-900">5. Контакт и въпроси</h3>
                <p>
                  При въпроси относно поверителността или функционирането на платформата можете да се свържете с екипа чрез официалното GitHub хранилище на проекта.
                </p>
              </section>
            </div>
          )}

          {/* ================================================================= */}
          {/* TAB 2: COOKIE POLICY */}
          {/* ================================================================= */}
          {activeTab === 'cookies' && (
            <div className="space-y-6">
              <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs">
                <div className="flex items-center gap-2 font-bold text-sm mb-1">
                  <Cookie className="w-4 h-4 text-amber-600" />
                  <span>Прозрачност при използване на бисквитки и локално хранилище</span>
                </div>
                <p>
                  StudyBG <strong>не използва рекламни бисквитки или бисквитки на трети страни за следене (Tracking Cookies)</strong>. Използваме единствено строго необходими технически елементи и Web Storage за офлайн работа и запазване на прогреса ви.
                </p>
              </div>

              <section className="space-y-3">
                <h3 className="text-base font-bold text-slate-900">1. Какви технологии използваме</h3>
                <div className="overflow-x-auto border border-slate-200 rounded-xl">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-100 text-slate-700 border-b border-slate-200 font-bold">
                      <tr>
                        <th className="p-3">Ключ / Име</th>
                        <th className="p-3">Тип</th>
                        <th className="p-3">Предназначение</th>
                        <th className="p-3">Срок</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      <tr>
                        <td className="p-3 font-mono text-blue-600">studybg_cookie_consent</td>
                        <td className="p-3">LocalStorage</td>
                        <td className="p-3">Съхранява избора ви за съгласие с бисквитките</td>
                        <td className="p-3">1 година</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-mono text-blue-600">studybg_error_bank</td>
                        <td className="p-3">LocalStorage</td>
                        <td className="p-3">Запазва сгрешените тестови въпроси за персонализирано преговаряне</td>
                        <td className="p-3">Постоянно</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-mono text-blue-600">studybg_gemini_api_key</td>
                        <td className="p-3">LocalStorage</td>
                        <td className="p-3">По избор: съхранява въведения от вас Google Gemini API ключ</td>
                        <td className="p-3">До изчистване</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-mono text-blue-600">studybg-pwa-v1</td>
                        <td className="p-3">Service Worker Cache</td>
                        <td className="p-3">Кешира конспектите и формулите за работа без интернет в класната стая</td>
                        <td className="p-3">До обновяване</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              <section className="space-y-2">
                <h3 className="text-base font-bold text-slate-900">2. Как да управлявате или изтриете бисквитките</h3>
                <p>
                  Можете да изтриете всички локално съхранени данни по всяко време директно от настройките на вашия браузър (Chrome, Firefox, Safari, Edge) в раздел <em>„Поверителност и сигурност“ ➔ „Изчистване на данните за сърфирането“ ➔ „Бисквитки и данни за сайтове“</em>.
                </p>
              </section>
            </div>
          )}

          {/* ================================================================= */}
          {/* TAB 3: TERMS OF SERVICE */}
          {/* ================================================================= */}
          {activeTab === 'terms' && (
            <div className="space-y-6">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs">
                <div className="flex items-center gap-2 font-bold text-sm mb-1">
                  <GraduationCap className="w-4 h-4 text-blue-600" />
                  <span>Образователна мисия и стандарт на съдържанието</span>
                </div>
                <p>
                  StudyBG е безвъзмездна образователна платформа, чиято цел е да осигури достъпни, научно проверени и съобразени с държавните образователни изисквания на МОН учебни ресурси за всички български ученици, учители и зрелостници.
                </p>
              </div>

              <section className="space-y-2">
                <h3 className="text-base font-bold text-slate-900">1. Приемане на условията</h3>
                <p>
                  С посещението, разглеждането или използването на учебните инструменти (конспекти, тестове, флашкарти, симулатори, хронология и обща култура) на StudyBG вие се съгласявате с настоящите Условия за ползване.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="text-base font-bold text-slate-900">2. Съответствие с програмите на МОН</h3>
                <p>
                  Учебното съдържание е структурирано съгласно държавните образователни стандарти на Министерството на образованието и науката на Република България за съответните класове (7., 10., 11. и 12. клас). Симулаторът и критериите за оценяване са ориентировъчни и служат за самоподготовка; официалното оценяване на националните изпити (НВО и ДЗИ) се извършва единствено от упълномощените национални комисии към МОН.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="text-base font-bold text-slate-900">3. Интелектуална собственост и некомерсиална употреба</h3>
                <p>
                  Всички авторски текстове, анализи на исторически казуси, алгоритми за оценяване, интерактивни въпроси и дизайн решения са интелектуална собственост на StudyBG. Те могат свободно да се използват за лична подготовка, в учебните часове в училище и за некомерсиални образователни цели.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="text-base font-bold text-slate-900">4. Ограничение на отговорността</h3>
                <p>
                  Екипът на StudyBG полага непрекъснати усилия за осигуряване на фактическа и фактологична прецизност. Платформата се предоставя на принципа „както е“ (as-is), без гаранции за непрекъсваемост при технически сривове на потребителските устройства.
                </p>
              </section>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 flex flex-wrap items-center justify-between gap-3">
          <div className="text-xs text-slate-500 flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Последна актуализация: {new Date().toLocaleDateString('bg-BG', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
          </div>

          <button
            onClick={onClose}
            className="px-6 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-xs"
          >
            Разбрах и приемам
          </button>
        </div>

      </div>
    </div>
  );
};
