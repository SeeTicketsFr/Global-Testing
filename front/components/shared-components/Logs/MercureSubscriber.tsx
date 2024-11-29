import { Log } from "@/services";
import _ from "lodash";
import { useEffect } from "react";

interface MercureSubscriberProps {
    update: any;
    hub: string;
    topic: string;
    children: any;
    eventSourceRef: any;
}

export default function MercureSubscriber({ update, hub, topic, children, eventSourceRef }: MercureSubscriberProps) {
    useEffect(() => {
        if (_.isNull(eventSourceRef.current) || (!_.isNull(eventSourceRef.current) && 2 === eventSourceRef.current.readyState)) {
            const url = new URL(hub);
            url.searchParams.append('topic', topic);

            eventSourceRef.current = new EventSource(url.toString());

            eventSourceRef.current.onmessage = function(e: any) {
                var log = JSON.parse(e.data);
                update(log);
            };
        }
    }, [update, hub, topic]);

    return <>{children}</>;
}
