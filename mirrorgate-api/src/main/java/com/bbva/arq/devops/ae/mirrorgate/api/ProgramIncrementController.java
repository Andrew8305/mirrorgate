package com.bbva.arq.devops.ae.mirrorgate.api;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;
import static org.springframework.web.bind.annotation.RequestMethod.GET;

import com.bbva.arq.devops.ae.mirrorgate.service.ProgramIncrementServiceImpl;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ProgramIncrementController {

    private ProgramIncrementServiceImpl programIncrementService;

    @Autowired
    public ProgramIncrementController(ProgramIncrementServiceImpl programIncrementService){
        this.programIncrementService = programIncrementService;
    }

    @RequestMapping(value = "/dashboards/{name}/programincrement", method = GET, produces = APPLICATION_JSON_VALUE)
    public int getAtiveUserStories(@PathVariable("name") String name) {
        List<String> features = programIncrementService.getProgramIncrementFeatures(name);
        return features != null ? features.size() : 0;
    }

}
