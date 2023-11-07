import { IonItem, IonMenu } from "@ionic/react";
import { FC } from "react";

const Link: FC<{ content: string, link: string}> = ({ content, link }) => (
    <IonItem color={'purple'} className="text-center" routerLink={link} > {content} </IonItem>
)

export default Link