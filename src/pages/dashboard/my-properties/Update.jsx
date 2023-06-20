import { Dashboard, MyPropertyForm } from '@components/profile';
import MyProperties from '@components/profile/MyProperties';
import React from 'react';

export default function MyPropertyUpdatePage() {
  return (
    <>
      <h2 className="p-title">My Property Update</h2>
      <MyPropertyForm />
    </>
  );
}
