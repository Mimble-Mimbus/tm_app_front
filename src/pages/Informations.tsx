import { IonPage } from "@ionic/react"
import { FC } from "react"
import { EventParams } from "../router"
import { timeOutline } from 'ionicons/icons'
import HidingContainer from "../components/HidingContainer"
import { apiPaths, useApi } from "../hook/useApi"
import { OpenDay } from "../types/event"
import { useMediaQuery } from "usehooks-ts"
import  OsmMap from "../components/OsmMap"
import { time, week } from "../utils/date"

const Informations: FC<EventParams> = ({ match }) => {
  const { data } = useApi(apiPaths.eventInformations, { id: match.params.idevent })
  const isOnPhone = useMediaQuery('(max-width: 768px)')
  
  const getDates = (dates: OpenDay[]) => (dates.map(x => ({dayStart: new Date(x.dayStart), dayEnd: new Date(x.dayEnd)})))

  return (
    data ?
      <IonPage className="bg-white flex flex-col items-center justify-start">
        {
          isOnPhone && <>
            <h1 className="font-bold text-lg my-8">Informations pratiques</h1>
            <div className="text-white bg-purple-950 rounded-md py-4 px-8 font-bold mb-5">Carte interactive</div>
          </>
        } 
        {
          isOnPhone ? <div className="w-full space-y-4">
            <HidingContainer className="space-y-2 text-sm flex flex-col items-start" title="Horaires et lieu" icon={timeOutline}>
              <div className="mt-2 ml-4 space-y-2">
                <p className="whitespace-pre-wrap">{data.address} </p>
                {
                  getDates(data.openDays).map(({ dayEnd, dayStart }, index) => {
                    return (<div key={index}>
                      <p>Horaires du {week[dayStart.getDay()]}</p>
                      <p>de {time(dayStart)} à {time(dayEnd)}</p>
                    </div>)
                  })
                }
              </div>
          </HidingContainer>
          <HidingContainer title="Navettes" icon={timeOutline}>
            {data.transits.sort((a, b) => (new Date(a.start).getTime() - new Date(b.start).getTime())).map((transit, index) => (
              <div key={index} className="text-black flex space-x-3 ml-4 text-sm mt-2">
                <p>{week[new Date(transit.start).getDay()]}</p>
                <p>{time(new Date(transit.start))}</p>
              </div>
            ))}
          </HidingContainer>
          <HidingContainer title="Animations" icon={timeOutline}>
            
          </HidingContainer>
          <HidingContainer title="Restaurations" icon={timeOutline}>
            <div className="middle flex flex-col">
              {data.paymentables.map((item, index) => (
                <div key={index} className="w-11/12 mt-2 text-black text-sm flex">
                  <div className="flex flex-row text-sm horizontal_dotted_line">{item.name}</div>
                  <div className="dotted-line"></div>
                  <div className="float-left middle">{item.priceDetails[0].price} €</div>
                </div>
              ))}
            </div>
          </HidingContainer>
        </div>
        : 
        <div className="w-full flex flex-col items-center mt-5 space-y-2"> 
          <div className="flex space-x-3 w-full justify-center  ">
            <div className="w-1/3 flex flex-col">
              <div className="bg-gray-400 w-full middle py-1 font-medium text-xl"> Horaires et lieu</div>
              <div className="my-4 ml-4 flex text-sm justify-around flex-wrap">
                <p className="whitespace-pre-wrap">{data.address} </p>
                <div className="flex flex-col"> {getDates(data.openDays).map(({ dayEnd, dayStart }, index) => (
                  <div key={index}>
                    <p>{week[dayStart.getDay()]} : {time(dayStart)}h - {time(dayEnd)}h</p>
                  </div>
                ))} 
                </div>
              </div>
            </div>
            <div className="w-1/3 flex flex-col">
              <div className="bg-gray-400 w-full middle py-1 font-medium text-xl"> Navettes</div>
              <div className="my-4">
                {data.transits.sort((a, b) => (new Date(a.start).getTime() - new Date(b.start).getTime())).map((transit, index) => (
                  <div key={index} className="text-black flex space-x-3 ml-4 text-sm mt-2">
                    <p>{transit.name}</p>
                    <p>{week[new Date(transit.start).getDay()]}</p>
                    <p>{time(new Date(transit.start))}h</p>
                  </div>
                ))}
              </div>
            </div>
          </div> 
          <div className="flex justify-center space-x-3 w-full">
            <OsmMap address={data.address} />
            <div className="w-1/3 flex flex-col h-min">
              <div className="bg-gray-400 w-full middle py-1 font-medium text-xl"> Restauration sur place</div>
              <div className="middle">
                {data.paymentables.map((item, index) => (
                  <div key={index} className="w-11/12 mt-2 text-black text-sm flex">
                    <div className="flex flex-row text-sm horizontal_dotted_line">{item.name}</div>
                    <div className="dotted-line"></div>
                    <div className="float-left middle">{item.priceDetails[0].price} €</div>
                  </div>
                ))}
              </div>
            </div>
          </div> 
        </div>
        }
      </IonPage>
    :
      <div>loading</div>
    )
}

export default Informations
