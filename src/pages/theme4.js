import React from 'react';
import Head from 'next/head';
import Theme4Layout from '@/components/themes/Theme4Layout';

export default function Theme4() {
  return (
    <>
      <Head>
        <title>BOBA - Minimalist Theme</title>
        <meta name="description" content="BOBA - Clean Minimalist Design" />
      </Head>
      <Theme4Layout />
    </>
  );
}