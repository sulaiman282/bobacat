import React from 'react';
import Head from 'next/head';
import Theme3Layout from '@/components/themes/Theme3Layout';

export default function Theme3() {
  return (
    <>
      <Head>
        <title>BOBA - Holographic Theme</title>
        <meta name="description" content="BOBA - Holographic 3D Experience" />
      </Head>
      <Theme3Layout />
    </>
  );
}