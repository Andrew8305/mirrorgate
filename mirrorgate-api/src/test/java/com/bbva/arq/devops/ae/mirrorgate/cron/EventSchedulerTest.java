package com.bbva.arq.devops.ae.mirrorgate.cron;

import static junit.framework.TestCase.assertTrue;
import static org.mockito.Matchers.anyList;
import static org.mockito.Matchers.anyLong;
import static org.mockito.Mockito.when;

import ch.qos.logback.classic.Level;
import com.bbva.arq.devops.ae.mirrorgate.model.Event;
import com.bbva.arq.devops.ae.mirrorgate.model.EventType;
import com.bbva.arq.devops.ae.mirrorgate.service.BuildService;
import com.bbva.arq.devops.ae.mirrorgate.service.EventService;
import com.bbva.arq.devops.ae.mirrorgate.support.TestUtil;
import java.util.Arrays;
import java.util.Collections;
import org.junit.Before;
import org.junit.Rule;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.runners.MockitoJUnitRunner;
import org.springframework.boot.test.rule.OutputCapture;

@RunWith(MockitoJUnitRunner.class)
public class EventSchedulerTest {

    @Rule
    public OutputCapture outputCapture = new OutputCapture();

    @Mock
    private EventService eventService;

    @Mock
    private BuildService buildService;

    private EventScheduler eventScheduler;


    @Before
    public void init(){

        TestUtil.setLoggingLevel(Level.DEBUG);
        eventScheduler = new EventScheduler(eventService, buildService);
    }

    @Test
    public void testSchedulerTimestampIsModified(){

        when(eventService.getEventsSinceTimestamp(anyLong())).thenReturn(Arrays.asList(createBuildEvent()));
        when(eventService.getLastEvent()).thenReturn(null);
        when(buildService.getAllBuildsFromId(anyList())).thenReturn(Collections.emptyList());

        eventScheduler.checkEventUpdates();

        System.out.println(outputCapture.toString());

        assertTrue(outputCapture.toString().contains("1234567"));

    }

    private Event createBuildEvent(){

        Event buildEvent = new Event();

        buildEvent.setTimestamp(1234567L);
        buildEvent.setEventType(EventType.BUILD);

        return buildEvent;
    }

}
