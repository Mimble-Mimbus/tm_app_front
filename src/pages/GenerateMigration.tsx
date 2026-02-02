import { IonButton, IonContent, IonPage } from "@ionic/react"
import { FC } from "react"
import { migrationGenerate as mg } from "../storage/generateMigration"
import dataSource from "../storage/database"

const GenerateMigration: FC = () => {

  function download(content: string, timestamp: number) {
    const blob = new Blob([content], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('download', timestamp + '-migration.ts');
    link.href = url;
    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    URL.revokeObjectURL(url);

  };
  async function downloadMigration () {
    const timestamp = Date.now()
    const content = await mg.handler(dataSource, timestamp)
    download(content!, timestamp)
  }
  return (<IonPage>
    <IonContent>
      <IonButton onClick={() => downloadMigration()}>generate migraiton</IonButton>
    </IonContent>
  </IonPage>)
}

export default GenerateMigration
