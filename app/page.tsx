"use client";

import Head from 'next/head';
import PomodoroTimer from '../components/PomodoroTimer';

const Home = () => {
  return (
    <div>
      <Head>
        <title>Pomodoro Timer</title>
        <meta name="description" content="A simple Pomodoro timer app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex justify-center items-center h-screen font-montserrat">
        <PomodoroTimer />
      </main>
    </div>
  );
};

export default Home;
