import { makeAutoObservable, makeObservable, observable, runInAction } from "mobx";
import { Activity } from "../models/activity";
import agent from "../api/agent";

export default class ActivityStore {
    activities: Activity[] = [];
    selectedActivtiy: Activity | undefined = undefined;
    editMode = false;

    constructor() {
        makeAutoObservable(this);
    }

    loadActivities = async () => {
        try {
            const activities = await agent.Activities.list();
            runInAction(() => {
                activities.forEach(activity => {
                    activity.date = activity.date.split('T')[0];
                    this.activities.push(activity);
                });
            });
        } catch (error) {
            console.log(error);
        }
    }

    selectActivity = (id: string) => {
        this.selectedActivtiy = this.activities.find(a => a.id === id);
    }

    cancelSelectedActivity = () => {
        this.selectedActivtiy = undefined;
    }

    openForm = (id?: string) => {
        id ? this.selectActivity(id) : this.cancelSelectedActivity();
        this.editMode = true;
    }

    closeForm = () => {
        this.editMode = false;
    }

}