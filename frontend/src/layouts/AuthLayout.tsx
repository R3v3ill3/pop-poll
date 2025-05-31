import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { BarChart2 } from 'lucide-react';

const AuthLayout = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Left side - Auth forms */}
      <div className="relative flex w-full flex-col justify-center px-4 sm:px-6 lg:flex-none lg:w-1/2 xl:w-2/5">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div className="mb-10">
            <div className="flex items-center">
              <BarChart2 className="h-10 w-10 text-primary-600" />
              <h1 className="ml-2 text-2xl font-bold text-gray-900">Polling Platform</h1>
            </div>
            <h2 className="mt-6 text-xl font-semibold text-gray-900">
              Welcome to the Multi-Modal Polling Platform
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Design, deploy, and analyze representative surveys with ease.
            </p>
          </div>

          {/* Auth content (Login/Register) */}
          <div className="mb-10">
            <Outlet />
          </div>

          <div className="text-center text-sm text-gray-600">
            <p>© 2025 Polling Platform. All rights reserved.</p>
          </div>
        </div>
      </div>

      {/* Right side - Background */}
      <div className="hidden relative lg:block lg:w-1/2 xl:w-3/5">
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-primary-600 to-accent-600 p-12">
          <div className="max-w-2xl">
            <div className="mb-8 rounded-lg bg-white/10 p-6 backdrop-blur-sm">
              <h3 className="mb-2 text-2xl font-bold text-white">
                Multi-Modal Polling Platform
              </h3>
              <p className="text-lg text-white/90">
                An end-to-end solution for creating and managing representative surveys across
                multiple channels. Design with AI assistance, monitor in real-time, and analyze
                with confidence.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                {
                  title: 'SMS & Online Surveys',
                  description: 'Integrated multi-channel surveys for comprehensive reach.',
                },
                {
                  title: 'AI-Assisted Design',
                  description: 'Create professional survey questions with AI guidance.',
                },
                {
                  title: 'Real-time Monitoring',
                  description: 'Track quotas and completions as they happen.',
                },
                {
                  title: 'Actionable Insights',
                  description: 'Get clear visualizations and export options.',
                },
              ].map((feature, index) => (
                <div
                  key={index}
                  className="rounded-lg bg-white/10 p-4 backdrop-blur-sm transition-transform hover:scale-105"
                >
                  <h4 className="font-semibold text-white">{feature.title}</h4>
                  <p className="mt-1 text-sm text-white/80">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;