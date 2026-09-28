import React, { useRef, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Mail, Smartphone, Lock, Eye, EyeOff, CheckCircle2 } from 'lucide-react';
import { validatePassword } from '../utils/validatePassword';
import PasswordChecklist from '../components/PasswordChecklist';

const inputClass =
  'w-full bg-gray-50 text-emerald-950 placeholder-gray-400 font-medium text-sm rounded-xl pl-12 pr-4 py-3 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-600 transition-all';

const TITLES = {
  1: 'Forgot Password',
  2: 'Enter Code',
  3: 'New Password',
  4: 'Password Updated',
};

// Six circular boxes, one per digit
function CodeInput({ value, onChange, length = 6 }) {
  const inputs = useRef([]);
  const digits = Array.from({ length }, (_, i) => value[i] || '');

  const focusBox = (i) => inputs.current[i]?.focus();

  // Typing a digit: keep only the last character typed, then move forward
  const handleChange = (i, e) => {
    const digit = e.target.value.replace(/\D/g, '').slice(-1);
    if (!digit) return;

    // If earlier circles are still empty, fill the first empty one
    // instead of leaving a gap
    const firstEmpty = digits.findIndex((d) => !d);
    const target = firstEmpty !== -1 ? Math.min(i, firstEmpty) : i;

    const next = [...digits];
    next[target] = digit;
    onChange(next.join(''));

    if (target < length - 1) focusBox(target + 1);
  };

  const handleKeyDown = (i, e) => {
    if (e.key === 'Backspace') {
      e.preventDefault();
      const next = [...digits];
      if (next[i]) {
        next[i] = ''; // clear this circle
        onChange(next.join(''));
      } else if (i > 0) {
        next[i - 1] = ''; // empty circle: clear the previous one and step back
        onChange(next.join(''));
        focusBox(i - 1);
      }
    } else if (e.key === 'ArrowLeft' && i > 0) {
      focusBox(i - 1);
    } else if (e.key === 'ArrowRight' && i < length - 1) {
      focusBox(i + 1);
    }
  };

  // Pasting "123456" fills all the circles at once
  const handlePaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, length);
    if (!pasted) return;
    onChange(pasted);
    focusBox(Math.min(pasted.length, length - 1));
  };

  return (
    <div className="flex justify-center gap-2 sm:gap-3" onPaste={handlePaste}>
      {digits.map((digit, i) => (
        <input
          key={i}
          ref={(el) => (inputs.current[i] = el)}
          type="text"
          inputMode="numeric"
          autoComplete={i === 0 ? 'one-time-code' : 'off'}
          autoFocus={i === 0}
          value={digit}
          onChange={(e) => handleChange(i, e)}
          onKeyDown={(e) => handleKeyDown(i, e)}
          aria-label={`Digit ${i + 1}`}
          className={`w-9 h-9 sm:w-12 sm:h-12 rounded-full border-2 text-center text-base sm:text-lg font-bold text-emerald-950 focus:outline-none focus:ring-2 focus:ring-emerald-600 transition-all ${
            digit ? 'border-emerald-700 bg-emerald-50' : 'border-gray-200 bg-gray-50'
          }`}
        />
      ))}
    </div>
  );
}

export default function ForgotPassword() {
  const { type } = useParams(); // 'user' or 'admin'
  const accountType = type === 'admin' ? 'admin' : 'user';
  const loginPath = accountType === 'admin' ? '/login/admin' : '/login/user';
  const navigate = useNavigate();

  // 1 = email + method, 2 = enter code, 3 = new password, 4 = done
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [method, setMethod] = useState('sms');
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [pwTouched, setPwTouched] = useState(false);
  const [devCode, setDevCode] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const post = async (path, body) => {
    const res = await fetch(`http://localhost:5000/api/auth/${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Something went wrong');
    return data;
  };

  // Step 1 -> 2: send the code
  const handleRequest = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);
    try {
      const data = await post('forgot-password', { email, method, accountType });
      setDevCode(data.devCode || '');
      setCode('');
      setStep(2);
    } catch (err) {
      setErrorMsg(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Step 2 -> 3: check the code
  const handleVerify = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);
    try {
      await post('verify-reset-code', { email, accountType, code });
      setStep(3);
    } catch (err) {
      setErrorMsg(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Step 3 -> 4: save the new password
  const handleReset = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    const passwordError = validatePassword(newPassword);
    if (passwordError) return setErrorMsg(passwordError);
    if (newPassword !== confirmPassword) return setErrorMsg('Passwords do not match!');

    setLoading(true);
    try {
      await post('reset-password', { email, accountType, code, newPassword });
      setStep(4);
    } catch (err) {
      // Code expired or got locked while on this step: start over
      if (err.message === 'Invalid or expired code') {
        setStep(1);
        setCode('');
        setNewPassword('');
        setConfirmPassword('');
        setPwTouched(false);
      }
      setErrorMsg(err.message);
    } finally {
      setLoading(false);
    }
  };

  const methodOption = (value, label, Icon) => (
    <button
      type="button"
      onClick={() => setMethod(value)}
      className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border-2 text-sm font-bold transition-all ${
        method === value
          ? 'border-emerald-700 bg-emerald-50 text-emerald-900'
          : 'border-gray-200 text-gray-500 hover:border-emerald-300'
      }`}
    >
      <Icon className="w-4 h-4" /> {label}
    </button>
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4 py-12 font-sans">
      <div className="w-full max-w-md bg-white text-emerald-950 rounded-3xl p-8 sm:p-10 shadow-2xl border-2 border-emerald-600 relative space-y-5">
        <button
          type="button"
          onClick={() => navigate(loginPath)}
          className="absolute left-6 top-6 p-2 text-emerald-800 hover:bg-emerald-50 rounded-full transition-all"
          title="Back to sign in"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        <div className="text-center space-y-2 pt-2">
          <h1 className="text-2xl font-extrabold text-emerald-950">{TITLES[step]}</h1>
          <p className="text-xs text-gray-600 font-medium">
            {step === 1 && 'Enter your email and choose where to receive a verification code.'}
            {step === 2 && `Enter the 6-digit code we sent by ${method === 'sms' ? 'SMS' : 'email'}.`}
            {step === 3 && 'Code verified. Choose a new password.'}
            {step === 4 && 'You can now sign in with your new password.'}
          </p>
        </div>

        {errorMsg && (
          <div className="bg-red-50 text-red-700 text-xs font-semibold p-3 rounded-xl border border-red-200">
            {errorMsg}
          </div>
        )}

        {/* STEP 1: email + method */}
        {step === 1 && (
          <form onSubmit={handleRequest} className="space-y-4">
            <div className="relative flex items-center">
              <Mail className="w-5 h-5 absolute left-4 text-emerald-800" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
                className={inputClass}
              />
            </div>
            <div className="space-y-2">
              <p className="text-xs font-bold text-emerald-950 ml-1">Send code via</p>
              <div className="flex gap-3">
                {methodOption('sms', 'SMS', Smartphone)}
                {methodOption('email', 'Email', Mail)}
              </div>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-emerald-800 text-white font-bold text-sm py-3 rounded-xl shadow-md hover:bg-emerald-900 active:scale-95 transition-all disabled:opacity-50"
            >
              {loading ? 'Sending...' : 'Send Code'}
            </button>
          </form>
        )}

        {/* STEP 2: enter the 6-digit code */}
        {step === 2 && (
          <form onSubmit={handleVerify} className="space-y-4">
            {devCode && (
              <div className="bg-amber-50 text-amber-800 text-xs font-semibold p-3 rounded-xl border border-amber-200">
                Testing mode: your code is <span className="font-black tracking-widest">{devCode}</span>
              </div>
            )}
            <CodeInput
              value={code}
              onChange={(v) => {
                setCode(v);
                if (errorMsg) setErrorMsg('');
              }}
            />
            <button
              type="submit"
              disabled={loading || code.length !== 6}
              className="w-full bg-emerald-800 text-white font-bold text-sm py-3 rounded-xl shadow-md hover:bg-emerald-900 active:scale-95 transition-all disabled:opacity-50"
            >
              {loading ? 'Verifying...' : 'Verify Code'}
            </button>
            <button
              type="button"
              onClick={() => {
                setStep(1);
                setErrorMsg('');
              }}
              className="w-full text-xs font-semibold text-emerald-800 hover:underline"
            >
              Didn't get a code? Go back
            </button>
          </form>
        )}

        {/* STEP 3: new password */}
        {step === 3 && (
          <form onSubmit={handleReset} className="space-y-4">
            <div className="space-y-1">
              <div className="relative flex items-center">
                <Lock className="w-5 h-5 absolute left-4 text-emerald-800" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  onFocus={() => setPwTouched(true)}
                  placeholder="New password"
                  className={`${inputClass} pr-12`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 text-gray-500 hover:text-emerald-800"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              <PasswordChecklist password={newPassword} show={pwTouched} />
            </div>

            <div className="relative flex items-center">
              <Lock className="w-5 h-5 absolute left-4 text-emerald-800" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
                className={inputClass}
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-emerald-800 text-white font-bold text-sm py-3 rounded-xl shadow-md hover:bg-emerald-900 active:scale-95 transition-all disabled:opacity-50"
            >
              {loading ? 'Updating...' : 'Reset Password'}
            </button>
          </form>
        )}

        {/* STEP 4: done */}
        {step === 4 && (
          <div className="text-center space-y-4">
            <CheckCircle2 className="w-12 h-12 text-emerald-700 mx-auto" />
            <Link
              to={loginPath}
              className="inline-block w-full bg-emerald-800 text-white font-bold text-sm py-3 rounded-xl shadow-md hover:bg-emerald-900"
            >
              Back to Sign In
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}