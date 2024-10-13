import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import useSelectedUser from '@/components/hooks/useSelectedUser';
import { useRouter } from 'next/router';

const PatientProcessDetails = () => {
  const router = useRouter()
  const id = router.query.id
  const { data: patient, isLoading, error } = useSelectedUser(id);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!patient) return <div>No patient data found</div>;

  const allEvents = [
    ...patient.questions.map(q => ({ ...q, type: 'Question' })),
    ...patient.tasks.map(t => ({ ...t, type: 'Task' })),
    ...patient.advices.map(a => ({ ...a, type: 'Advice' }))
  ].sort((a, b) => a.day - b.day);

  return (
    <div className="w-full max-w-4xl py-8 mx-auto">
      <h1 className="text-2xl font-bold mb-4">Patient Process Details</h1>
      <Card className="mb-4">
        <CardHeader>
          <CardTitle>Patient Information</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Name: {patient.First_Name} {patient.Last_Name}</p>
          <p>NHS ID: {patient.NHS_id}</p>
        </CardContent>
      </Card>

      <h2 className="text-xl font-semibold mb-2">Process Timeline</h2>
      {allEvents.map((event, index) => (
        <Card key={event.id} className="mb-8">
          <CardHeader>
            <CardTitle className="text-lg">
              Day {event.day}: {event.event.Title} ({event.type})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>{event.event.Description}</p>
            {event.event.Input_type && (
              <p className="text-sm text-gray-500">Input type: {event.event.Input_type}</p>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default PatientProcessDetails;
