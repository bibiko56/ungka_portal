import React from 'react';
import { Check, X } from 'lucide-react';
import { passwordRules } from '../utils/validatePassword';

export default function PasswordChecklist({ password, show }) {
  if (!show) return null;

  return (
    <ul className="space-y-1 pt-1 ml-1">
      {passwordRules.map((rule) => {
        const met = rule.test(password);
        return (
          <li
            key={rule.label}
            className={`flex items-center gap-1.5 text-[11px] font-semibold ${
              met ? 'text-emerald-700' : 'text-red-600'
            }`}
          >
            {met ? <Check className="w-3.5 h-3.5" /> : <X className="w-3.5 h-3.5" />}
            {rule.label}
          </li>
        );
      })}
    </ul>
  );
}