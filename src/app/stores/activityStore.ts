import { makeAutoObservable, makeObservable, observable, runInAction } from "mobx";
import { Activity } from "../models/activity";
import agent from "../api/agent";
import { v4 as uuid } from 'uuid';

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

    createActivity = async (activity: Activity) => {
        activity.id == uuid();
        try {
            await agent.Activities.create(activity);
            runInAction(() => {
                this.activities.push(activity);
                this.selectedActivtiy = activity;
                this.editMode = false;
            });
        }
        catch (error) {
            console.log(error);
        }
    }

    updateActivity = async (activity: Activity) => {
        try {
            await agent.Activities.update(activity);
            runInAction(()=>{
                this.activities=[...this.activities.filter(a=>a.id!==activity.id),activity];
                this.selectedActivtiy=activity;
                this.editMode=false;
            })
        } catch (error) {
            console.log(error);
        }
    }

}