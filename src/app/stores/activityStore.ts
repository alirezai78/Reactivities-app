import { makeAutoObservable, makeObservable, observable, runInAction } from "mobx";
import { Activity } from "../models/activity";
import agent from "../api/agent";

export default class ActivityStore {
    activities: Activity[] = [];
    selectedActivtiy: Activity | null = null;
    editMode = false;

    constructor() {
        makeAutoObservable(this);
    }

    loadActivities = async () => {
        try {
            const activities = await agent.Activities.list();
            runInAction(() => {
                activities.forEach(activity=>{
                    activity.date=activity.date.split('T')[0];
                    this.activities.push(activity);
                });
            })
        } catch (error) {
            console.log(error);
        }
    }

}