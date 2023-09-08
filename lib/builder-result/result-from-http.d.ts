import { FailureHttpService } from "../failure";
declare const buildResultFromHttp: <SuccessType>(response: {
    status: number;
    data: SuccessType;
}) => import("../result").Result<SuccessType, FailureHttpService>;
export { buildResultFromHttp };
