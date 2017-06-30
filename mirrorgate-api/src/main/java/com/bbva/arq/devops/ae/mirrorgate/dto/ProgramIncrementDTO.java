package com.bbva.arq.devops.ae.mirrorgate.dto;

import com.bbva.arq.devops.ae.mirrorgate.core.dto.IssueDTO;
import java.util.List;

public class ProgramIncrementDTO {

    private List<IssueDTO> programIncrementFeatures;
    private List<IssueDTO> programIncrementCompletedFeatures;
    private List<IssueDTO> programIncrementStories;

    public ProgramIncrementDTO(List<IssueDTO> programIncrementFeatures,
                               List<IssueDTO> programIncrementCompletedFeatures,
                               List<IssueDTO> programIncrementStories) {

        this.programIncrementFeatures = programIncrementFeatures;
        this.programIncrementCompletedFeatures = programIncrementCompletedFeatures;
        this.programIncrementStories = programIncrementStories;
    }

    public List<IssueDTO> getProgramIncrementFeatures() {
        return programIncrementFeatures;
    }

    public void setProgramIncrementFeatures(
        List<IssueDTO> programIncrementFeatures) {
        this.programIncrementFeatures = programIncrementFeatures;
    }

    public List<IssueDTO> getProgramIncrementCompletedFeatures() {
        return programIncrementCompletedFeatures;
    }

    public void setProgramIncrementCompletedFeatures(
        List<IssueDTO> programIncrementCompletedFeatures) {
        this.programIncrementCompletedFeatures = programIncrementCompletedFeatures;
    }

    public List<IssueDTO> getProgramIncrementStories() {
        return programIncrementStories;
    }

    public void setProgramIncrementStories(
        List<IssueDTO> programIncrementStories) {
        this.programIncrementStories = programIncrementStories;
    }
}
