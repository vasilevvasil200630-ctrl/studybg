import React, { useState, useEffect } from 'react';
import { Mail, Check, Sparkles, Send, ShieldCheck, BellRing } from 'lucide-react';
import { mailingService, type NewsletterSubscription } from '../services/mailingService';

export const NewsletterSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [grade, setGrade] = useState('7. клас (НВО)');
  const [isLoading, setIsLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [currentSub, setCurrentSub] = useState<NewsletterSubscription | undefined>(undefined);

  useEffect(() => {
    const { subscribed, subscription } = mailingService.isSubscribed();
    if (subscribed && subscription) {
      setCurrentSub(subscription);
    }
  }, []);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setStatusMessage({ type: 'error', text: 'Моля, въведете валиден имейл адрес.' });
      return;
    }

    setIsLoading(true);
    setStatusMessage(null);

    const res = await mailingService.subscribeToNewsletter(email, grade);
    setIsLoading(false);

    if (res.success) {
      setStatusMessage({ type: 'success', text: res.message });
      setCurrentSub({
        email: email.trim().toLowerCase(),
        grade,
        subscribedAt: new Date().toISOString()
      });
      setEmail('');
    } else {
      setStatusMessage({ type: 'error', text: res.message });
    }
  };

  const handleUnsubscribe = () => {
    if (currentSub?.email) {
      mailingService.unsubscribe(currentSub.email);
      setCurrentSub(undefined);
      setStatusMessage({ type: 'success', text: 'Успешно се отписахте от бюлетина.' });
    }
  };

  return (
    <section aria-labelledby="newsletter-heading" className="my-12">
      <div className="rounded-2xl bg-white border border-slate-200 p-6 sm:p-8 lg:p-10 shadow-xs relative overflow-hidden">
        
        {/* Subtle decorative background gradient accent */}
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-64 h-64 bg-blue-50/70 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          
          {/* Left Column: Value Proposition */}
          <div className="space-y-3 max-w-xl text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold border border-blue-200">
              <BellRing className="w-3.5 h-3.5" />
              <span>Седмичен изпитен бюлетин</span>
            </div>

            <h3 id="newsletter-heading" className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
              Подготвяй се редовно за НВО и ДЗИ без стрес
            </h3>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Всяка неделя получавай по имейл <strong>3 подбрани изпитни задачи</strong> с пълни разяснения, капани на проверяващите и новите синтезирани конспекти на StudyBG.
            </p>

            <div className="pt-1 flex flex-wrap items-center justify-center md:justify-start gap-4 text-xs text-slate-500 font-medium">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Без спам • 100% безплатно</span>
              </span>
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                <span>Стандарт на МОН 2026</span>
              </span>
            </div>
          </div>

          {/* Right Column: Interactive Subscription Form or Subscribed State */}
          <div className="w-full md:w-auto md:min-w-[340px] max-w-md">
            {currentSub ? (
              <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 text-center md:text-left space-y-3">
                <div className="flex items-center justify-center md:justify-start gap-2 text-emerald-700 font-semibold text-xs">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                  <span>Абониран си за седмичния бюлетин</span>
                </div>
                <div className="text-xs text-slate-600 space-y-1">
                  <p>Получател: <strong className="font-mono text-slate-900">{currentSub.email}</strong></p>
                  <p>Клас / Фокус: <strong>{currentSub.grade}</strong></p>
                  <p className="text-slate-400 text-[11px]">Следващият брой идва в неделя сутрин.</p>
                </div>
                <div className="pt-1 flex justify-center md:justify-start">
                  <button
                    onClick={handleUnsubscribe}
                    className="text-[11px] text-slate-500 hover:text-rose-600 underline transition-colors"
                  >
                    Отпиши се от бюлетина
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-2">
                  {/* Grade Selector */}
                  <div className="sm:col-span-5">
                    <select
                      value={grade}
                      onChange={(e) => setGrade(e.target.value)}
                      className="w-full h-10 px-3 rounded-xl border border-slate-300 text-xs font-medium text-slate-800 bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600"
                    >
                      <option value="7. клас (НВО)">7. клас (НВО)</option>
                      <option value="10. клас (НВО)">10. клас (НВО)</option>
                      <option value="12. клас (ДЗИ)">12. клас (ДЗИ)</option>
                      <option value="Всички класове">Всички класове</option>
                    </select>
                  </div>

                  {/* Email Input */}
                  <div className="sm:col-span-7 relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                      <Mail className="w-4 h-4" />
                    </div>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="твоят@email.com"
                      className="w-full h-10 pl-9 pr-3 rounded-xl border border-slate-300 text-xs text-slate-900 bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 placeholder:text-slate-400"
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-10 px-5 rounded-xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-xs font-semibold shadow-xs flex items-center justify-center gap-2 transition-colors disabled:opacity-60"
                >
                  {isLoading ? (
                    <>
                      <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Записване...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      <span>Абонирай се безплатно</span>
                    </>
                  )}
                </button>

                {statusMessage && (
                  <div
                    className={`p-2.5 rounded-xl text-xs flex items-center gap-2 ${
                      statusMessage.type === 'success'
                        ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                        : 'bg-rose-50 text-rose-800 border border-rose-200'
                    }`}
                  >
                    <span>{statusMessage.text}</span>
                  </div>
                )}
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
