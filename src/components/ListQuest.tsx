import { FC } from "react";
import { ApiQuest } from "../types/quest";
import { IonItem } from "@ionic/react";

const ListQuest: FC<{ quests: ApiQuest[] }> = ({quests}) => {
  return <div className="flex flex-col md:flex-row md:flex-wrap space-y-4 ml-4 mt-4 md:mx-16 md:my-16 [&>*]:md:mr-4 [&>*]:md:mt-4">
    {quests.map(quest => (
      <IonItem 
        color="white" 
        lines="none" 
        key={quest.id} 
        routerLink={`/quest-details/${quest.id}`} 
        className={(quest.isFullFilled ? "border-green-600": 'border-blue-600') + " py-4 px-3 w-3/5 md:w-96 border-2 rounded-xl"}
      >
        <p className="w-full text-center">{quest.title}</p>
      </IonItem>
    ))}
  </div>
}

export default ListQuest
