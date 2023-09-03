import React, { useEffect, useState } from 'react';
import './styles.css';
import { Container, Header } from 'semantic-ui-react';
import { Activity } from '../models/activity';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import { v4 as uuid } from 'uuid';
import agent from '../api/agent';
import { useStore } from '../stores/store';

function App() {

  const { activityStore } = useStore();

  const [activties, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {

    activityStore.loadActivities();

  }, [activityStore])

  function handleSelectedActivity(id: string) {
    setSelectedActivity(activties.find(x => x.id === id));
  }

  function handleCancelSelectedActivity() {
    setSelectedActivity(undefined);
  }

  function handleFormOpen(id?: string) {

    id ? handleSelectedActivity(id) : handleCancelSelectedActivity();

    setEditMode(true);
  }

  function handleFormClose() {
    setEditMode(false);
  }

  function handleCreateOrEditAcitvity(activity: Activity) {
    setSubmitting(true);

    if (activity.id) {
      agent.Activities.update(activity)
        .then(
          () => {
            setActivities([...activties.filter(a => a.id !== activity.id), activity])
            setSelectedActivity(activity);
            setEditMode(false);
            setSubmitting(false)
          }
        )
    } else {
      activity.id = uuid();
      agent.Activities.create(activity).then(() => {
        setActivities([...activties, activity]);
        setSelectedActivity(activity);
        setEditMode(false);
        setSubmitting(false);
      })
    }
  }

  function handleDeleteActivity(id: string) {
    setSubmitting(true);
    agent.Activities.delete(id).then(() => {
      setActivities([...activties.filter(a => a.id !== id)]);
      setSubmitting(false);
    })

  }

  return (
    <div>
      <NavBar openForm={handleFormOpen} />
      <Container style={{ marginTop: '7em' }}>
        <ActivityDashboard
          activities={activityStore.activities}
          selectedActivity={selectedActivity}
          selectActivity={handleSelectedActivity}
          cancelSelecActivity={handleCancelSelectedActivity}
          editMode={editMode}
          openForm={handleFormOpen}
          closeForm={handleFormClose}
          createOrEditActivity={handleCreateOrEditAcitvity}
          deleteActivity={handleDeleteActivity}
          submitting={submitting}
        />
      </Container>
    </div>
  );
}

export default App;
