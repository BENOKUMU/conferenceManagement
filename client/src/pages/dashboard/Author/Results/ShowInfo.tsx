import React, { useState } from "react";
import { StyledConferencePopup } from "../../../../styles/pages/dashboard/Author/AllConferences/ConferencePopup.styled";
import { ConferencePopupProps } from "../../../../types/dashboard/Author/props";
import { StyledAccordion } from "../../../../styles/pages/dashboard/Author/AllConferences/Accordion.styled";
import Button from "@mui/material/Button";
import { Timestamp } from "firebase/firestore";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import useAuthentication from "../../../../hooks/useAuthentication";

const ShowInfo: React.FC<ConferencePopupProps> = ({
  project,
  projects,
  onClose,
  handleApply,
}) => {

    
  function getColor(value) {
    if (value >= 8) {
        return '#28a745'; // green
    } else if (value >= 5) {
        return '#fd7e14'; // orange
    } else {
        return '#dc3545'; // red
    
    }}



  return (
    <StyledConferencePopup>
      {project && (
        <div
          style={{
            width: "100%",
            height: "100%",
            overflow: "hidden",
          }}
        >
          <div style={{ overflow: "auto", height: "100%", padding: "1rem" }}>
            <div
              style={{
                color: "#1e1e1e",
                fontWeight: "bold",
                fontSize: "2rem",
                flex: 1,
                textAlign: "center",
                marginBottom: "20px"
              }}
            >
              Result Information
            </div>


            <Accordion
              style={{ background: "rgba(255,255,255,0.5)" }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
              >
                <Typography sx={{ width: "100%", flexShrink: 0 }}>
                  Project Title
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography sx={{ color: "text.secondary" }}>
                {
                                  projects?.find(
                                    (e) => e?.id === project?.projectId
                                  )?.title
                                }
                </Typography>
              </AccordionDetails>
            </Accordion>

            <Accordion
              style={{ background: "rgba(255,255,255,0.5)" }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
              >
                <Typography sx={{ width: "100%", flexShrink: 0 }}>
                  Abstract
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography sx={{ color: "text.secondary" }}>
                  {project?.abstract}
                </Typography>
              </AccordionDetails>
            </Accordion>


          

            <Accordion
              style={{ background: "rgba(255,255,255,0.5)" }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
              >
                <Typography sx={{ width: "100%", flexShrink: 0 }}>
                  Reviewer Results
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography sx={{ color: "text.secondary" }}>
                  {project?.reviews?.map((e, index) => 
                <div style={{background: '#fff', padding: '10px', margin: '5px'}} key={index}>
                    <div style={{flex: 1, textAlign: 'center'}}><b>Reviewer {index + 1}:</b></div>


                    
                    <Accordion
                          style={{
                            color: "#fff",
                            background: getColor(e?.assesmentData?.academicQuality),
                          }}
                        >
                          <AccordionSummary
                            expandIcon={
                              <ExpandMoreIcon style={{ color: "#fff" }} />
                            }
                            aria-controls="panel1bh-content"
                            id="panel1bh-header"
                          >
                            <Typography sx={{ width: "100%", flexShrink: 0 }}>
                              Academic Quality Review
                            </Typography>
                          </AccordionSummary>
                          <AccordionDetails>
                            <Typography sx={{ color: "#fff" }}>
                            <div >
                        <b>Academic Quality Score: </b>{e?.assesmentData?.academicQuality}
                    </div>
                    <div >
                        <b>Academic Quality Comment: </b>{e?.assesmentData?.academicQualityComment}
                    </div>
                            </Typography>
                          </AccordionDetails>
                        </Accordion>

                        <Accordion
                          style={{
                            color: "#fff",
                            background: getColor(e?.assesmentData?.contribution),
                          }}
                        >
                          <AccordionSummary
                            expandIcon={
                              <ExpandMoreIcon style={{ color: "#fff" }} />
                            }
                            aria-controls="panel1bh-content"
                            id="panel1bh-header"
                          >
                            <Typography sx={{ width: "100%", flexShrink: 0 }}>
                            Contribution Review
                            </Typography>
                          </AccordionSummary>
                          <AccordionDetails>
                            <Typography sx={{ color: "#fff" }}>
                            <div >
                        <b>Contribution Score: </b>{e?.assesmentData?.contribution}
                    </div>
                    <div >
                        <b>Contribution Comment: </b>{e?.assesmentData?.contributionComment}
                    </div>
                            </Typography>
                          </AccordionDetails>
                        </Accordion>

                        <Accordion
                          style={{
                            color: "#fff",
                            background: getColor(e?.assesmentData?.language),
                          }}
                        >
                          <AccordionSummary
                            expandIcon={
                              <ExpandMoreIcon style={{ color: "#fff" }} />
                            }
                            aria-controls="panel1bh-content"
                            id="panel1bh-header"
                          >
                            <Typography sx={{ width: "100%", flexShrink: 0 }}>
                            Language Review
                            </Typography>
                          </AccordionSummary>
                          <AccordionDetails>
                            <Typography sx={{ color: "#fff" }}>
                            <div >
                        <b>Language Score: </b>{e?.assesmentData?.language}
                    </div>
                    <div >
                        <b>Language Comment: </b>{e?.assesmentData?.languageComment}
                    </div>
                            </Typography>
                          </AccordionDetails>
                        </Accordion>

                        
                        <Accordion
                          style={{
                            color: "#fff",
                            background: getColor(e?.assesmentData?.literatureReviewAndBibliography),
                          }}
                        >
                          <AccordionSummary
                            expandIcon={
                              <ExpandMoreIcon style={{ color: "#fff" }} />
                            }
                            aria-controls="panel1bh-content"
                            id="panel1bh-header"
                          >
                            <Typography sx={{ width: "100%", flexShrink: 0 }}>
                            Literature Review and Bibliography Review
                            </Typography>
                          </AccordionSummary>
                          <AccordionDetails>
                            <Typography sx={{ color: "#fff" }}>
                            <div >
                        <b>Literature Review and Bibliography Score: </b>{e?.assesmentData?.literatureReviewAndBibliography}
                    </div>
                    <div >
                        <b>Literature Review and Bibliography Comment: </b>{e?.assesmentData?.literatureReviewAndBibliographyComment}
                    </div>
                            </Typography>
                          </AccordionDetails>
                        </Accordion>
                    
                        <Accordion
                          style={{
                            color: "#fff",
                            background: getColor(e?.assesmentData?.novelty),
                          }}
                        >
                          <AccordionSummary
                            expandIcon={
                              <ExpandMoreIcon style={{ color: "#fff" }} />
                            }
                            aria-controls="panel1bh-content"
                            id="panel1bh-header"
                          >
                            <Typography sx={{ width: "100%", flexShrink: 0 }}>
                            Novelty Review
                            </Typography>
                          </AccordionSummary>
                          <AccordionDetails>
                            <Typography sx={{ color: "#fff" }}>
                            <div >
                        <b>Novelty Score: </b>{e?.assesmentData?.novelty}
                    </div>
                    <div >
                        <b>Novelty Comment: </b>{e?.assesmentData?.noveltyComment}
                    </div>
                            </Typography>
                          </AccordionDetails>
                        </Accordion>
                    
                        <Accordion
                          style={{
                            color: "#fff",
                            background: getColor(e?.assesmentData?.styleAndFormat),
                          }}
                        >
                          <AccordionSummary
                            expandIcon={
                              <ExpandMoreIcon style={{ color: "#fff" }} />
                            }
                            aria-controls="panel1bh-content"
                            id="panel1bh-header"
                          >
                            <Typography sx={{ width: "100%", flexShrink: 0 }}>
                            Style and Format Review
                            </Typography>
                          </AccordionSummary>
                          <AccordionDetails>
                            <Typography sx={{ color: "#fff" }}>
                            <div >
                        <b>Style and Format Score: </b>{e?.assesmentData?.styleAndFormat}
                    </div>
                    <div >
                        <b>Style and Format Comment: </b>{e?.assesmentData?.styleAndFormatComment}
                    </div>
                            </Typography>
                          </AccordionDetails>
                        </Accordion>
                    
                        <Accordion
                          style={{
                            color: "#fff",
                            background: getColor(e?.assesmentData?.topic),
                          }}
                        >
                          <AccordionSummary
                            expandIcon={
                              <ExpandMoreIcon style={{ color: "#fff" }} />
                            }
                            aria-controls="panel1bh-content"
                            id="panel1bh-header"
                          >
                            <Typography sx={{ width: "100%", flexShrink: 0 }}>
                            Topic Review
                            </Typography>
                          </AccordionSummary>
                          <AccordionDetails>
                            <Typography sx={{ color: "#fff" }}>
                            <div >
                        <b>Topic Score: </b>{e?.assesmentData?.topic}
                    </div>
                    <div >
                        <b>Topic Comment: </b>{e?.assesmentData?.topicComment}
                    </div>
                            </Typography>
                          </AccordionDetails>
                        </Accordion>


                        <Accordion
                        >
                          <AccordionSummary
                            expandIcon={
                              <ExpandMoreIcon />
                            }
                            aria-controls="panel1bh-content"
                            id="panel1bh-header"
                          >
                            <Typography sx={{ width: "100%", flexShrink: 0 }}>
                            Summary
                            </Typography>
                          </AccordionSummary>
                          <AccordionDetails>
                            <Typography >
                            {e?.assesmentData?.summary}
                            </Typography>
                          </AccordionDetails>
                        </Accordion>
                    
                        {/* <Accordion
                        >
                          <AccordionSummary
                            expandIcon={
                              <ExpandMoreIcon />
                            }
                            aria-controls="panel1bh-content"
                            id="panel1bh-header"
                          >
                            <Typography sx={{ width: "100%", flexShrink: 0 }}>
                            Comments for Organizing Commitee
                            </Typography>
                          </AccordionSummary>
                          <AccordionDetails>
                            <Typography>
                            {e?.assesmentData?.commentsForOrganizingCommittee}
                            </Typography>
                          </AccordionDetails>
                        </Accordion> */}
                    

                    
                    <div style={{
                                    background:
                                    e?.assesmentData?.recommendation === "Strong Accept"
                                        ? "#28a745"
                                        : e?.assesmentData?.recommendation === "Accept"
                                        ? "#6f42c1"
                                        : e?.assesmentData?.recommendation === "Weak Accept"
                                        ? "#fd7e14"
                                        : "#dc3545",
                                    padding: "9px 5px",
                                    color: "#fff",
                                  }}>
                        <b>Recommendation: </b>{e?.assesmentData?.recommendation}
                    </div>
                </div>
                )}
                </Typography>
              </AccordionDetails>
            </Accordion>

            
            <Accordion
              style={{ background: "rgba(255,255,255,0.5)" }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
              >
                <Typography sx={{ width: "100%", flexShrink: 0 }}>
                  Final Result
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography sx={{ color: "text.secondary" }}>
                    <div style={{
                                    background:
                                    project?.finalResult === "Strong Accept"
                                        ? "#28a745"
                                        : project?.finalResult === "Accept"
                                        ? "#6f42c1"
                                        : project?.finalResult === "Weak Accept"
                                        ? "#fd7e14"
                                        : "#dc3545",
                                    padding: "10px",
                                    color: "#fff",
                                  }}>
                                  {project?.finalResult}

                    </div>
                </Typography>
              </AccordionDetails>
            </Accordion>


          <div
            style={{
              flex: 1,
              display: "flex",
              gap: "10px",
              padding: "1rem 0rem",
              justifyContent: "flex-end",
              width: '100%',
            }}
          >
            <Button variant="contained" color="error" onClick={onClose}>
              Close
            </Button>

          </div>
          </div>

        </div>
      )}
    </StyledConferencePopup>
  );
};

export default ShowInfo;