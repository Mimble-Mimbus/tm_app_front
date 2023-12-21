import { FC } from "react";
import { RouteComponentProps } from "react-router";
import { useApi } from "../hooks/useApi";
import { IOrganization } from "../types/api";

interface UrlWithId
  extends RouteComponentProps<{
    id?: string;
  }> {}

const Organization: FC<UrlWithId> = ({ match }) => {
  const { data, isLoading } = useApi<IOrganization>('/get_organization/' + match.params.id)

  if (!match.params.id) {
    return <div> missing id parameter </div>
  }

  if (isLoading) {
    return <div> loading...</div>
  }

  return (<div>
    <p> <span className="font-bold" >description:</span> {data?.description}</p>
    <p> <span className="font-bold" >email:</span> {data?.email}</p>
    <p> <span className="font-bold" >nom:</span> {data?.name}</p>
  </div>)
}

export default Organization
