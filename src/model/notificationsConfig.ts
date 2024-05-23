import { User } from "./user";

export class NotificationsConfig{
    id!:number;

    taskProperties:boolean = true;
    taskDescription:boolean = true;
    taskName:boolean = true;
    taskAssociates:boolean = true;
    taskSubtasks:boolean = true;
    taskComments:boolean = true;
    taskAttachments:boolean = true;
    taskFinalDate:boolean = true;
    taskStatus:boolean = true;
    taskPriority:boolean = true;

    projectDashboards:boolean = true;
    projectComments:boolean = true;
    projectStatus:boolean = true;
    projectParticipants:boolean = true;
    projectInfos:boolean = true;

    taskAll:boolean = true;
    projectAll:boolean = true;

    user!:User;
}