import {RouteComponentProps} from 'react-router-dom';

interface RouteParams {
  slug: string
}

export interface RouteProps extends RouteComponentProps<RouteParams> {
}
