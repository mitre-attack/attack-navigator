"use strict";
exports.__esModule = true;
exports.sset = void 0;
exports.sset = [
    {
        "title": "Information Security Risk Assessment",
        "id": "SCS-ISRA-1.1",
        "description": "An inventory of Nationwide IT Systems that store, process or transmit Nationwide Information must be established. As a minimum, the inventory must contain:\na) \tbusiness purpose;\nb) \tbusiness processes supported;\nc) \tthe appointed Information Asset Owner and Information and IT Custodian;\nd) \tthe importance of the information asset as defined within the Business Impact Assessment (BIA);\ne) \tthe type of information handled;\nf) \tthe number and types of users with access; \ng) \tmethods of authenticating users;\nh) \ttechnical infrastructure (e.g. servers, networks or databases, including makes/models of hardware and software that are proprietary, obsolete or unsupported);\ni) \tthe type and volume of connections;\nj) \tcomponents that are in scope of applicable legal and regulatory requirements;\nk) \tcompliance requirements including the extent to which Personally Identifiable Information (PII) and sensitive personal information are processed;\nl) \tlabelling and identification of the PCI classification of IT assets;\nm) \tphysical locations associated with the information asset;\nn) \tsoftware and hardware versioning;\no) \tsupplier and licensing requirements.",
        "groups": "Group 1",
        "rationale": "It is essential for Nationwide to understand its Information Asset estate so that an accurate understanding of risk associated with each asset can be formed, as well as identifying security controls in place or that are required to protect its most valuable assets and the information they may be accessing, processing, storing or transmitting. Without asset management through an inventory Nationwide will be unable to provide assurance that all assets are recorded and appropriately protected.",
        "roleResponsible": [
            "Information Asset Owner",
            "IT Custodian",
            "Security & Resilience"
        ],
        "guidance": "",
        "mappings": {
            "NIST": [
                "ID.AM-1",
                "ID.AM-2",
                "ID.AM-5"
            ]
        }
    },
    {
        "title": "Information Security Risk Assessment",
        "id": "SCS-ISRA-1.2",
        "description": "An inventory of Nationwide Information classified as SECRET and CONFIDENTIAL must be captured.",
        "groups": "Group 1",
        "rationale": "To ensure that Nationwide has an understanding of it's most sensitive levels of information.",
        "roleResponsible": [
            "Information Asset Owner"
        ],
        "guidance": "",
        "mappings": {
            "NIST": [
                "ID.AM-5"
            ]
        }
    },
    {
        "title": "Information Security Risk Assessment",
        "id": "SCS-ISRA-1.3",
        "description": "System Profiles for all internal Nationwide IT Systems must be developed using the attributes recorded in the inventory and the outputs of a BIA. This must be maintained through reviews at least annually or earlier due to material change or incident.",
        "groups": "Group 1",
        "rationale": "Having a System Profile for each Nationwide IT System helps ensure that authorised personnel can immediately access information about a system and understand it's purpose, information it comes into contact with and it's criticality to the organisation - this may be required quickly in the event of an incident. ",
        "roleResponsible": [
            "Information Asset Owner",
            "IT Support"
        ],
        "guidance": "",
        "mappings": {
            "NIST": [
                "ID.AM-5"
            ]
        }
    },
    {
        "title": "Information Security Risk Assessment",
        "id": "SCS-ISRA-1.4",
        "description": "All Nationwide IT Systems must be recorded in the Society’s information asset inventory, the Configuration Management Database (CMDB) . \n\nThe information asset inventory must be:\na) \tkept up to date;\nb) \tchecked for accuracy at least annually or earlier due to material change or incident to ensure that content is complete, comprehensive, correct and timely;\nc) \tapproved by the relevant Information Asset Owner.",
        "groups": "Group 1",
        "rationale": "CMDBs are used to keep track of the state of assets such as applications, systems, software, hardware, infrastructure - recording information about their configuration, support status, patching levels etc..which is then used to understand how changes to an asset can affect other systems. The CMDB can also be used to identify systems that are approaching end of service life.",
        "roleResponsible": [
            "Information Asset Owner",
            "IT Support"
        ],
        "guidance": "",
        "mappings": {
            "NIST": [
                "ID.AM-1",
                "ID.AM-2",
                "ID.AM-5"
            ]
        }
    },
    {
        "title": "Information Security Risk Assessment",
        "id": "SCS-ISRA-2.1",
        "description": "Community Leaders must appoint Information Asset Owners and Information and IT Custodians for all Nationwide IT Systems and Nationwide Information. Responsibilities for Information Asset Owners and Information and IT Custodians are detailed in the Security Policies. \n\nThe responsibilities of the Information Asset Owner must be communicated to and accepted by the individual assigned to this role.",
        "groups": "Group 1",
        "rationale": "The appointment of Information Asset Owners is a central tenant of the Security Governance Framework to ensure that there is accountability for the security of information assets within each Community and that risk analysis and decision making resides with those taking the risks.\n\nConfirmation is required that there is a named asset owner for this solution/system/data",
        "roleResponsible": [
            "Community Leaders"
        ],
        "guidance": "Only Required if a New Information Asset is being produced as part of the delivery or existing asset being changed does not have Ownership.",
        "mappings": {
            "NIST": [
                "ID.AM-6"
            ]
        }
    },
    {
        "title": "Information Security Risk Assessment",
        "id": "SCS-ISRA-2.3",
        "description": "Nationwide employees, contingent workers and suppliers involved in implementing and maintaining Nationwide IT Systems must be:\na) \tassigned clear responsibilities;\nb) \table to administer and use them correctly and deal with normal processing requirements;\nc) \tcompetent to deal with error, exception and emergency conditions;\nd) \taware of information security principles and associated good practice;\ne) \tsufficient in number to handle required normal and peak workloads at all times",
        "groups": "Group 1",
        "rationale": "",
        "roleResponsible": [
            "Line Managers",
            "Relationship Manager/Owner",
            "People & Culture"
        ],
        "guidance": "",
        "mappings": {
            "NIST": [
                "ID.AM-6"
            ]
        }
    },
    {
        "title": "Information Security Risk Assessment",
        "id": "SCS-ISRA-3.1.2",
        "description": "BIAs must be conducted for all existing and new Nationwide IT Systems to identify the maximum potential business impact for a loss of the confidentiality, integrity or availability of Nationwide Information.",
        "groups": "Group 2",
        "rationale": "",
        "roleResponsible": [
            "Information Asset Owner",
            "IT Support"
        ],
        "guidance": "Evidence required is an UpToDate Harm Assessment in place.",
        "mappings": {
            "NIST": [
                "ID.AM-5"
            ]
        }
    },
    {
        "title": "Information Security Risk Assessment",
        "id": "SCS-ISRA-3.1.3",
        "description": "Information Asset Owners must review the appropriateness of their BIA in accordance with the asset classification timescales below or earlier in the event of material change or incident:\n•\tat least annually for all Tier 1 Nationwide IT Systems;\n•\tat least every 18 months for all Tier 2 Nationwide IT Systems;\n•\tat least every 2 years for all Tier 3 Nationwide IT Systems;\n•\tat least every 3 years for all Tier 4 Nationwide IT Systems",
        "groups": "Group 2",
        "rationale": "",
        "roleResponsible": [
            "Information Asset Owner",
            "IT Support"
        ],
        "guidance": "Project just needs to evidence they have passed the requirement to BAU. An email will suffice.",
        "mappings": {
            "NIST": [
                "ID.AM-5",
                "ID.AM-6"
            ]
        }
    },
    {
        "title": "Information Security Risk Assessment",
        "id": "SCS-ISRA-3.1.4",
        "description": "BIAs must be approved by the Information Asset Owner and relevant Risk Director/Partner",
        "groups": "Group 2",
        "rationale": "Business Impact Assessments (HARM) are approved by the IAO and Risk Director/Partner to ensure that there is a business aligned view of the criticality of information assets (IAO) and that valuations across various areas of the business are consistently rated (Risk Partner).",
        "roleResponsible": [
            "Information Asset Owner"
        ],
        "guidance": "If BAU Harm process followed then this should be met.",
        "mappings": {
            "NIST": [
                "ID.AM-5",
                "ID.AM-6"
            ]
        }
    },
    {
        "title": "Information Security Risk Assessment",
        "id": "SCS-ISRA-3.1.5",
        "description": "The classification of Nationwide IT Systems must be recorded and maintained in Nationwide’s Governance, Risk & Controls (GRC) tooling and the information asset inventory",
        "groups": "Group 2",
        "rationale": "A centralised list of the associated BIA ratings must be maintained in order for related and consuming security management processes such as vulnerability management, security monitoring, security change and governance can utilise these values to prioritise business needs.",
        "roleResponsible": [
            "IT Support",
            "Security & Resilience"
        ],
        "guidance": "",
        "mappings": {
            "NIST": [
                "ID.AM-1",
                "ID.AM-2",
                "ID.AM-5"
            ]
        }
    },
    {
        "title": "Information Security Risk Assessment",
        "id": "SCS-ISRA-3.2.1",
        "description": "An Application Security Assessment (ASA) must be conducted to compare the current security controls applied to a Nationwide IT System to the control requirements defined in the Security Control Standards. ASAs must be performed in line with the defined process to support the identification of security controls by the Information and IT Custodian. This must be:\na) \tcompleted for all Tier 1 and Tier 2 Nationwide IT Systems; \nb) \tupdated during material change;\nc) \trecorded and maintained in Nationwide’s GRC tooling",
        "groups": "",
        "rationale": "The application security assessment methodology provides information asset owners with a self-assessment driven gap analysis of their control design compliance to the security control standards on an asset level basis.  The ASA acts an input into the Information Security Risk Assessment methodology for applications.",
        "roleResponsible": [
            "Information Asset Owner",
            "IT Custodian"
        ],
        "guidance": "Will be met as part of following the new Security Risk assessment methodology.",
        "mappings": {
            "NIST": [
                "ID.GV-4",
                "ID.RA-1"
            ]
        }
    },
    {
        "title": "Information Security Risk Assessment",
        "id": "SCS-ISRA-3.2.2",
        "description": "ASAs must be repeated in accordance with the following asset classification timescales:\n•\tat least annually for all Tier 1 Nationwide IT Systems;\n•\tat least every 18 months for all Tier 2 Nationwide IT Systems;\n•\tat least every 2 years for all Tier 3 Nationwide IT Systems;\n•\tat least every 3 years for all Tier 4 Nationwide IT Systems",
        "groups": "",
        "rationale": "",
        "roleResponsible": [
            "Information Asset Owner",
            "IT Custodian"
        ],
        "guidance": "Project just needs to evidence they have passed the requirement to BAU. An email will suffice.",
        "mappings": {
            "NIST": [
                "ID.AM-5",
                "ID.RA-1",
                "ID.RA-3",
                "ID.RA-4"
            ]
        }
    },
    {
        "title": "Information Security Risk Assessment",
        "id": "SCS-ISRA-3.3.2",
        "description": "Threat Modelling must be conducted for every Tier 1 and Tier 2 Nationwide IT System in accordance with Systems Development Lifecycle. Threat models must be reviewed in the event of a material change to the organisational threat profile",
        "groups": "",
        "rationale": "Threat models may need updating if there is a significant change in the external threat landscape.",
        "roleResponsible": [
            "Security Architecture"
        ],
        "guidance": "",
        "mappings": {
            "NIST": [
                "ID.RA-2",
                "ID.RA-3"
            ]
        }
    },
    {
        "title": "Information Security Risk Assessment",
        "id": "SCS-ISRA-3.4.2",
        "description": "Information Security Risk Assessments must be performed for all Tier 1 and Tier 2 Nationwide IT Systems. This includes when:\na) \tundergoing material change; or\nb) \tbeing created, procured or transferred into the Society",
        "groups": "",
        "rationale": "The information risks associated with the most important Nationwide IT systems (Tier 1 and 2) need to be reviewed during changes to validate that controls remain appropriate and effective.",
        "roleResponsible": [
            "Information Asset Owner",
            "Senior Risk Partner"
        ],
        "guidance": "",
        "mappings": {
            "NIST": [
                "ID.RA-2",
                "ID.RA-3"
            ]
        }
    },
    {
        "title": "Information Security Risk Assessment",
        "id": "SCS-ISRA-3.4.3",
        "description": "Information Security Risk Assessments must be executed by trained and/or experienced individuals in accordance with Employee Lifecycle",
        "groups": "",
        "rationale": "The Information Asset Owner and Risk Partner must be in agreement that the person carrying out the assessment is appropriately trained or experienced to carry out the activity.",
        "roleResponsible": [
            "Information Asset Owner",
            "Senior Risk Partner"
        ],
        "guidance": "",
        "mappings": {
            "NIST": [
                "ID.AM-6"
            ]
        }
    },
    {
        "title": "Information Security Risk Assessment",
        "id": "SCS-ISRA-3.4.4",
        "description": "Information Security Risk Assessments must be maintained through reviews in accordance with the asset classification timescales below or earlier following a major change (e.g. expansion or inclusion of data types) or in the event of a suspected security compromise and/or a security incident that requires a Post-Incident Review (PIR):\n•\tat least annually for all Tier 1 Nationwide IT Systems; \n•\tat least every 18 months for all Tier 2 Nationwide IT Systems;\n•\tat least every 2 years for all Tier 3 Nationwide IT Systems;\n•\tat least every 3 years for all Tier 4 Nationwide IT Systems",
        "groups": "",
        "rationale": "",
        "roleResponsible": [
            "Information Asset Owner",
            "Senior Risk Partner"
        ],
        "guidance": "Project just needs to evidence they have passed the requirement to BAU. An email will suffice.",
        "mappings": {
            "NIST": [
                "ID.RA-2",
                "ID.RA-3"
            ]
        }
    },
    {
        "title": "Information Security Risk Assessment",
        "id": "SCS-ISRA-3.4.5",
        "description": "An up-to-date set of security risks, controls (e.g. in a control library, catalogue or framework) and the results of security control assessments (e.g. security reviews, IT audits, vulnerability assessments, penetration testing and benchmarking of security controls) must be recorded in Nationwide’s GRC tooling in accordance with the requirements in the Security Governance Framework (SGF) .",
        "groups": "",
        "rationale": "",
        "roleResponsible": [
            "Information Asset Owner",
            "Senior Risk Partner"
        ],
        "guidance": "",
        "mappings": {
            "NIST": [
                "ID.GV-4",
                "ID.RM-1"
            ]
        }
    },
    {
        "title": "Information Security Risk Assessment",
        "id": "SCS-ISRA-3.4.6",
        "description": "Information Security Risk Assessments must be approved by the relevant Risk Director",
        "groups": "",
        "rationale": "The Risk Director's approval should be requested and recorded - it may be required for further assessment or audit purposes.",
        "roleResponsible": [
            "Senior Risk Partner"
        ],
        "guidance": "",
        "mappings": {
            "NIST": [
                "ID.RM-1"
            ]
        }
    },
    {
        "title": "Information Security Risk Assessment",
        "id": "SCS-ISRA-3.5.1",
        "description": "Risks identified as part of an Information Security Risk Assessment must be responded to in accordance with Nationwide Board, Management and Operational Risk Appetites. Any security or compliance requirements that are applicable to the Nationwide IT System must be responded to and the cost of different risk response options must be assessed.\n\nRisk response options are:\n•\tMitigate – increase or decrease controls;\n•\tTolerate – accept current position and review in line with agreed timelines (using the Operational & Conduct Risk Management Framework [OCRMF] Tolerance Guide), however; risks outside of the Operational Risk Appetite cannot be tolerated;\n•\tAvoid – stop the business activity creating the risk;\n•\tTransfer – usually refers to insurance, but this only reduces financial loss impact",
        "groups": "",
        "rationale": "",
        "roleResponsible": [
            "Information Asset Owner",
            "Material Risk Taker"
        ],
        "guidance": "",
        "mappings": {
            "NIST": [
                "ID.RM-3",
                "ID.RM-1"
            ]
        }
    },
    {
        "title": "Information Security Risk Assessment",
        "id": "SCS-ISRA-3.5.2",
        "description": "Risk treatment plans must be:\na) \tassigned to a named individual to ensure accountability;\nb) \ttracked against agreed target dates;\nc) \treviewed on a regular basis to assess progress and help ensure that information security risks remain within risk appetite;\nd) \tmade available upon request;\ne) \tautomated to manage ownership and closure of actions, where possible",
        "groups": "",
        "rationale": "",
        "roleResponsible": [
            "Information Asset Owner",
            "Material Risk Taker"
        ],
        "guidance": "",
        "mappings": {
            "NIST": [
                "ID.RM-1",
                "ID.RM-2"
            ]
        }
    },
    {
        "title": "Information Security Risk Assessment",
        "id": "SCS-ISRA-3.5.3",
        "description": "Risk treatment plans must be approved by the relevant Risk Director",
        "groups": "",
        "rationale": "",
        "roleResponsible": [
            "Senior Risk Partner"
        ],
        "guidance": "",
        "mappings": {
            "NIST": [
                "ID.RM-2"
            ]
        }
    },
    {
        "title": "Information Classification",
        "id": "SCS-INFC-1.1.1",
        "description": "Nationwide Information must be classified as PUBLIC, INTERNAL, CONFIDENTIAL or SECRET in accordance with a Society-wide information classification scheme.",
        "groups": "Group 1",
        "rationale": "This provides Nationwide with the ability to understand, manage and monitor information that it regards as highly important through to information that is publicly available.",
        "roleResponsible": [
            "Security & Resilience"
        ],
        "guidance": "Once the data classification has been completed to allow the more detailed requirements to be issued then this is met.",
        "mappings": {
            "NIST": [
                "ID.AM-5"
            ]
        }
    },
    {
        "title": "Information Classification",
        "id": "SCS-INFC-1.1.4",
        "description": "Nationwide Information classified as CONFIDENTIAL or SECRET and any associated attributes must be recorded in an inventory that is maintained in accordance with Information Security Risk Assessment",
        "groups": "Group 1",
        "rationale": "To ensure that there is a formal record of all data that has been classified as the most important to Nationwide.",
        "roleResponsible": [
            "Employee or Contingent Worker",
            "Suppliers"
        ],
        "guidance": "If the project is generating any new unstructured data items they need to contact D&A (as per their guardrail) to ensure the data is governed appropriately.",
        "mappings": {
            "NIST": [
                "ID.AM-5"
            ]
        }
    },
    {
        "title": "Information Classification",
        "id": "SCS-INFC-1.1.5",
        "description": "Nationwide Information classified as INTERNAL, CONFIDENTIAL or SECRET and any associated attributes must be labelled",
        "groups": "Group 1",
        "rationale": "This ensures that the data, documentation (incl. electronic or physical) can be easily recognised by users as either INTERNAL, CONFIDENTIAL or SECRET and protect it appropriately.",
        "roleResponsible": [
            "Employee or Contingent Worker",
            "Suppliers"
        ],
        "guidance": "Project must remind project reps of the data classification they are working with and their obligations. No Evidence required.",
        "mappings": {
            "NIST": [
                "ID.AM-5"
            ]
        }
    },
    {
        "title": "Information Classification",
        "id": "SCS-INFC-1.1.6",
        "description": "All employees, contingent workers and suppliers must maintain the classification of the Nationwide Information throughout its lifecycle",
        "groups": "Group 1",
        "rationale": "This helps to ensure that the information always has a classification throughout it's lifecycle - ensuring users can recognise the level of sensitivity of the data they are using at any time.",
        "roleResponsible": [
            "Employee or Contingent Worker",
            "Suppliers"
        ],
        "guidance": "Project must remind project reps of the data classification they are working with and their obligations. No Evidence required.",
        "mappings": {
            "NIST": [
                "PR.AT-1"
            ]
        }
    },
    {
        "title": "Information Classification",
        "id": "SCS-INFC-1.2.3",
        "description": "All employees, contingent workers and suppliers must label Nationwide Information with a classification label and maintain it throughout its lifecycle in accordance with the Labelling Procedure, inclusive of updating the label if the classification changes",
        "groups": "Group 1",
        "rationale": "This is to ensure all new, modified or older information in use is labelled in line with the classification scheme.",
        "roleResponsible": [
            "Employee or Contingent Worker",
            "Suppliers"
        ],
        "guidance": "Project must remind project reps of the data classification they are working with and their obligations. No Evidence required.",
        "mappings": {
            "NIST": [
                "PR.AT-1",
                "PR.AT-3"
            ]
        }
    },
    {
        "title": "Information Classification",
        "id": "SCS-INFC-1.2.4",
        "description": "All employees, contingent workers and suppliers must provide justification when changing the classification label of Nationwide Information once it has been assigned in accordance with Information Handling and Management",
        "groups": "Group 1",
        "rationale": "This is to help ensure that the re-classification is justified and does not occur by mistake.",
        "roleResponsible": [
            "Employee or Contingent Worker",
            "Suppliers"
        ],
        "guidance": "Project must remind project reps of the data classification they are working with and their obligations. No Evidence required.",
        "mappings": {
            "NIST": [
                "PR.AT-1",
                "PR.AT-3"
            ]
        }
    },
    {
        "title": "Information Classification",
        "id": "SCS-INFC-1.2.5",
        "description": "Outputs from Nationwide IT Systems containing Nationwide Information classified as INTERNAL, CONFIDENTIAL or SECRET must carry an appropriate classification label (e.g. retained in Metadata) .",
        "groups": "Group 1",
        "rationale": "To avoid manual labelling, systems should automatically apply classification where possible.",
        "roleResponsible": [
            "Employee or Contingent Worker",
            "Suppliers"
        ],
        "guidance": "Project must remind project reps of the data classification they are working with and their obligations. No Evidence required.",
        "mappings": {
            "NIST": [
                "PR.AT-1",
                "PR.AT-3"
            ]
        }
    },
    {
        "title": "Information Classification",
        "id": "SCS-INFC-1.2.6",
        "description": "Where classification labelling cannot be applied via tooling this must be applied to all physical and electronic formats manually",
        "groups": "Group 1",
        "rationale": "For systems that cannot automatically classify/label information on output manual labelling must take place.",
        "roleResponsible": [
            "Employee or Contingent Worker",
            "Suppliers"
        ],
        "guidance": "Project must remind project reps of the data classification they are working with and their obligations. No Evidence required.",
        "mappings": {
            "NIST": [
                "PR.AT-1",
                "PR.AT-3"
            ]
        }
    },
    {
        "title": "Information Handling & Management",
        "id": "SCS-INFHM-1.0.1",
        "description": "The integrity of Nationwide Information must be upheld at all stages of the information lifecycle.",
        "groups": "Group 1",
        "rationale": "",
        "roleResponsible": [
            "Employee or Contingent Worker",
            "Suppliers"
        ],
        "guidance": "",
        "mappings": {
            "NIST": [
                "PR.AT-1",
                "PR.AT-3"
            ]
        }
    },
    {
        "title": "Information Handling & Management",
        "id": "SCS-INFHM-1.0.2",
        "description": "Where classification labelling cannot be applied via tooling, this must be applied manually in accordance with Information Classification",
        "groups": "Group 1",
        "rationale": "",
        "roleResponsible": [
            "Employee or Contingent Worker",
            "Suppliers"
        ],
        "guidance": "Project must remind project reps of the data classification they are working with and their obligations. No Evidence required.",
        "mappings": {
            "NIST": [
                "PR.AT-1",
                "PR.AT-3"
            ]
        }
    },
    {
        "title": "Information Handling & Management",
        "id": "SCS-INFHM-1.0.3",
        "description": "A discreet PO Box Address must be made available and only used as a return address for externally posted CONFIDENTIAL or SECRET Nationwide Information",
        "groups": "Group 1",
        "rationale": "",
        "roleResponsible": [
            "Security & Resilience"
        ],
        "guidance": "If applicable i.e. return post is in scope and no existing agreed address exists this requirement will need to be met.",
        "mappings": {
            "NIST": [
                "PR.AT-1",
                "PR.AT-3"
            ]
        }
    },
    {
        "title": "Information Handling & Management",
        "id": "SCS-INFHM-1.1.1",
        "description": "Physical Information: All individuals accessing and handling SECRET Nationwide Information must be authorised, have a need to know and have their handling requirements clearly defined. This permission must be recorded, retained and reviewed at least annually or earlier in the event of material change or incident occurring",
        "groups": "Group 1",
        "rationale": "",
        "roleResponsible": [
            "Data Domain Owner",
            "Information Asset Owner"
        ],
        "guidance": "",
        "mappings": {
            "NIST": [
                "PR.AT-1",
                "PR.AT-3"
            ]
        }
    },
    {
        "title": "Information Handling & Management",
        "id": "SCS-INFHM-1.2.1",
        "description": "Physical Information: All individuals accessing and handling CONFIDENTIAL Nationwide Information must be authorised and have a need to know. This permission must be recorded, retained and reviewed at least annually or earlier in the event of material change or incident occurring",
        "groups": "Group 1",
        "rationale": "",
        "roleResponsible": [
            "Data Domain Owner",
            "Information Asset Owner"
        ],
        "guidance": "Project must remind project reps of the data classification they are working with and their obligations. No Evidence is required.",
        "mappings": {
            "NIST": [
                "PR.AT-1",
                "PR.AT-3"
            ]
        }
    },
    {
        "title": "Information Handling & Management",
        "id": "SCS-INFHM-1.2.2",
        "description": "Physical Information: When copying and printing CONFIDENTIAL Nationwide Information, authorised individuals must:\na) \tcheck and ensure the document to be copied or printed is labelled as CONFIDENTIAL on every page and any necessary handling requirements are clearly displayed;\nb) \tphysically be present at the authorised printing service (e.g. Multi-Functional Device [MFD]) whilst the document is being copied and/or until all pages have finished printing and immediately collect them",
        "groups": "Group 1",
        "rationale": "",
        "roleResponsible": [
            "Employee or Contingent Worker",
            "Suppliers"
        ],
        "guidance": "Project must remind project reps of the data classification they are working with and their obligations. No Evidence is required.",
        "mappings": {
            "NIST": [
                "PR.AT-1",
                "PR.AT-3"
            ]
        }
    },
    {
        "title": "Information Handling & Management",
        "id": "SCS-INFHM-1.2.3",
        "description": "Physical Information: Individuals must obtain evidenced authorisation from their Line Manager prior to taking CONFIDENTIAL Nationwide Information off Nationwide Premises. When taking CONFIDENTIAL Nationwide Information off Nationwide Premises, authorised individuals must:\na) \tphysically keep the information with them at all times or store it in a secure location; \nb) \tnot view or read CONFIDENTIAL Nationwide Information in public places",
        "groups": "Group 1",
        "rationale": "",
        "roleResponsible": [
            "Employee or Contingent Worker",
            "Suppliers"
        ],
        "guidance": "Project must remind project reps of the data classification they are working with and their obligations. No Evidence is required.",
        "mappings": {
            "NIST": [
                "PR.AT-1",
                "PR.AT-3"
            ]
        }
    },
    {
        "title": "Information Handling & Management",
        "id": "SCS-INFHM-1.2.4",
        "description": "Physical Information: When handling CONFIDENTIAL Nationwide Information, the Clear Desk Policy must be adhered to without exception",
        "groups": "Group 1",
        "rationale": "",
        "roleResponsible": [
            "Employee or Contingent Worker",
            "Suppliers"
        ],
        "guidance": "Project must remind project reps of the data classification they are working with and their obligations. No Evidence is required.",
        "mappings": {
            "NIST": [
                "PR.AT-1",
                "PR.AT-3"
            ]
        }
    },
    {
        "title": "Information Handling & Management",
        "id": "SCS-INFHM-1.2.5",
        "description": "Physical Information: Individuals must not take photographic images of CONFIDENTIAL Nationwide Information.",
        "groups": "Group 1",
        "rationale": "",
        "roleResponsible": [
            "Employee or Contingent Worker",
            "Suppliers"
        ],
        "guidance": "Project must remind project reps of the data classification they are working with and their obligations. No Evidence is required.",
        "mappings": {
            "NIST": [
                "PR.AT-1",
                "PR.AT-3"
            ]
        }
    },
    {
        "title": "Information Handling & Management",
        "id": "SCS-INFHM-1.2.6",
        "description": "Physical Information: When sending CONFIDENTIAL Nationwide Information inside Nationwide Premises, authorised individuals must:\na) \tcheck the intended recipient is authorised to receive it;\nb) \tcheck and confirm the intended recipient’s location/address;\nc) \tseal it in packaging marked CONFIDENTIAL;\nd) \taddress the package to the intended recipient; \ne) \tdeliver it by hand to the intended recipient or dispatch via the internal mail system",
        "groups": "Group 1",
        "rationale": "",
        "roleResponsible": [
            "Employee or Contingent Worker",
            "Suppliers"
        ],
        "guidance": "Project must remind project reps of the data classification they are working with and their obligations. No Evidence is required.",
        "mappings": {
            "NIST": [
                "PR.AT-1",
                "PR.AT-3",
                "PR.IP-5"
            ]
        }
    },
    {
        "title": "Information Handling & Management",
        "id": "SCS-INFHM-1.2.7",
        "description": "Physical Information: When sending CONFIDENTIAL Nationwide Information outside of Nationwide Premises (via both external post and hand delivery), authorised individuals must:\na) \tcheck the recipient is authorised to receive it with a Non-Disclosure Agreement (NDA) or contract in place;\nb) \tcheck and confirm the intended recipient’s address;\nc) \tseal it in non-transparent packaging;\nd) \tnot label the classification or use Society branding on the outer packaging;\ne) \taddress the package to a named person;\nf) \tinclude a return PO Box address;\ng) \tdeliver it by hand to the named recipient, use a courier, or use a registered mail service with a tracking mechanism.",
        "groups": "Group 1",
        "rationale": "",
        "roleResponsible": [
            "Employee or Contingent Worker",
            "Suppliers"
        ],
        "guidance": "Project must remind project reps of the data classification they are working with and their obligations. No Evidence is required.",
        "mappings": {
            "NIST": [
                "PR.AT-1",
                "PR.AT-3",
                "PR.IP-5"
            ]
        }
    },
    {
        "title": "Information Handling & Management",
        "id": "SCS-INFHM-1.2.8",
        "description": "Physical Information: When storing CONFIDENTIAL Nationwide Information on Nationwide Premises, authorised individuals must:\na) \tnot leave the information unattended;\nb) \tsecurely lock away the information when not in use or at the end of the working day in a suitably robust and secure private cabinet or storage room accessible only to those authorised to view the information",
        "groups": "Group 1",
        "rationale": "",
        "roleResponsible": [
            "Employee or Contingent Worker",
            "Suppliers"
        ],
        "guidance": "Project must remind project reps of the data classification they are working with and their obligations. No Evidence is required.",
        "mappings": {
            "NIST": [
                "PR.AT-1",
                "PR.AT-3",
                "PR.IP-5"
            ]
        }
    },
    {
        "title": "Information Handling & Management",
        "id": "SCS-INFHM-1.2.9",
        "description": "Physical Information: When storing CONFIDENTIAL Nationwide Information outside of Nationwide Premises, authorised individuals must store it in a secure location, which is out of sight when not in use, and take accountability for the information within their possession.",
        "groups": "Group 1",
        "rationale": "",
        "roleResponsible": [
            "Employee or Contingent Worker",
            "Suppliers"
        ],
        "guidance": "Project must remind project reps of the data classification they are working with and their obligations. No Evidence is required.",
        "mappings": {
            "NIST": [
                "PR.AT-1",
                "PR.AT-3",
                "PR.IP-5"
            ]
        }
    },
    {
        "title": "Information Handling & Management",
        "id": "SCS-INFHM-1.2.10",
        "description": "Physical Information: CONFIDENTIAL Nationwide Information must be disposed of on Nationwide Premises using cross-cut shredding facilities or by placing in a locked confidential waste bin when no longer required and in accordance with the Data Governance Policy and associated data retention schedules",
        "groups": "Group 1",
        "rationale": "",
        "roleResponsible": [
            "Employee or Contingent Worker",
            "Suppliers"
        ],
        "guidance": "Project must remind project reps of the data classification they are working with and their obligations. No Evidence is required.",
        "mappings": {
            "NIST": [
                "PR.AT-1",
                "PR.AT-3",
                "PR.IP-5"
            ]
        }
    },
    {
        "title": "Information Handling & Management",
        "id": "SCS-INFHM-2.1.1",
        "description": "Electronic Information: All individuals accessing and handling SECRET Nationwide Information must be authorised, have a need to know and have their handling requirements clearly defined. This permission must be recorded, retained and reviewed at least annually or earlier in the event of material change or incident occurring",
        "groups": "Group 1",
        "rationale": "",
        "roleResponsible": [
            "Data Domain Owner",
            "Information Asset Owner"
        ],
        "guidance": "",
        "mappings": {
            "NIST": [
                "PR.AT-1",
                "PR.AT-3",
                "PR.IP-7"
            ]
        }
    },
    {
        "title": "Information Handling & Management",
        "id": "SCS-INFHM-2.1.13",
        "description": "Electronic Information: SECRET Nationwide Information must only be stored on shared or Nationwide-allocated personal drives and folders on Nationwide IT Systems and Nationwide IT Networks. When storing SECRET Nationwide Information, authorised individuals must:\na) \tapply encryption using a Nationwide approved solution;\nb) \tensure that storage on local drives is kept to a minimum and routinely backed up to approved network storage; \nc) \tnot store Personally Identifiable Information (PII) or payment card data as defined within Payment Card Industry Data Security Standard (PCI-DSS);\nd) \tensure that only authorised individuals have access to SECRET Nationwide Information",
        "groups": "Group 1",
        "rationale": "",
        "roleResponsible": [
            "Employee or Contingent Worker",
            "Suppliers"
        ],
        "guidance": "Project must remind project reps of the data classification they are working with and their obligations. No Evidence is required.",
        "mappings": {
            "NIST": [
                "PR.AT-1",
                "PR.AT-3",
                "PR.IP-7"
            ]
        }
    },
    {
        "title": "Information Handling & Management",
        "id": "SCS-INFHM-2.1.14",
        "description": "Electronic Information: SECRET Nationwide Information must not be stored on any type of Removable Media or Portable Storage Devices without justification and evidenced authorisation provided by the Line Manager and/or the Information Asset Owner. In this instance individuals must:\na) \tonly use Removable Media or Portable Storage Devices provided by Nationwide;\nb) \tapply software or hardware-based encryption using a Nationwide approved solution;\nc) \tnot store PII or payment card data as defined within PCI-DSS.\n\nAuthorised individuals must handle Removable Media and Portable Storage Devices in accordance with Equipment Management. ",
        "groups": "Group 1",
        "rationale": "",
        "roleResponsible": [
            "Employee or Contingent Worker",
            "Suppliers"
        ],
        "guidance": "Project must remind project reps of the data classification they are working with and their obligations. No Evidence is required.",
        "mappings": {
            "NIST": [
                "PR.AT-1",
                "PR.AT-3",
                "PR.IP-7"
            ]
        }
    },
    {
        "title": "Information Handling & Management",
        "id": "SCS-INFHM-2.2.1",
        "description": "Electronic Information: All individuals accessing and handling CONFIDENTIAL Nationwide Information must be authorised and have a need to know. This permission must be recorded, retained and reviewed at least annually or earlier in the event of material change or incident occurring",
        "groups": "Group 1",
        "rationale": "",
        "roleResponsible": [
            "Data Domain Owner",
            "Information Asset Owner"
        ],
        "guidance": "",
        "mappings": {
            "NIST": [
                "PR.AT-1",
                "PR.AT-3",
                "PR.IP-7"
            ]
        }
    },
    {
        "title": "Information Handling & Management",
        "id": "SCS-INFHM-2.2.2",
        "description": "Electronic Information: Individuals must only use authorised printing services (e.g. Multi-Functional Devices [MFDs] within Nationwide Premises) to print CONFIDENTIAL Nationwide Information.",
        "groups": "Group 1",
        "rationale": "",
        "roleResponsible": [
            "Employee or Contingent Worker",
            "Suppliers"
        ],
        "guidance": "Project must remind project reps of the data classification they are working with and their obligations. No Evidence is required.",
        "mappings": {
            "NIST": [
                "PR.AT-1",
                "PR.AT-3",
                "PR.IP-7"
            ]
        }
    },
    {
        "title": "Information Handling & Management",
        "id": "SCS-INFHM-2.2.3",
        "description": "Electronic Information: When taking Nationwide IT Systems or Nationwide-owned devices containing CONFIDENTIAL Nationwide Information off Nationwide Premises, authorised individuals must:\na) \tkeep the Nationwide IT System or Nationwide-owned device with them at all times or store it in a secure location;\nb) \tnot view CONFIDENTIAL Nationwide Information in public places",
        "groups": "Group 1",
        "rationale": "",
        "roleResponsible": [
            "Employee or Contingent Worker",
            "Suppliers"
        ],
        "guidance": "Project must remind project reps of the data classification they are working with and their obligations. No Evidence is required.",
        "mappings": {
            "NIST": [
                "PR.AT-1",
                "PR.AT-3",
                "PR.IP-7",
                "PR.IP-8"
            ]
        }
    },
    {
        "title": "Information Handling & Management",
        "id": "SCS-INFHM-2.2.4",
        "description": "Electronic Information: When leaving Nationwide IT Systems or Nationwide-owned devices containing CONFIDENTIAL Nationwide Information unattended, individuals must ensure that screens are locked when not in use or they log out",
        "groups": "Group 1",
        "rationale": "",
        "roleResponsible": [
            "Employee or Contingent Worker",
            "Suppliers"
        ],
        "guidance": "Project must remind project reps of the data classification they are working with and their obligations. No Evidence is required.",
        "mappings": {
            "NIST": [
                "PR.AT-1",
                "PR.AT-3",
                "PR.IP-7",
                "PR.IP-8"
            ]
        }
    },
    {
        "title": "Information Handling & Management",
        "id": "SCS-INFHM-2.2.5",
        "description": "Electronic Information: Individuals must not take screen shots of CONFIDENTIAL Nationwide Information or photographic images of CONFIDENTIAL Nationwide Information displayed on Visual Display Units (VDUs) . ",
        "groups": "Group 1",
        "rationale": "",
        "roleResponsible": [
            "Employee or Contingent Worker",
            "Suppliers"
        ],
        "guidance": "Project must remind project reps of the data classification they are working with and their obligations. No Evidence is required.",
        "mappings": {
            "NIST": [
                "PR.AT-1",
                "PR.AT-3",
                "PR.IP-7",
                "PR.IP-8"
            ]
        }
    },
    {
        "title": "Information Handling & Management",
        "id": "SCS-INFHM-2.2.6",
        "description": "Electronic Information: Electronic Information: When engaging in any remote access capabilities for service desk support or otherwise, all CONFIDENTIAL Nationwide Information must be protected, closed and not visible to support desk agents or any other party during remote access activity. It is not acceptable to minimise any such display windows to meet this requirement. During remote access activity individuals must remain vigilant and actively disconnect and terminate a remote access session if suspicious activity is undertaken by the service desk agent or any other party",
        "groups": "Group 1",
        "rationale": "",
        "roleResponsible": [
            "Employee or Contingent Worker",
            "Suppliers"
        ],
        "guidance": "Project must remind project reps of the data classification they are working with and their obligations. No Evidence is required.",
        "mappings": {
            "NIST": [
                "PR.AT-1",
                "PR.AT-3",
                "PR.IP-7",
                "PR.IP-8"
            ]
        }
    },
    {
        "title": "Information Handling & Management",
        "id": "SCS-INFHM-2.2.7",
        "description": "Electronic Information: When sending CONFIDENTIAL Nationwide Information inside Nationwide (internal emails), authorised individuals must:\na) \tensure that the recipient(s) is authorised to receive it and where necessary, in the case of contingent workers and internally hosted suppliers, a contract is in place;\nb) \tencrypt the email using a Nationwide-approved solution;\nc) \tinclude the classification of Nationwide CONFIDENTIAL in the subject line of the e-mail.",
        "groups": "Group 1",
        "rationale": "",
        "roleResponsible": [
            "Employee or Contingent Worker",
            "Suppliers"
        ],
        "guidance": "Project must remind project reps of the data classification they are working with and their obligations. No Evidence is required.",
        "mappings": {
            "NIST": [
                "PR.AT-1",
                "PR.AT-3",
                "PR.IP-7",
                "PR.IP-8"
            ]
        }
    },
    {
        "title": "Information Handling & Management",
        "id": "SCS-INFHM-2.2.8",
        "description": "Electronic Information: When sending CONFIDENTIAL Nationwide Information outside Nationwide (external emails), authorised individuals must:\na) \tensure that the recipient(s) is authorised to receive it with a Non-Disclosure Agreement (NDA) or contract in place;\nb) \tverify the recipient’s email address is correct;\nc) \tencrypt the email using a Nationwide-approved solution;\nd) \tshare any encryption keys or passwords via an alternative mechanism if required",
        "groups": "Group 1",
        "rationale": "",
        "roleResponsible": [
            "Employee or Contingent Worker",
            "Suppliers"
        ],
        "guidance": "Project must remind project reps of the data classification they are working with and their obligations. No Evidence is required.",
        "mappings": {
            "NIST": [
                "PR.AT-1",
                "PR.AT-3",
                "PR.IP-7",
                "PR.IP-8"
            ]
        }
    },
    {
        "title": "Information Handling & Management",
        "id": "SCS-INFHM-2.2.9",
        "description": "Electronic Information: Individuals must only share CONFIDENTIAL Nationwide Information on approved file sharing websites or Collaboration Tools in accordance with Electronic Communications",
        "groups": "Group 1",
        "rationale": "",
        "roleResponsible": [
            "Employee or Contingent Worker",
            "Suppliers"
        ],
        "guidance": "Project must remind project reps of the data classification they are working with and their obligations. No Evidence is required.",
        "mappings": {
            "NIST": [
                "PR.AT-1",
                "PR.AT-3",
                "PR.IP-7",
                "PR.IP-8"
            ]
        }
    },
    {
        "title": "Information Handling & Management",
        "id": "SCS-INFHM-2.2.10",
        "description": "Electronic Information: When using social media, individuals must not share CONFIDENTIAL Nationwide Information in accordance with the Social Media Guide",
        "groups": "Group 1",
        "rationale": "",
        "roleResponsible": [
            "Employee or Contingent Worker",
            "Suppliers"
        ],
        "guidance": "Project must remind project reps of the data classification they are working with and their obligations. No Evidence is required.",
        "mappings": {
            "NIST": [
                "PR.AT-1",
                "PR.AT-3",
                "PR.IP-7",
                "PR.IP-8"
            ]
        }
    },
    {
        "title": "Information Handling & Management",
        "id": "SCS-INFHM-2.2.11",
        "description": "Electronic Information: When storing CONFIDENTIAL Nationwide Information on Nationwide IT Systems, authorised individuals must:\na) \tstore information on shared or Nationwide-allocated personal drives, folders or SharePoint sites;\nb) \tensure that storage on local drives is kept to a minimum and routinely backed up to approved network storage; \nc) \tnot store Personally Identifiable Information (PII) or payment card data as defined within Payment Card Industry Data Security Standard (PCI-DSS);\nd) \tensure that only authorised individuals have access to CONFIDENTIAL Nationwide Information.",
        "groups": "Group 1",
        "rationale": "",
        "roleResponsible": [
            "Employee or Contingent Worker",
            "Suppliers"
        ],
        "guidance": "Project must remind project reps of the data classification they are working with and their obligations. No Evidence is required.",
        "mappings": {
            "NIST": [
                "PR.AT-1",
                "PR.AT-3",
                "PR.IP-7",
                "PR.IP-8"
            ]
        }
    },
    {
        "title": "Information Handling & Management",
        "id": "SCS-INFHM-2.2.12",
        "description": "Electronic Information: When storing CONFIDENTIAL Nationwide Information on Removable Media and Portable Storage Devices, authorised individuals must:\na) \thave Line Manager and/or Information Asset Owner approval;\nb) \tuse Removable Media or Portable Storage Devices provided by Nationwide;\nc) \tapply software or hardware-based encryption using a Nationwide approved solution;\nd) \tnot store PII or payment card data as defined within PCI-DSS.\n\nAuthorised individuals must handle Removable Media and Portable Storage Devices in accordance with Equipment Management.",
        "groups": "Group 1",
        "rationale": "",
        "roleResponsible": [
            "Employee or Contingent Worker",
            "Suppliers"
        ],
        "guidance": "Project must remind project reps of the data classification they are working with and their obligations. No Evidence is required.",
        "mappings": {
            "NIST": [
                "PR.AT-1",
                "PR.AT-3",
                "PR.IP-7",
                "PR.IP-8"
            ]
        }
    },
    {
        "title": "Information Handling & Management",
        "id": "SCS-INFHM-2.2.13",
        "description": "Electronic Information: When storing CONFIDENTIAL Nationwide Information on non-Nationwide IT Systems such as authorised Bring Your Own Device (BYOD) devices, individuals must:\na) \thave Line Manager and/or Information Asset Owner approval;\nb) \taccess the information via an approved solution;\nc) \tencrypt and segregate Nationwide Information from non-Nationwide Information;\nd) \tnot access Nationwide Information using public or shared devices.\n\nCONFIDENTIAL Nationwide Information must not be stored on non-Nationwide IT Systems other than authorised BYOD devices",
        "groups": "Group 1",
        "rationale": "",
        "roleResponsible": [
            "Employee or Contingent Worker",
            "Suppliers"
        ],
        "guidance": "Project must remind project reps of the data classification they are working with and their obligations. No Evidence is required.",
        "mappings": {
            "NIST": [
                "PR.AT-1",
                "PR.AT-3",
                "PR.IP-7",
                "PR.IP-8"
            ]
        }
    },
    {
        "title": "Information Handling & Management",
        "id": "SCS-INFHM-2.2.14",
        "description": "Electronic Information: Nationwide IT Systems and Nationwide-owned devices containing CONFIDENTIAL Nationwide Information must:\na) \tbe returned to Nationwide for disposal, re-use or maintenance;\nb) \tbe sanitised and disposed of in accordance with Equipment Management.",
        "groups": "Group 1",
        "rationale": "",
        "roleResponsible": [
            "Employee or Contingent Worker",
            "Suppliers"
        ],
        "guidance": "Project must remind project reps of the data classification they are working with and their obligations. No Evidence is required.",
        "mappings": {
            "NIST": [
                "PR.AT-1",
                "PR.AT-3",
                "PR.IP-7",
                "PR.IP-8"
            ]
        }
    },
    {
        "title": "Information Handling & Management",
        "id": "SCS-INFHM-2.2.15",
        "description": "Electronic Information: Non-Nationwide IT Systems that contain CONFIDENTIAL Nationwide Information must have all Nationwide Information securely deleted when:\na) \tsending the device off for repair;\nb) \tselling or upgrading the device;\nc) \tcommencing extended periods of absence;\nd) \tleaving Nationwide following termination of their employment or contract",
        "groups": "Group 1",
        "rationale": "",
        "roleResponsible": [
            "Employee or Contingent Worker",
            "Suppliers"
        ],
        "guidance": "Project must remind project reps of the data classification they are working with and their obligations. No Evidence is required.",
        "mappings": {
            "NIST": [
                "PR.AT-1",
                "PR.AT-3",
                "PR.IP-7",
                "PR.IP-8"
            ]
        }
    },
    {
        "title": "Information Handling & Management",
        "id": "SCS-INFHM-2.4.1",
        "description": "Electronic Information: When leaving Nationwide IT Systems or Nationwide-owned devices unattended, individuals must ensure that screens are locked when not in use or they log out.",
        "groups": "Group 1",
        "rationale": "",
        "roleResponsible": [
            "Employee or Contingent Worker",
            "Suppliers"
        ],
        "guidance": "Project must remind project reps of the data classification they are working with and their obligations. No Evidence is required.",
        "mappings": {
            "NIST": [
                "PR.AT-1",
                "PR.AT-3",
                "PR.IP-7",
                "PR.IP-8"
            ]
        }
    },
    {
        "title": "Information Handling & Management",
        "id": "SCS-INFHM-3.2.1",
        "description": "When verbally disclosing CONFIDENTIAL Nationwide Information inside Nationwide Premises (including in face-to-face meetings, via approved phone, video and web-conferencing), individuals must:\na) \tensure that the recipients are authorised to know the information;\nb) \tensure that the recipients understand the classification of the content prior to it being discussed and any responsibilities for further dissemination;\nc) \tbe discreet when discussing CONFIDENTIAL Nationwide Information in shared working environments;\nd) \tuse only authorised connectivity for all Nationwide video and web-conferencing;\ne) \tnot leave messages containing CONFIDENTIAL Nationwide Information on answering machines or voicemail.",
        "groups": "",
        "rationale": "",
        "roleResponsible": [
            "Employee or Contingent Worker",
            "Suppliers"
        ],
        "guidance": "Project must remind project reps of the data classification they are working with and their obligations. No Evidence is required.",
        "mappings": {
            "NIST": [
                "PR.AT-1",
                "PR.AT-3",
                "PR.IP-7",
                "PR.IP-8"
            ]
        }
    },
    {
        "title": "Information Handling & Management",
        "id": "SCS-INFHM-3.2.2",
        "description": "When verbally disclosing CONFIDENTIAL Nationwide Information outside of Nationwide Premises, individuals must:\na) \tensure that the recipients are authorised to know the information;\nb) \tensure that the recipients understand the classification of the content prior to it being discussed and any responsibilities for further dissemination;\nc) \tuse only authorised connectivity for all Nationwide video and web-conferencing;\nd) \tnot leave messages containing CONFIDENTIAL Nationwide Information in answering machines or voicemail",
        "groups": "",
        "rationale": "",
        "roleResponsible": [
            "Employee or Contingent Worker",
            "Suppliers"
        ],
        "guidance": "Project must remind project reps of the data classification they are working with and their obligations. No Evidence is required.",
        "mappings": {
            "NIST": [
                "PR.AT-1",
                "PR.AT-3",
                "PR.IP-7",
                "PR.IP-8"
            ]
        }
    },
    {
        "title": "Information Handling & Management",
        "id": "SCS-INFHM-3.2.3",
        "description": "Verbal Information: Individuals must not discuss CONFIDENTIAL Nationwide Information in public places",
        "groups": "",
        "rationale": "",
        "roleResponsible": [
            "Employee or Contingent Worker",
            "Suppliers"
        ],
        "guidance": "Project must remind project reps of the data classification they are working with and their obligations. No Evidence is required.",
        "mappings": {
            "NIST": [
                "PR.AT-1",
                "PR.AT-3",
                "PR.IP-7",
                "PR.IP-8"
            ]
        }
    },
    {
        "title": "Information Handling & Management",
        "id": "SCS-INFHM-4.1",
        "description": "Procedures for handling and managing physical, electronic and verbal Nationwide Information across all levels of information classification and throughout the lifecycle, must be developed and documented in accordance with the information classification scheme adopted by Nationwide",
        "groups": "Group 1",
        "rationale": "",
        "roleResponsible": [
            "Data Management & Governance"
        ],
        "guidance": "Should be met by D&G Guardrails. Met if D&G engaged.",
        "mappings": {
            "NIST": [
                "PR.AT-1",
                "PR.AT-3",
                "PR.IP-7",
                "PR.IP-8"
            ]
        }
    },
    {
        "title": "Information Handling & Management",
        "id": "SCS-INFHM-4.3",
        "description": "Personally Identifiable Information (PII) must be protected in accordance with Nationwide’s Data Governance Policy and Data Privacy Policy and applicable legislative and regulatory requirements.",
        "groups": "Group 1",
        "rationale": "",
        "roleResponsible": [
            "Data Management & Governance"
        ],
        "guidance": "",
        "mappings": {
            "NIST": [
                "PR.AT-1",
                "PR.AT-3",
                "PR.IP-7",
                "PR.IP-8"
            ]
        }
    },
    {
        "title": "Information Handling & Management",
        "id": "SCS-INFHM-4.4",
        "description": "Payment Card Data must be handled in accordance with Nationwide’s Data Governance Policy and Data Privacy Policy, the latest version of PCI-DSS, and applicable legislative and regulatory requirements, including the following as a minimum:\na) \tonly requesting Primary Account Numbers (PANs) from Members when necessary and where possible seeking alternative methods of identification, which must be documented in local procedures.\nb) \tmasking PANs if received unsolicited from Members",
        "groups": "Group 1",
        "rationale": "",
        "roleResponsible": [
            "Data Management & Governance"
        ],
        "guidance": "",
        "mappings": {
            "NIST": [
                "PR.AT-1",
                "PR.AT-3",
                "PR.IP-7",
                "PR.IP-8"
            ]
        }
    },
    {
        "title": "Information Handling & Management",
        "id": "SCS-INFHM-4.5",
        "description": "Appropriate procedures must be implemented to ensure that records are handled correctly and in accordance with Nationwide’s the Data Governance Policy, Data Privacy Policy, associated data retention schedules, and applicable legislative and regulatory requirements",
        "groups": "Group 1",
        "rationale": "",
        "roleResponsible": [
            "Data Domain Owner",
            "Suppliers"
        ],
        "guidance": "Should be met by D&G Guardrails. Met if D&G engaged.",
        "mappings": {
            "NIST": [
                "PR.AT-1",
                "PR.AT-3",
                "PR.IP-7",
                "PR.IP-8"
            ]
        }
    },
    {
        "title": "Information Handling & Management",
        "id": "SCS-INFHM-4.6",
        "description": "Nationwide Information shared with authorised suppliers must be handled in accordance with Nationwide’s handling requirements and in accordance with Supply Chain Management",
        "groups": "Group 1",
        "rationale": "",
        "roleResponsible": [
            "Relationship Manager/Owner",
            "Procurement"
        ],
        "guidance": "Information shared must be covered by contract and be transferred via an approved mechanism (for that type) and with the information owners approval.",
        "mappings": {
            "NIST": [
                "PR.AT-1",
                "PR.AT-3",
                "PR.IP-7",
                "PR.IP-8"
            ]
        }
    },
    {
        "title": "Information Handling & Management",
        "id": "SCS-INFHM-4.8",
        "description": "Procedures must be in place to ensure the ability for authorised individuals to access Nationwide Information throughout the retention period and to safeguard against loss due to future technology change",
        "groups": "Group 1",
        "rationale": "",
        "roleResponsible": [
            "Data Management & Governance"
        ],
        "guidance": "Should be met by D&G Guardrails. Met if D&G engaged.",
        "mappings": {
            "NIST": [
                "PR.AT-1",
                "PR.AT-3",
                "PR.IP-7",
                "PR.IP-8"
            ]
        }
    },
    {
        "title": "Information Handling & Management",
        "id": "SCS-INFHM-5.1.1",
        "description": "Non-Disclosure Agreements (NDAs) must be used to protect the confidentiality of Nationwide Information. NDAs must be documented, signed by all required parties and include the following as appropriate: \na) \tdefinition of the information to be protected;\nb) \texpected duration of the NDA, including cases where confidentiality might need to be maintained indefinitely;\nc) \texplicit legal entities / named individuals with access to Nationwide Information as part of the NDA;\nd) \trequired actions when an agreement is terminated;\ne) \tresponsibilities and actions of signatories to avoid unauthorised disclosure of Nationwide Information;\nf) \tthe permitted use of Nationwide Information classified as INTERNAL, CONFIDENTIAL or SECRET and rights of the signatory to use this information;\ng) \tthe right to audit and monitor activities that involve Nationwide Information classified as INTERNAL, CONFIDENTIAL or SECRET;\nh) \tprocess for notification and reporting of unauthorised disclosure or leakage of Nationwide Information classified as INTERNAL, CONFIDENTIAL or SECRET;\ni) \tterms for Nationwide Information to be returned or destroyed at agreement termination;\nj) \texpected actions to be taken and by whom in case of a breach of the agreement",
        "groups": "Group 1",
        "rationale": "",
        "roleResponsible": [
            "Legal"
        ],
        "guidance": "Only required if Specific NDA being used, else mark as N/A as met by employment contracts.",
        "mappings": {
            "NIST": [
                "PR.AT-1",
                "PR.AT-3",
                "PR.IP-7",
                "PR.IP-8"
            ]
        }
    },
    {
        "title": "Information Handling & Management",
        "id": "SCS-INFHM-5.1.2",
        "description": "NDAs must be reviewed at least annually or earlier in the event of material change or incident occurring",
        "groups": "Group 1",
        "rationale": "",
        "roleResponsible": [
            "Legal"
        ],
        "guidance": "Only required if NDA being used, else mark as N/A",
        "mappings": {
            "NIST": [
                "PR.AT-1",
                "PR.AT-3",
                "PR.IP-7",
                "PR.IP-8"
            ]
        }
    },
    {
        "title": "Information Handling & Management",
        "id": "SCS-INFHM-5.1.3",
        "description": "NDAs for employees must be signed in accordance with Employee Lifecycle. ",
        "groups": "Group 1",
        "rationale": "",
        "roleResponsible": [
            "People & Culture"
        ],
        "guidance": "Only required if NDA being used, else mark as N/A",
        "mappings": {
            "NIST": [
                "PR.AT-1",
                "PR.AT-3",
                "PR.IP-7",
                "PR.IP-8"
            ]
        }
    },
    {
        "title": "Information Handling & Management",
        "id": "SCS-INFHM-5.1.4",
        "description": "The requirement for a project NDA must be identified at the earliest opportunity and signed by all applicable parties prior to sharing any Nationwide Information covered by the NDA",
        "groups": "Group 1",
        "rationale": "",
        "roleResponsible": [
            "Change/Project Sponsor",
            "Chief Product Owner",
            "Community Leaders",
            "Product Owner"
        ],
        "guidance": "Only required if NDA being used, else mark as N/A",
        "mappings": {
            "NIST": [
                "PR.AT-1",
                "PR.AT-3",
                "PR.IP-7",
                "PR.IP-8"
            ]
        }
    },
    {
        "title": "Information Handling & Management",
        "id": "SCS-INFHM-5.1.5",
        "description": "NDAs for suppliers must be handled through contracts in accordance with Supply Chain Management.",
        "groups": "Group 1",
        "rationale": "",
        "roleResponsible": [
            "Procurement"
        ],
        "guidance": "Only required if NDA being used, else mark as N/A",
        "mappings": {
            "NIST": [
                "PR.AT-1",
                "PR.AT-3",
                "PR.IP-7",
                "PR.IP-8"
            ]
        }
    },
    {
        "title": "Information Handling & Management",
        "id": "SCS-INFHM-5.2.1",
        "description": "Nationwide Information classified as INTERNAL, CONFIDENTIAL or SECRET must be protected from unauthorised disclosure and loss by identifying the potential physical data loss channels (including but not limited to physical theft), and implementing DLP solutions and processes to detect, monitor and protect Nationwide Information when at rest, in use and in transit.",
        "groups": "Group 1",
        "rationale": "",
        "roleResponsible": [
            "Security & Resilience"
        ],
        "guidance": "DLP controls must be considered as part of risk assessment.",
        "mappings": {
            "NIST": [
                "PR.AT-1",
                "PR.AT-3",
                "PR.IP-7",
                "PR.IP-8"
            ]
        }
    },
    {
        "title": "Information Handling & Management",
        "id": "SCS-INFHM-5.2.2",
        "description": "Nationwide Information classified as INTERNAL, CONFIDENTIAL or SECRET must be protected from unauthorised disclosure and loss by identifying the potential electronic data loss channels (including but not limited to email, file transfer, and Collaboration Tools), and implementing DLP solutions and processes to detect, monitor and protect Nationwide Information when at rest, in use and in transit.",
        "groups": "Group 1",
        "rationale": "",
        "roleResponsible": [
            "Security & Resilience"
        ],
        "guidance": "DLP controls must be considered as part of risk assessment.",
        "mappings": {
            "NIST": [
                "PR.AT-1",
                "PR.AT-3",
                "PR.IP-7",
                "PR.IP-8"
            ]
        }
    },
    {
        "title": "Information Handling & Management",
        "id": "SCS-INFHM-5.2.3",
        "description": "An assessment must be performed to identify the threats and risks to Nationwide Information, including:\na) \tidentifying and defining the external egress routes and internal sharing routes;\nb) \tdefining the DLP rules and tolerances for the implementation of DLP solutions",
        "groups": "Group 1",
        "rationale": "",
        "roleResponsible": [
            "Security & Resilience"
        ],
        "guidance": "DLP controls must be considered as part of risk assesment.",
        "mappings": {
            "NIST": [
                "PR.AT-1",
                "PR.AT-3",
                "PR.IP-7",
                "PR.IP-8"
            ]
        }
    },
    {
        "title": "Information Handling & Management",
        "id": "SCS-INFHM-5.2.4",
        "description": "Community Risk Partners must support and approve the identification of data egress routes.",
        "groups": "Group 1",
        "rationale": "",
        "roleResponsible": [
            "Senior Risk Partner"
        ],
        "guidance": "DLP controls must be considered as part of risk assessment.",
        "mappings": {
            "NIST": [
                "PR.AT-1",
                "PR.AT-3",
                "PR.IP-7",
                "PR.IP-8"
            ]
        }
    },
    {
        "title": "Information Handling & Management",
        "id": "SCS-INFHM-5.2.5",
        "description": "Community Risk Partners must define data loss prevention rules and tolerances for implementation within DLP processes and tooling",
        "groups": "Group 1",
        "rationale": "",
        "roleResponsible": [
            "Senior Risk Partner"
        ],
        "guidance": "DLP controls must be considered as part of risk assessment.",
        "mappings": {
            "NIST": [
                "PR.AT-1",
                "PR.AT-3",
                "PR.IP-7",
                "PR.IP-8"
            ]
        }
    },
    {
        "title": "Information Handling & Management",
        "id": "SCS-INFHM-5.2.6",
        "description": "Change initiatives amending potential data loss channels and DLP rules must engage with the Security Function to ensure that data loss channels continue to be managed within Operational Risk Appetite and/or that supporting Information Security Risk Assessments are updated",
        "groups": "Group 1",
        "rationale": "",
        "roleResponsible": [
            "Change/Project Sponsor",
            "Chief Product Owner",
            "Product Owner"
        ],
        "guidance": "",
        "mappings": {
            "NIST": [
                "PR.AT-1",
                "PR.AT-3",
                "PR.IP-7",
                "PR.IP-8"
            ]
        }
    },
    {
        "title": "Information Handling & Management",
        "id": "SCS-INFHM-5.2.7",
        "description": "Communities must maintain a data transmissions register detailing the Nationwide Information being transmitted to members and suppliers for usage within DLP solutions",
        "groups": "Group 1",
        "rationale": "",
        "roleResponsible": [
            "Community Leaders"
        ],
        "guidance": "Applicable if NBS are sending data to a member using email or physical media or other electronic method.",
        "mappings": {
            "NIST": [
                "PR.AT-1",
                "PR.AT-3",
                "PR.IP-7",
                "PR.IP-8"
            ]
        }
    },
    {
        "title": "Information Handling & Management",
        "id": "SCS-INFHM-6.1",
        "description": "Nationwide Information classified as INTERNAL, CONFIDENTIAL and SECRET that is used outside of the control of Nationwide must be protected using a digital rights management (DRM) system that:\na) \trestricts access to Nationwide Information to authorised individuals;\nb) \tprotects Nationwide Information against unauthorised changes, copying and distribution;\nc) \tmonitors the use of Nationwide Information;\nd) \trecords any changes that take place in case a future investigation is required",
        "groups": "Group 1",
        "rationale": "",
        "roleResponsible": [
            "Security & Resilience"
        ],
        "guidance": "Project to evidence that the enterprise DRM solution is used (if available) and else unless project is delivering this capability its N/A",
        "mappings": {
            "NIST": [
                "PR.AT-1",
                "PR.AT-3",
                "PR.IP-7",
                "PR.IP-8"
            ]
        }
    },
    {
        "title": "Security Management",
        "id": "SCS-SECM-3.4",
        "description": "For each Nationwide IT System, all relevant legal, regulatory and contractual requirements and obligations affecting security, and Nationwide’s approach to meeting these requirements, must be: \na) \tidentified and documented;\nb) \tmaintained through reviews at least annually or earlier in the event of material change or incident occurring",
        "groups": "",
        "rationale": "",
        "roleResponsible": [
            "Information Asset Owner"
        ],
        "guidance": "",
        "mappings": {
            "NIST": [
                "ID.GV-3",
                "ID.GV-4"
            ]
        }
    },
    {
        "title": "Application Security",
        "id": "SCS-APPS-1.1",
        "description": "Applications must:\na) \tbe registered in the information asset inventory;\nb) \tbe assigned owners and custodians;\nc) \tbe supported by complete and maintained application security assessments and information security risk assessments in accordance with Information Security Risk Assessment;\nd) \tbe developed in accordance with Secure Coding Standards and industry best practices (e.g. OWASP);\ne) \tbe deployed on secure infrastructure in accordance with Security Technology Standards;\nf) \tretain logically separated or offline copies of source code in accordance with Systems Development Lifecycle;\ng) \tbe assessed for technical vulnerabilities (including any supplier code libraries) and patched in accordance with Technical Vulnerability Management;\nh) \tlog activity and monitoring in accordance with Logging and Monitoring;\ni) \tbe procured in accordance with Supply Chain Management",
        "groups": "Group 1",
        "rationale": "These are fundamental baseline requirements for applications within Nationwide to ensure that they are appropriately secure and that the security is continuously managed. This approach will help to ensure much less likelihood of security threats and risks occurring - impacting the business area that owns the system, Nationwide's and our members data.",
        "roleResponsible": [
            "Engineering"
        ],
        "guidance": "",
        "mappings": {
            "NIST": [
                "ID.AM-2",
                "ID.AM-6",
                "ID.RA-1",
                "PR.IP-2",
                "ID.RA-5",
                "DE.CM-4",
                "DE.CM-8",
                "DE.AE-2",
                "PR.PT-1"
            ]
        }
    },
    {
        "title": "Application Security",
        "id": "SCS-APPS-1.2",
        "description": "Applications must be protected against invalid connections by:\na) \tassuming input from external systems is insecure by default;\nb) \tchecking access permissions when a request is made to access an object;\nc) \trepeating any client validation upon connection to the server to defend against man-in-the-middle attacks",
        "groups": "Group 1",
        "rationale": "This is to reduce the likelihood of unauthorised access of the system by other systems, processes or devices occurring.",
        "roleResponsible": [
            "Engineering"
        ],
        "guidance": "",
        "mappings": {
            "NIST": [
                "PR.AC-4",
                "PR.IP-2"
            ]
        }
    },
    {
        "title": "Application Security",
        "id": "SCS-APPS-1.3",
        "description": "Applications must be protected against unauthorised access to Nationwide Information by applying defence in depth measures, including:\na) \temploying secure defaults;\nb) \tensuring components fail securely;\nc) \tensuring user accounts are authenticated, segregated, restricted, and run under principle of least privilege in accordance with Identity and Access Management;\nd) \tutilising service accounts and not root accounts;\ne) \tensuring administrative access to infrastructure (including operating systems and databases) is conducted through segregated network management planes in accordance with Network Security.",
        "groups": "Group 1",
        "rationale": "Defence in depth is about delivering layered security control that provide multiple barriers for an attacker to get through - this provides a robust security posture for the system and the information within it.",
        "roleResponsible": [
            "Engineering"
        ],
        "guidance": "",
        "mappings": {
            "NIST": [
                "PR.AC-4",
                "PR.IP-2",
                "PR.IP-1",
                "PR.AT-2"
            ]
        }
    },
    {
        "title": "Application Security",
        "id": "SCS-APPS-1.4",
        "description": "Applications must be protected against unauthorised disclosure of Nationwide Information by ensuring that they:\na) \trun with least privilege;\nb) \tdo not require any unauthorised services;\nc) \tset strict file permissions;\nd) \tmanage updates in accordance with Change Management;\ne) \tuse approved, secure methods of applying updates;\nf) \tprevent unauthorised network connections;\ng) \tprevent disclosure of the internal workings of applications (including development annotations);\nh) \tdo not store authentication data after authorisation and render all data unrecoverable upon completion of the authorisation process;\ni) \tuse encryption in accordance with Cryptography (including for PII and PAN data);\nj) \tretain, store and delete Nationwide Information, including cardholder data in accordance with Data Retention;\nk) \trender Primary Account Number (PAN) data unreadable anywhere it is stored at rest",
        "groups": "Group 1",
        "rationale": "This is to help ensure that applications do not accidentally expose sensitive system information or Nationwide information or provide routes to do so for threat actors.",
        "roleResponsible": [
            "Engineering"
        ],
        "guidance": "",
        "mappings": {
            "NIST": [
                "PR.AC-4",
                "PR.AT-2",
                "PR.IP-1",
                "PR.IP-3",
                "PR.IP-7",
                "PR.IP-12"
            ]
        }
    },
    {
        "title": "Application Security",
        "id": "SCS-APPS-1.5",
        "description": "Applications must incorporate security controls to protect the confidentiality and integrity of Nationwide Information by:\na) \tminimising manual intervention;\nb) \tpreventing unauthorised changes to software;\nc) \tproducing error and exception reports;\nd) \tchecking input and output information for validity and completeness;\ne) \tutilising encryption for the storage of SECRET Nationwide Information, including authentication data, in accordance with Cryptography;\nf) \tpreventing accidental overwriting;\ng) \timplementing dual authorisation procedures for changes to key static data files, such as base interest rates;\nh) \tdetecting unauthorised or incorrect changes",
        "groups": "Group 1",
        "rationale": "Confidentiality and integrity controls help to ensure that information is kept secret and also kept accurate and complete.",
        "roleResponsible": [
            "Engineering"
        ],
        "guidance": "",
        "mappings": {
            "NIST": [
                "PR.AC-4",
                "PR.AT-2",
                "PR.IP-1",
                "PR.IP-3",
                "PR.IP-7",
                "PR.IP-12"
            ]
        }
    },
    {
        "title": "Application Security",
        "id": "SCS-APPS-1.6",
        "description": "Applications must incorporate security controls to protect the availability of Nationwide Information by:\na) \tproviding adequate capacity to cope with normal/peak volumes of work;\nb) \tperforming load-balancing and load-monitoring;\nc) \treducing or eliminating single points of failure;\nd) \tensuring that operational security procedures are documented, in use, and communicated to all affected parties in accordance with Security Policies and Standards Management and Data Retention",
        "groups": "Group 1",
        "rationale": "Availability controls help to ensure that information is kept available as and when required to those who are entitled to access/process it.",
        "roleResponsible": [
            "Engineering"
        ],
        "guidance": "",
        "mappings": {
            "NIST": [
                "PR.DS-4",
                "PR.IP-9",
                "PR.IP-10",
                "ID.RM-2"
            ]
        }
    },
    {
        "title": "Application Security",
        "id": "SCS-APPS-1.7",
        "description": "Files containing Nationwide Information transmitted between Nationwide IT Systems, suppliers and external parties must:\na) \tbe clearly identified and owned;\nb) \tprotect the integrity of data through the utilisation of integrity checks (e.g. use of hash sums) in accordance with Information Classification;\nc) \tbe supported through defined error handling and exception reporting to escalate integrity issues in accordance with Information Classification",
        "groups": "Group 1",
        "rationale": "This helps to ensure the information cannot be altered during it's transmission (or is identifiable if it is) and the transmission itself is recorded and owned.",
        "roleResponsible": [
            "Engineering"
        ],
        "guidance": "",
        "mappings": {
            "NIST": [
                "DE.AE-5",
                "PR.DS-5",
                "PR.DS-6",
                "PR.PT-1"
            ]
        }
    },
    {
        "title": "Application Security",
        "id": "SCS-APPS-1.8",
        "description": "Applications hosted on virtual or shared infrastructure and components must be logically separated on the basis of the Nationwide IT System Asset Classification",
        "groups": "Group 1",
        "rationale": "There are likely to be occasions when 2 systems have different security asset classifications e.g. security Tier 1 and Security Tier 4 - separation helps to ensure a user or admin of a Tier 4 cannot easily interact with a highly sensitive Tier 1 system.",
        "roleResponsible": [
            "Engineering"
        ],
        "guidance": "",
        "mappings": {
            "NIST": [
                "PR.DS-7"
            ]
        }
    },
    {
        "title": "Application Security",
        "id": "SCS-APPS-2.6",
        "description": "The unauthorised disclosure of system configuration information used by internet facing web-based applications must be prevented by:\na) \tsuppressing or modifying headers that identify the type and version of the web server;\nb) \tverifying that transactional areas and directories of files on web servers are not indexable by search engines;\nc) \tpreventing source code of server-side executables and scripts from being viewed;\nd) \tensuring that the source of program code does not contain unnecessary information or notes, inclusive of encryption keys, PAN, PII, or product descriptions",
        "groups": "Group 1",
        "rationale": "As these type of systems are more exposed to a wider audience, extra care must be taken so that information useful to threat actors (hackers) such as configuration information is not accessible.",
        "roleResponsible": [
            "Engineering"
        ],
        "guidance": "",
        "mappings": {
            "NIST": [
                "PR.IP-1",
                "PR.IP-2",
                "PR.IP-3"
            ]
        }
    },
    {
        "title": "Application Security",
        "id": "SCS-APPS-2.9",
        "description": "Domain Names used by web-based applications hosting Nationwide Information and/or utilising Nationwide or subsidiary branding, or intellectual property must: \na) \tbe registered in a centralised inventory of purchased and utilised domain names;\nb) \tbe reviewed and renewed in accordance with expiry dates",
        "groups": "Group 1",
        "rationale": "This enables Nationwide to keep track of the official domain names in use by Nationwide and its subsidiaries.",
        "roleResponsible": [
            "Information Asset Owner",
            "Relationship Manager/Owner"
        ],
        "guidance": "",
        "mappings": {
            "NIST": [
                "ID.AM-2"
            ]
        }
    },
    {
        "title": "Application Security",
        "id": "SCS-APPS-4.1.1",
        "description": "Application Programming Interfaces (APIs) developed or acquired for usage by Nationwide must:\na) \tbe categorised in accordance with business requirements;\nb) \tbe registered within the information asset inventory (i.e. the configuration management database [CMDB]);\nc) \tbe provided with a unique identification number and enforce tracking;\nd) \tbe developed in accordance with Secure Coding Standards and industry best practices (e.g. OWASP);\ne) \tprovide signed digital certificates for supplier consumption in accordance with Cryptography;\nf) \tutilise a Nationwide approved API gateway",
        "groups": "Group 1",
        "rationale": "It's important for Nationwide to record all of its assets and use Nationwide's approved security standards and frameworks so that they can be securely protected and maintained.",
        "roleResponsible": [
            "Engineering"
        ],
        "guidance": "",
        "mappings": {
            "NIST": [
                "ID.AM-2",
                "ID.AM-5",
                "PR.DS-3",
                "PR.IP-1"
            ]
        }
    },
    {
        "title": "Application Security",
        "id": "SCS-APPS-4.1.2",
        "description": "APIs developed or acquired for usage by Nationwide must:\na) \tprovide a System Developer Kit (SDK) that identifies a clear business purpose, data format and classification of information processed through the API in accordance with Information Classification;\nb) \tidentify the sensitivity of data processed through the API in accordance with Information Classification;\nc) \tbe supported by rate limiting and throttling to protect against Denial of Services (DoS) attacks;\nd) \tbe configured to expire inactive sessions;\ne) \tbe protected against automated attacks through application layer filtering technologies (e.g. WAFs) if interfacing to untrusted entities;\nf) \tbe securely coded and subject to continuous vulnerability scanning in accordance with Technical Vulnerability Management;\ng) \tprotect the confidentiality, integrity and availability of the Nationwide Information in transit;\nh) \tbe subject to continuous volume and capacity monitoring in accordance with Capacity Management;\ni) \tbe configured to refuse unauthorised configuration queries;\nj) \tsupport event tracking and logging;\nk) \tmeet resilience requirements in accordance with defined Recovery Time Objectives (RTOs) and Recovery Point Objectives (RPOs) .",
        "groups": "Group 1",
        "rationale": "These are fundamental baseline requirements for APIs  to ensure that they are appropriately secure and that the security is continuously managed. This approach will help to ensure much less likelihood of security threats and risks occurring - impacting the business area that owns the system, Nationwide's and our members data.",
        "roleResponsible": [
            "Engineering"
        ],
        "guidance": "",
        "mappings": {
            "NIST": [
                "PR.IP-1",
                "PR.IP-2",
                "PR.IP-3",
                "PR.DS-4",
                "PR.DS-6",
                "PR.PT-1"
            ]
        }
    },
    {
        "title": "Application Security",
        "id": "SCS-APPS-4.1.3",
        "description": "APIs providing Members or Intermediaries with the capability to access Nationwide Information and interact with Nationwide IT Systems must additionally:\na) \timplement enrolment and de-enrolment procedures;\nb) \tset expiry dates / requirements for renewal for in accordance with Member Access Control;\nc) \tbe configured for session expiry in accordance with Identity and Access Management;\nd) \tsupport identity, authentication, authorisation and accounting;\ne) \tbe configured to restrict access based on geolocation, time and date in accordance with business requirements.",
        "groups": "Group 1",
        "rationale": "Where access to Nationwide system/information is required additional security controls are required to help ensure unauthorised access is prevented.",
        "roleResponsible": [
            "Engineering"
        ],
        "guidance": "",
        "mappings": {
            "NIST": [
                "PR.IP-1",
                "PR.IP-2",
                "PR.IP-3",
                "PR.DS-4"
            ]
        }
    },
    {
        "title": "Application Security",
        "id": "SCS-APPS-4.2.1",
        "description": "Third Party APIs consumed by Nationwide IT Systems must be verified and on-boarded in accordance with business processes prior to operational usage, this procedure must:\na) \trequire registration in an asset inventory;\nb) \tvalidate the security and efficacy of the API;\nc) \trequire approval by the relevant security governing body prior to usage;\nd) \ton-board APIs to anomaly monitoring in accordance with Logging and Monitoring;\ne) \trequire acquisition and integration in accordance with Supply Chain Management;\nf) \tprovide access to relevant logs for security monitoring or investigation;\ng) \tbe subject to formal change management procedures in accordance with Change Management;\nh) \tmeet resilience and service availability requirements in accordance with defined RTOs, RPOs, Service Level Agreements (SLAs) and Operational Level Agreements (OLAs);\ni) \tbe supported by a System Developer Kit (SDK) detailing the clear business purpose, data format and classification of any Nationwide Information processed",
        "groups": "Group 1",
        "rationale": "These steps will help to validate the API feed as a trusted source of information and manage and monitor it's interaction with Nationwide.",
        "roleResponsible": [
            "Engineering"
        ],
        "guidance": "",
        "mappings": {
            "NIST": [
                "ID.AM-2",
                "ID.AM-5",
                "PR.DS-3",
                "PR.IP-1"
            ]
        }
    },
    {
        "title": "Application Security",
        "id": "SCS-APPS-5.1",
        "description": "Databases classified as Tier 1 and Tier 2 must maintain logical segregation from other classifications in accordance with Nationwide IT System Asset Classification.",
        "groups": "Group 1",
        "rationale": "There are likely to be occasions when 2 databases have different security asset classifications e.g. security Tier 1 and Security Tier 4 - segregation helps to ensure a user or admin of a Tier 4 cannot easily interact with a highly sensitive Tier 1 database.",
        "roleResponsible": [
            "Engineering"
        ],
        "guidance": "",
        "mappings": {
            "NIST": [
                "ID.AM-2",
                "ID.AM-5"
            ]
        }
    },
    {
        "title": "Application Security",
        "id": "SCS-APPS-5.2",
        "description": "Databases accessible by applications must be protected by: \na) \tensuring all databases are never directly exposed to/from the internet;\nb) \trestricting administrative views and privileged access to authorised users;\nc) \tensuring only users authorised for database administration duties have the ability to directly access or query databases;\nd) \tapplying procedures for all practical, application and operational change processes;\ne) \tutilising encryption in accordance with Cryptography",
        "groups": "Group 1",
        "rationale": "These steps help to prevent unauthorised access by other applications that are not expected to interact with the database and validates the ones that are approved.",
        "roleResponsible": [
            "Engineering"
        ],
        "guidance": "",
        "mappings": {
            "NIST": [
                "ID.AM-2",
                "ID.AM-5",
                "PR.DS-3",
                "PR.IP-1"
            ]
        }
    },
    {
        "title": "Application Security",
        "id": "SCS-APPS-6.1",
        "description": "The use of containerisation and microservices must be protected by:\na) \tmaintaining a register of all Managed Base Images (MBIs);\nb) \tsegregating containerised and non-containerised workloads;\nc) \tperforming continuous vulnerability scanning of MBIs;\nd) \tenabling runtime protection across all clusters; \ne) \tuniquely tagging all images for version and environment control;\nf) \tperforming routine patching and re-deployment of images in accordance with the patch management requirements specified in Systems Maintenance;\ng) \trestricting developers to only deploy maintained digitally signed images;\nh) \tretaining images that have been deployed into production for a minimum of 3 months;\ni) \tdeveloping images in accordance with the environments specified in Systems Development Lifecycle;\nj) \trunning containers with least privilege;\nk) \tnot running applications under root;\nl) \tensuring containers do not mount the underlying host file system;\nm) \tenabling logging and monitoring for container management tools in accordance with Logging and Monitoring.",
        "groups": "Group 1",
        "rationale": "These are fundamental baseline requirements for containerisation and microservices (likely in use in cloud based infrastructure) to help ensure that they are appropriately secure and that the security is continuously managed. This approach will help to ensure much less likelihood of security threats and risks occurring - impacting the business area that owns the system, Nationwide's and our members data.",
        "roleResponsible": [
            "Engineering"
        ],
        "guidance": "",
        "mappings": {
            "NIST": [
                "ID.AM-2",
                "ID.AM-5",
                "PR.DS-3",
                "PR.IP-1"
            ]
        }
    },
    {
        "title": "Application Security",
        "id": "SCS-APPS-7.2",
        "description": "Access Control procedures for Payment Application Systems must:\na) \tensure segregation of duties between user administration responsibilities and abilities to input/authorise payments;\nb) \tprovide access on a least privilege based in accordance with Identity and Access Management;\nc) \timmediately disable authentication tokens no longer required to perform payment input and authorisation.",
        "groups": "Group 1",
        "rationale": "These controls will play a significant role in preventing fraud.",
        "roleResponsible": [
            "Information Asset Owner"
        ],
        "guidance": "",
        "mappings": {
            "NIST": [
                "PR.AC-4",
                "PR.AT-2"
            ]
        }
    },
    {
        "title": "Application Security",
        "id": "SCS-APPS-8.1",
        "description": "Nationwide IT Systems and applications processing payment card data as defined within the scope of the Payment Card Industry Data Security Standard (PCI-DSS) must meet the minimum requirements as defined within PCI-DSS",
        "groups": "Group 1",
        "rationale": "Payment card data and processing of it is regulated by the Payment Card Industry - Data Security Standard so the PCI-DSS regulations need to be met in full for these systems. Any control gaps should be reviewed and approved by an external QSA.",
        "roleResponsible": [
            "Engineering"
        ],
        "guidance": "",
        "mappings": {
            "NIST": [
                "ID.GV-3",
                "ID.GV-4"
            ]
        }
    },
    {
        "title": "Security Incident Management",
        "id": "SCS-SINCM-3.1.1",
        "description": "Incident Response Plans must be defined for each Cloud Service. The plan must be authorised by the Senior Relationship Owner (SRO) and maintained in line with the Nationwide Incident Management Policy. The Incident Response Plan must include:\na) \tthe nature of the Cloud Service with:\ni.\tthe Business Impact Assessment (BIA);\nii.\tresults from the Cloud Service Risk Assessment;\niii.\toutputs from Threat Modelling;\niv.\tHigh Level Designs (HLDs) and Low Level Designs (LLDs);\nb) \tinformation about the Service and Asset Ownership including:\ni.\tlocations for storing subscription, instance and privileged account credentials for the service, especially if different to on-premise legacy service ownership;\nii.\tcontact details for nominated points of contact within both the Cloud Service Provider and Nationwide;\nc) \tinformation about Control Plane Aspects:\ni.\tand where the control plane is presented (including IP restrictions);\nii.\tindividuals with access and their credentials;\niii.\tlocations of logs of control plane access via Uniform Resource Locators (URLs) and Application Programming Interfaces (APIs);\niv.\thow the instance or subscription can be placed into Maintenance Mode;\nd) \tan overview of containment options including:\ni.\twhether the platform can be put into Maintenance Mode;\nii.\tmethods to constrain access to and from the Cloud Service, considering associated business impacts;\niii.\tthe Cloud Service Provider exit plan detailing the procedures for terminating service provision;\ne) \tisolation of the Cloud Service from on-premise solutions, especially where the Cloud Environment is in containment to allow for investigation, eradication and recovery; \nf) \tthe Shared Responsibility Model with contacts for responsible parties;\ng) \tincident readiness materials (e.g. tools, schematics and credentials) required for investigation, containment and eradication with the ability to access any required information inside the Cloud Environment;\nh) \tprocedures for supporting forensic investigations and any relevant forensics scenarios from the Cyber Playbook;\ni) \tprocedures for identifying, establishing and maintaining appropriate contacts with authorities, external interest groups or forums that handle the issues regarding cloud-related Security Incidents, including: \ni.\twhich authorities the Cloud Service Provider and Nationwide must contact in the event of a Security Incident;\nii.\tthe nominated points of contact within the Cloud Service Provider and Nationwide that are authorised to contact the authorities in the event of a Security Incident;\niii.\ttriggers for contact with authorities;\niv.\tcoordination, clarification and clear delineation between responsibilities of the Cloud Service Provider and Nationwide to ensure that both parties can meet their obligations, follow due process and manage their reputational risks;\nv.\tany instances where contact will occur by either Cloud Service Provider or Nationwide with authorities that will not be notified to the other party.",
        "groups": "",
        "rationale": "",
        "roleResponsible": [
            "Information Asset Owner",
            "IT Custodian",
            "Relationship Manager/Owner"
        ],
        "guidance": "",
        "mappings": {
            "NIST": [
                "ID.RA-1",
                "ID.RA-2",
                "DE.DP-1",
                "RS.RP-1",
                "RS.CO-2",
                "RS.CO-3",
                "RS.CO-4",
                "RS.AN-1",
                "RS.AN-2",
                "RS.AN-3"
            ]
        }
    },
    {
        "title": "Security Incident Management",
        "id": "SCS-SINCM-3.1.2",
        "description": "Incident Response Plans must be maintained and supported by SLAs and included within the Shared Responsibility Model in accordance with Supply Chain Management",
        "groups": "",
        "rationale": "",
        "roleResponsible": [
            "Information Asset Owner",
            "IT Custodian",
            "Relationship Manager/Owner"
        ],
        "guidance": "",
        "mappings": {
            "NIST": [
                "RS.AN-1"
            ]
        }
    },
    {
        "title": "Security Incident Management",
        "id": "SCS-SINCM-3.2.1",
        "description": "Forensic requirements must be established for each Nationwide IT System or the Nationwide Information being hosted within the Cloud Service Provider in advance of service design and build in accordance with Systems Development Lifecycle",
        "groups": "",
        "rationale": "",
        "roleResponsible": [
            "Information Asset Owner",
            "Relationship Manager/Owner"
        ],
        "guidance": "",
        "mappings": {
            "NIST": [
                "RS.AN-1",
                "RS.AN-2",
                "RS.AN-3"
            ]
        }
    },
    {
        "title": "Identity and Access Management",
        "id": "SCS-IAM-1.1.1",
        "description": "User access procedures for Nationwide IT Systems and Nationwide Information must be determined through an Information Security Risk Assessment. \n\nInformation Asset Owners for Nationwide IT Systems must ensure that user access control documentation defines:\na) \tan access control matrix specifying user roles and entitlements; \nb) \tdescriptions of roles and entitlements for user provisioning and recertification in accordance with minimum data quality requirements; \nc) \trequired authorisation levels (i.e. Line Manager and/or Entitlement Owner) for roles and entitlements;\nd) \tbusiness requirements for intra-application and cross-application segregation of duties;\ne) \tthe risk scoring for user roles and entitlements;\nf) \trequired and/or permitted shared IDs;\ng) \tauthentication requirements;\nh) \tany additional retention periods and audit trails of access requests and activities; \ni) \tlegislative, regulatory and contractual obligations",
        "groups": "Group 1",
        "rationale": "To ensure that the IT system security requirements are understood, built into the system correctly and that levels of access are approved by appropriate owners.",
        "roleResponsible": [
            "Information Asset Owner"
        ],
        "guidance": "The Logical Access Team should be contacted to assist with this Delivery.",
        "mappings": {
            "NIST": [
                "ID.AM-5",
                "PR.AC-1",
                "PR.AC-2",
                "PR.AC-4",
                "PR.AT-1",
                "PR.AT-2"
            ]
        }
    },
    {
        "title": "Identity and Access Management",
        "id": "SCS-IAM-1.1.2",
        "description": "Information Asset Owners must review the access control matrix and segregation of duties requirements in accordance with the following timeframes:\n•\tTier 1 Nationwide IT Systems – at least every 6 months;\n•\tTier 2 Nationwide T Systems – at least every 6 months;\n•\tTier 3 Nationwide IT Systems – at least every 24 months;\n•\tTier 4 Nationwide IT Systems – at least every 24 months",
        "groups": "Group 1",
        "rationale": "To ensure that requirements are up to date.  It also provides a backup control to ensure any changes made as part of an initiative have been reflected in the requirements.",
        "roleResponsible": [
            "Information Asset Owner"
        ],
        "guidance": "Project just needs to evidence they have passed the requirement to BAU. An email will suffice.",
        "mappings": {
            "NIST": [
                "ID.AM-5",
                "PR.AC-1",
                "PR.AC-2",
                "PR.AC-4",
                "PR.AT-1",
                "PR.AT-2"
            ]
        }
    },
    {
        "title": "Identity and Access Management",
        "id": "SCS-IAM-1.1.3",
        "description": "Tier 1 and Tier 2 Nationwide IT Systems must be on-boarded into strategic identity and access management tools",
        "groups": "Group 1",
        "rationale": "Ensures that access controls are undertaken through a consistent and automated process.",
        "roleResponsible": [
            "Information Asset Owner",
            "Change Squads"
        ],
        "guidance": "The Logical Access Team should be contacted to assist with this Delivery.",
        "mappings": {
            "NIST": [
                "PR.AC-1",
                "PR.AC-2",
                "PR.AC-4"
            ]
        }
    },
    {
        "title": "Identity and Access Management",
        "id": "SCS-IAM-1.1.4",
        "description": "All user access must be correlated to provide an Authoritative Source of Record.",
        "groups": "Group 1",
        "rationale": "Ensures a single source of truth for access to IT systems.  It also aids identification of access combinations that could cause a threat for the business e.g. creating expense claim and approving.",
        "roleResponsible": [
            "Information Asset Owner",
            "Change Squads"
        ],
        "guidance": "Met if AD integrated Else will need to demonstrate compliance.",
        "mappings": {
            "NIST": [
                "PR.AC-1",
                "PR.AC-2",
                "PR.AC-4"
            ]
        }
    },
    {
        "title": "Identity and Access Management",
        "id": "SCS-IAM-1.1.5",
        "description": "Tier 1 and Tier 2 Nationwide IT Systems hosted within Cloud Environments must be on-boarded into on-premise or cloud-based strategic identity and access management tools for user access recertification",
        "groups": "Group 1",
        "rationale": "Ensure that access recertification (checking that it is only those that still need access, have access) is undertaken in consistent way.",
        "roleResponsible": [
            "Information Asset Owner",
            "Change Squads"
        ],
        "guidance": "The Logical Access Team should be contacted to assist with this Delivery.",
        "mappings": {
            "NIST": [
                "PR.PT-3",
                "PR.AC-1",
                "PR.AC-2",
                "PR.AC-4"
            ]
        }
    },
    {
        "title": "Identity and Access Management",
        "id": "SCS-IAM-1.1.6",
        "description": "When available, Tier 1 and Tier 2 Nationwide IT Systems hosted within Cloud Environments must be on-boarded into on-premise or cloud-based strategic identity and access management tools for user provisioning and de-provisioning",
        "groups": "Group 1",
        "rationale": "Ensures that access controls are undertaken through a consistent and automated process.",
        "roleResponsible": [
            "Information Asset Owner",
            "Change Squads"
        ],
        "guidance": "The Logical Access Team should be contacted to assist with this Delivery.",
        "mappings": {
            "NIST": [
                "PR.PT-3",
                "PR.AC-1",
                "PR.AC-2",
                "PR.AC-4"
            ]
        }
    },
    {
        "title": "Identity and Access Management",
        "id": "SCS-IAM-1.1.7",
        "description": "Line Managers of employees and contingent workers with access to the Nationwide IT Network, inclusive of privileged access, must notify People & Culture of employees and contingent workers whom are subject to disciplinary actions and/or at risk of redundancy and consider additional controls.",
        "groups": "Group 1",
        "rationale": "This is to manage any internal threat posed e.g. a member of staff becomes disenchanted by disciplinary action and considers taking malicious action, based on level of access.",
        "roleResponsible": [
            "Line Managers"
        ],
        "guidance": "Applicable if Project is putting anyone at risk of redundancy else N/A",
        "mappings": {
            "NIST": [
                "PR.PT-3",
                "PR.AC-1",
                "PR.AC-2",
                "PR.AC-4"
            ]
        }
    },
    {
        "title": "Identity and Access Management",
        "id": "SCS-IAM-1.3.1",
        "description": "A formal user access provisioning process must be implemented to assign access rights for all user types with access to Nationwide IT Systems. The provisioning process for assigning additional access rights must:\na) \tbe documented for all Nationwide IT Systems within a technical security manual;\nb) \tobtain authorisation from Line Managers and/or Entitlement Owners as specified by the Information Asset Owner for the Nationwide IT System;\nc) \tensure that the new access requests are assessed for toxic combinations and approved/declined as required;\nd) \tassign unique and random passwords for all new accounts; \ne) \tensure segregation of duties between the access requestor, authoriser, and systems administrator;\nf) \tensure that access rights are not activated before authorisation procedures are completed;\ng) \tprovide an end-date for temporary access;\nh) \tmaintain a tamper-proof audit trail of all assigned access rights",
        "groups": "Group 1",
        "rationale": "",
        "roleResponsible": [
            "Information Asset Owner",
            "Security & Resilience"
        ],
        "guidance": "Met if IIQ is being used else compliance will need to be evidenced.",
        "mappings": {
            "NIST": [
                "PR.PT-3",
                "PR.AC-1",
                "PR.AC-2",
                "PR.AC-4"
            ]
        }
    },
    {
        "title": "Identity and Access Management",
        "id": "SCS-IAM-1.3.2",
        "description": "The use of shared or group IDs must be avoided and only be permitted where they are necessary with the exception of pooled accounts provided for Privileged Access Management (PAM) purposes where access control and non-repudiation is maintained in a PAM Solution. Wherever shared or group IDs are permitted, rationale and justification must be documented, approved by the Information Asset Owner and reviewed at least every 6 months",
        "groups": "Group 1",
        "rationale": "",
        "roleResponsible": [
            "Information Asset Owner",
            "Security & Resilience"
        ],
        "guidance": "Where the use of new shared or group ids are required the Privileged Access Management team must be contacted to onboard, else N/A",
        "mappings": {
            "NIST": [
                "PR.PT-3",
                "PR.AC-1",
                "PR.AC-2",
                "PR.AC-4"
            ]
        }
    },
    {
        "title": "Identity and Access Management",
        "id": "SCS-IAM-1.4.2",
        "description": "Checks must be made at least weekly to identify movers and leavers who have not had their access to Nationwide IT Systems and Nationwide Information reviewed and amended",
        "groups": "Group 1",
        "rationale": "",
        "roleResponsible": [
            "Security & Resilience",
            "People & Culture"
        ],
        "guidance": "Met if AD integrated Else will need to demonstrate compliance.",
        "mappings": {
            "NIST": [
                "PR.PT-3",
                "PR.AC-1",
                "PR.AC-2",
                "PR.AC-4"
            ]
        }
    },
    {
        "title": "Identity and Access Management",
        "id": "SCS-IAM-1.5.1",
        "description": "The leave of absence process (e.g. for parental leave, long term sickness and disciplinary reasons) for user access to Nationwide IT Systems and Nationwide Information, in accordance with Employee Lifecycle, must:\na) \tensure all accounts are disabled within 24 hours from the commencement of leave;\nb) \tnot delete any user accounts;\nc) \tmaintain an audit trail of all activities",
        "groups": "Group 1",
        "rationale": "",
        "roleResponsible": [
            "Security & Resilience",
            "People & Culture"
        ],
        "guidance": "Met if AD and Peoplesoft integrated Else will need to demonstrate compliance.",
        "mappings": {
            "NIST": [
                "PR.PT-3",
                "PR.AC-1",
                "PR.AC-2",
                "PR.AC-4"
            ]
        }
    },
    {
        "title": "Identity and Access Management",
        "id": "SCS-IAM-1.5.2",
        "description": "Wherever emergency absence is required, Line Managers must undertake an access management review in collaboration with People & Culture and Legal (where appropriate) and on a case-by-case basis to determine any required changes to existing access permissions",
        "groups": "Group 1",
        "rationale": "",
        "roleResponsible": [
            "Line Managers"
        ],
        "guidance": "If applicable to change please use Intranet guidance on BAU process else N/A",
        "mappings": {
            "NIST": [
                "PR.PT-3",
                "PR.AC-1",
                "PR.AC-2",
                "PR.AC-4"
            ]
        }
    },
    {
        "title": "Identity and Access Management",
        "id": "SCS-IAM-1.6.1",
        "description": "The leaver process for user access to Nationwide IT Systems and Nationwide Information must:\na) \trequire Line Managers to submit requests for leavers as soon as the resignation is tendered and no later;\nb) \trequire all systems administrators to remove productivity accounts within 24 hours and all other access no later than 1 working day from the keyed termination date;\nc) \timmediately disable any privileged access in accordance with Privileged Access Management;\nd) \tdelete accounts;\ne) \tmaintain an audit trail of all activities",
        "groups": "Group 1",
        "rationale": "",
        "roleResponsible": [
            "Information Asset Owner",
            "Security & Resilience",
            "People & Culture"
        ],
        "guidance": "Met if IIQ and Peoplesoft integrated Else will need to demonstrate compliance.",
        "mappings": {
            "NIST": [
                "PR.PT-3",
                "PR.AC-1",
                "PR.AC-2",
                "PR.AC-4"
            ]
        }
    },
    {
        "title": "Identity and Access Management",
        "id": "SCS-IAM-1.6.2",
        "description": "A monthly reconciliation of all productivity accounts must be conducted to verify that accounts of leavers have been disabled/deleted",
        "groups": "Group 1",
        "rationale": "",
        "roleResponsible": [
            "Information Asset Owner",
            "Security & Resilience",
            "People & Culture"
        ],
        "guidance": "Met if IIQ and Peoplesoft integrated Else will need to demonstrate compliance.",
        "mappings": {
            "NIST": [
                "PR.PT-3",
                "PR.AC-1",
                "PR.AC-2",
                "PR.AC-4"
            ]
        }
    },
    {
        "title": "Identity and Access Management",
        "id": "SCS-IAM-1.7.1",
        "description": "The user access recertification processes for Nationwide IT Systems and Nationwide Information must:\na) \trequire Line Managers and Entitlement Owners to re-authorise or decline employee and contingent worker access;\nb) \tinclude all accounts within the associated Nationwide IT System, including but not limited to:\ni.\tdormant and disabled accounts;\nii.\tinteractive user accounts;\niii.\tsystem accounts;\niv.\tservice accounts;\nv.\tprivileged accounts;\nc) \tutilise a current and accurate access control list (ACL);\nd) \tinclude related segregation of duties or toxic combinations for the employee or contingent worker;\ne) \tprovide a summary output of the recertification to the Information Asset Owner for approval;\nf) \tamend any indicated changes to access rights within the recertification within 5 days of completion.\n",
        "groups": "Group 1",
        "rationale": "",
        "roleResponsible": [
            "Information Asset Owner",
            "Security & Resilience"
        ],
        "guidance": "The Logical Access team should be contacted to assist with impact assessment as to if any change impacts the recert process.",
        "mappings": {
            "NIST": [
                "PR.PT-3",
                "PR.AC-1",
                "PR.AC-2",
                "PR.AC-4"
            ]
        }
    },
    {
        "title": "Identity and Access Management",
        "id": "SCS-IAM-1.7.2",
        "description": "User access recertification for Nationwide IT Systems, inclusive of Cloud Environments, must be conducted in accordance with the following timeframes:\n•\tTier 1 Nationwide IT Systems – 6 months;\n•\tTier 2 Nationwide T Systems – 6 months;\n•\tTier 3 Nationwide IT Systems – 12 months;\n•\tTier 4 Nationwide IT Systems – 12 months",
        "groups": "Group 1",
        "rationale": "",
        "roleResponsible": [
            "Information Asset Owner",
            "Security & Resilience"
        ],
        "guidance": "The Logical Access team should be contacted to assist with impact assessment as to if any change impacts the recert process.",
        "mappings": {
            "NIST": [
                "PR.PT-3",
                "PR.AC-1",
                "PR.AC-2",
                "PR.AC-4"
            ]
        }
    },
    {
        "title": "Identity and Access Management",
        "id": "SCS-IAM-1.7.3",
        "description": "User access recertification of privileged access, inclusive of Cloud Environments, must be conducted at least on a quarterly basis in accordance with Privileged Access Management",
        "groups": "Group 1",
        "rationale": "",
        "roleResponsible": [
            "Information Asset Owner",
            "Security & Resilience"
        ],
        "guidance": "The Logical Access team should be contacted to assist with impact assessment as to if any change impacts the recert process.",
        "mappings": {
            "NIST": [
                "PR.PT-3",
                "PR.AC-1",
                "PR.AC-2",
                "PR.AC-4"
            ]
        }
    },
    {
        "title": "Identity and Access Management",
        "id": "SCS-IAM-1.7.4",
        "description": "Users access that breaches intra and cross-application segregation of duty rules must be recertified on a 6-monthly basis",
        "groups": "Group 1",
        "rationale": "",
        "roleResponsible": [
            "Information Asset Owner",
            "Security & Resilience"
        ],
        "guidance": "The Logical Access team should be contacted to assist with impact assessment as to if any change impacts the recert process.",
        "mappings": {
            "NIST": [
                "PR.PT-3",
                "PR.AC-1",
                "PR.AC-2",
                "PR.AC-4"
            ]
        }
    },
    {
        "title": "Identity and Access Management",
        "id": "SCS-IAM-1.7.5",
        "description": "Tier 3 and Tier 4 Nationwide IT Systems where the Information Asset Owner has defined cross-application segregation of duties requirements must be onboarded onto centralised identity and access management tools for the performance of user access recertification",
        "groups": "Group 1",
        "rationale": "",
        "roleResponsible": [
            "Information Asset Owner"
        ],
        "guidance": "The Logical Access team should be contacted to assist with impact assessment as to if any change impacts the recert process.",
        "mappings": {
            "NIST": [
                "PR.PT-3",
                "PR.AC-1",
                "PR.AC-2",
                "PR.AC-4"
            ]
        }
    },
    {
        "title": "Identity and Access Management",
        "id": "SCS-IAM-1.7.6",
        "description": "Nationwide IT Systems must be capable of providing an Access Control List (ACL) for recertification that includes all user accounts, user account status, assigned access rights and the last log-on date.",
        "groups": "Group 1",
        "rationale": "",
        "roleResponsible": [
            "Information Asset Owner",
            "IT Custodian"
        ],
        "guidance": "",
        "mappings": {
            "NIST": [
                "PR.PT-3",
                "PR.AC-1",
                "PR.AC-2",
                "PR.AC-4"
            ]
        }
    },
    {
        "title": "Identity and Access Management",
        "id": "SCS-IAM-1.8.1",
        "description": "User accounts granting access to the Nationwide IT Network (i.e. network log-ons) must be disabled after 30 days of inactivity",
        "groups": "Group 1",
        "rationale": "",
        "roleResponsible": [
            "Information Asset Owner",
            "Security & Resilience"
        ],
        "guidance": "Met if AD integrated Else will need to demonstrate complaince.",
        "mappings": {
            "NIST": [
                "PR.PT-3",
                "PR.AC-1",
                "PR.AC-2",
                "PR.AC-4"
            ]
        }
    },
    {
        "title": "Identity and Access Management",
        "id": "SCS-IAM-1.8.2",
        "description": "User access for Nationwide IT Systems not using network log-ons must be disabled after 60 days of inactivity",
        "groups": "Group 1",
        "rationale": "",
        "roleResponsible": [
            "Information Asset Owner",
            "Security & Resilience"
        ],
        "guidance": "",
        "mappings": {
            "NIST": [
                "PR.PT-3",
                "PR.AC-1",
                "PR.AC-2",
                "PR.AC-4"
            ]
        }
    },
    {
        "title": "Identity and Access Management",
        "id": "SCS-IAM-1.8.3",
        "description": "Line Manager authorisation must be provided to re-enable any disabled account.",
        "groups": "Group 1",
        "rationale": "",
        "roleResponsible": [
            "Information Asset Owner",
            "Security & Resilience"
        ],
        "guidance": "Met if IIQ integrated Else will need to demonstrate compliance.",
        "mappings": {
            "NIST": [
                "PR.PT-3",
                "PR.AC-1",
                "PR.AC-2",
                "PR.AC-4"
            ]
        }
    },
    {
        "title": "Identity and Access Management",
        "id": "SCS-IAM-1.8.4",
        "description": "User accounts of any type unused for a further 30 days after disablement due to dormancy must be deleted unless permitted due to Leave of Absence",
        "groups": "Group 1",
        "rationale": "",
        "roleResponsible": [
            "Information Asset Owner",
            "Security & Resilience"
        ],
        "guidance": "Met if AD integrated Else will need to demonstrate compliance.",
        "mappings": {
            "NIST": [
                "PR.PT-3",
                "PR.AC-1",
                "PR.AC-2",
                "PR.AC-4"
            ]
        }
    },
    {
        "title": "Identity and Access Management",
        "id": "SCS-IAM-2.1",
        "description": "Identity and access management solutions used for the provisioning, amendment, revocation and recertification of access to Nationwide IT Systems and Nationwide Information must:\na) \tcorrelate all users to a unique identifier;\nb) \tcontinuously revalidate the status of user accounts and disable user accounts and access associated with leavers;\nc) \tprovide Employees and Line Managers with visibility of roles, entitlements, and segregation of duties conflicts;\nd) \tprovide Employees, Line Managers and Entitlement Owners with an aggregated view of entitlements and risk scores;\ne) \tprovide mechanisms for automated provisioning and de-provisioning where cost-effective;\nf) \timplement procedures to verify that creation, modification and deletion access requests have been accurately completed.",
        "groups": "",
        "rationale": "",
        "roleResponsible": [
            "Security & Resilience"
        ],
        "guidance": "Met if AD and Peoplesoft integrated Else will need to demonstrate compliance.",
        "mappings": {
            "NIST": [
                "PR.PT-3",
                "PR.AC-1",
                "PR.AC-2",
                "PR.AC-4"
            ]
        }
    },
    {
        "title": "Identity and Access Management",
        "id": "SCS-IAM-3.1.1",
        "description": "Access to Nationwide IT Systems must be controlled by a secure log-on procedure. The log-on procedure must:\na) \tnot display the status of authentication requests until the log-on process has been successfully completed;\nb) \tdisplay a general notice warning that access must only be by authorised users;\nc) \tnot provide messages during the log-on procedure that would aid an unauthorised user;\nd) \tvalidate the log-on information only on completion of all input data and if an error condition arises, the system must not indicate the correct or incorrect field;\ne) \tlock out accounts following 5 repeated failed log-on attempts;\nf) \tlog unsuccessful log-on attempts;\ng) \traise a Security Event if persistent unsuccessful log-on attempts are detected in accordance with Security Event Management;\nh) \tdisplay the date and time of the previous successful log-on upon completion of a successful log-on;\ni) \tnot display a password being entered;\nj) \tnot transmit passwords in clear text over a network;\nk) \trestrict access to a single authenticated session;\nl) \tterminate inactive sessions after a defined period of inactivity;\nm) \trestrict total connection times for Tier 1 and Tier 2 Nationwide IT Systems",
        "groups": "Group 2",
        "rationale": "",
        "roleResponsible": [
            "Information Asset Owner",
            "Security & Resilience"
        ],
        "guidance": "Met if AD integrated Else will need to demonstrate compliance.",
        "mappings": {
            "NIST": [
                "PR.PT-3",
                "PR.AC-1",
                "PR.AC-2",
                "PR.AC-4",
                "PR.PT-1:"
            ]
        }
    },
    {
        "title": "Identity and Access Management",
        "id": "SCS-IAM-3.1.2",
        "description": "All Tier 1 Nationwide IT Systems must be subject to step up authentication and/or biometrics in addition to Multi-Factor Authentication (MFA) to gain access to the Nationwide IT Network.",
        "groups": "Group 2",
        "rationale": "",
        "roleResponsible": [
            "Information Asset Owner",
            "Security & Resilience"
        ],
        "guidance": "Project to confirm they can comply in using this enterprise level control if its available. If not then Enterprise Architecture to be engaged to confirm if this change can be included in any enterprise dispensation they may have raised or if due to the results of the risk assessment they need to bring forward an enterprise implementation.",
        "mappings": {
            "NIST": [
                "PR.PT-3",
                "PR.AC-1",
                "PR.AC-2",
                "PR.AC-4",
                "PR.PT-1:"
            ]
        }
    },
    {
        "title": "Identity and Access Management",
        "id": "SCS-IAM-3.1.3",
        "description": "A request for a password reset must come from the user. If the user does not have network access, a password request reset must be made on their behalf by the Line Manager or a suitable alternative",
        "groups": "Group 2",
        "rationale": "",
        "roleResponsible": [
            "Information Asset Owner",
            "Security & Resilience"
        ],
        "guidance": "If using NBS standard process no evidence required but if not a local process will need to be evidenced.",
        "mappings": {
            "NIST": [
                "PR.PT-3",
                "PR.AC-1",
                "PR.AC-2",
                "PR.AC-4",
                "PR.PT-1:"
            ]
        }
    },
    {
        "title": "Identity and Access Management",
        "id": "SCS-IAM-3.2.1",
        "description": "Processes that utilise user credentials (e.g. password/passphrase, pin) must:\na) \trequire users to sign a statement to keep personal authentication information confidential and to keep group personal authentication information solely within the members of the group;\nb) \tprovide users with temporary authentication information, which they are forced to change on first use;\nc) \testablish procedures to verify the identity of a user prior to providing new, replacement or temporary authentication information;\nd) \tprovide temporary authentication information to users in a secure manner;\ne) \tensure temporary authentication information is unique to an individual;\nf) \trequire acknowledgment by users of receipt of temporary authentication information",
        "groups": "Group 2",
        "rationale": "",
        "roleResponsible": [
            "Information Asset Owner"
        ],
        "guidance": "Met if AD and Peoplesoft integrated Else will need to demonstrate compliance.",
        "mappings": {
            "NIST": [
                "PR.PT-3",
                "PR.AC-1",
                "PR.AC-2",
                "PR.AC-4",
                "PR.PT-1:"
            ]
        }
    },
    {
        "title": "Identity and Access Management",
        "id": "SCS-IAM-3.3.1",
        "description": "Multi-Factor Authentication (MFA) processes used to access Nationwide IT Systems and Nationwide Information must require the utilisation of at least 2 authentication factors:\na) \tsomething you know (e.g. passphrase);\nb) \tsomething you have (e.g. token);\nc) \tsomething you are (i.e. biometric data) .",
        "groups": "Group 2",
        "rationale": "",
        "roleResponsible": [
            "Security & Resilience"
        ],
        "guidance": "If MFA is being delivered, else N/A",
        "mappings": {
            "NIST": [
                "PR.PT-3",
                "PR.AC-1",
                "PR.AC-2",
                "PR.AC-4",
                "PR.PT-1:"
            ]
        }
    },
    {
        "title": "Identity and Access Management",
        "id": "SCS-IAM-3.3.2",
        "description": "MFA must be used prior to gaining access to the Nationwide IT Network (including PaaS and IaaS) .",
        "groups": "Group 2",
        "rationale": "",
        "roleResponsible": [
            "Security & Resilience"
        ],
        "guidance": "",
        "mappings": {
            "NIST": [
                "PR.PT-3",
                "PR.AC-1",
                "PR.AC-2",
                "PR.AC-4",
                "PR.PT-1:"
            ]
        }
    },
    {
        "title": "Identity and Access Management",
        "id": "SCS-IAM-3.3.3",
        "description": "MFA must be used for all remote access (user, administrator and supplier access for support or maintenance) originating from outside the Nationwide IT Network",
        "groups": "Group 2",
        "rationale": "",
        "roleResponsible": [
            "Security & Resilience"
        ],
        "guidance": "Met if using Corporate Approved Remote access system, else compliance required.",
        "mappings": {
            "NIST": [
                "PR.PT-3",
                "PR.AC-1",
                "PR.AC-2",
                "PR.AC-4",
                "PR.PT-1:"
            ]
        }
    },
    {
        "title": "Identity and Access Management",
        "id": "SCS-IAM-3.4.1",
        "description": "Passwords/Passphrases for productivity access to the Nationwide IT Network must: \na) \tenforce the use of unique individual user IDs and passwords;\nb) \tforce users to change their passwords at first log-on; \nc) \tallow users to select and change their own passwords and include a confirmation procedure to allow for input errors;\nd) \tenforce minimum length and complexity requirements including:\ni.\tminimum password length of 12 characters;\nii.\tat least one alphabet character;\niii.\tat least one numeric character;\niv.\tat least one special character;\nv.\tat least one upper case character;\nvi.\tat least on lower case character;\nvii.\tuniqueness of passwords or credentials;\nviii.\tno reuse of passwords within 24 changes;\nix.\tpasswords that are not dictionary words or easily guessable from personal data; \ne) \tenforce password changes at least every 90 days;\nf) \tmaintain a record of previously used passwords and prevent re-use for 24 changes;\ng) \tnot display passwords on the screen when being entered;\nh) \tstore password files separately from application system data;\ni) \tstore and transmit passwords in accordance with Cryptography.",
        "groups": "Group 1",
        "rationale": "",
        "roleResponsible": [
            "IT Custodian"
        ],
        "guidance": "",
        "mappings": {
            "NIST": [
                "PR.PT-3",
                "PR.AC-1",
                "PR.AC-2",
                "PR.AC-4",
                "PR.PT-1:"
            ]
        }
    },
    {
        "title": "Identity and Access Management",
        "id": "SCS-IAM-3.4.2",
        "description": "Password/Passphrase blacklists for authentication to the Nationwide IT Network must be maintained and reviewed on at least an annual basis. Blacklists must include:\na) \tcommonly guessable terms provided by vendors;\nb) \tSociety-specific terms that may be used by employees, contingent workers and suppliers and are easily guessable (for example \"Nationwide\") .",
        "groups": "Group 1",
        "rationale": "",
        "roleResponsible": [
            "IT Custodian"
        ],
        "guidance": "",
        "mappings": {
            "NIST": [
                "PR.PT-3",
                "PR.AC-1",
                "PR.AC-2",
                "PR.AC-4",
                "PR.PT-1:"
            ]
        }
    },
    {
        "title": "Identity and Access Management",
        "id": "SCS-IAM-3.4.3",
        "description": "Passwords/Passphrases for productivity access to the Nationwide IT Systems (not utilising centralised network authentication as single sign-on [SSO]) must:\na) \tenforce the use of unique individual user IDs and passwords;\nb) \tforce users to change their passwords at first log-on;\nc) \tallow users to select and change their own passwords and include a confirmation procedure to allow for input errors;\nd) \tenforce minimum length and complexity requirements including:\ni.\tminimum password length of 8 characters;\nii.\tat least one alphabet character;\niii.\tat least one numeric character;\niv.\tat least one special character;\nv.\tat least one upper case character;\nvi.\tat least one lower case character;\nvii.\tuniqueness of passwords or credentials;\nviii.\tno reuse of passwords within 10 changes;\nix.\tpasswords that not dictionary words or easily guessable from personal data;\ne) \tenforce password changes at least every 90 days;\nf) \tmaintain a record of previously used passwords and prevent re-use for 10 changes;\ng) \tnot display passwords on the screen when being entered;\nh) \tstore password files separately from application system data;\ni) \tstore and transmit passwords in accordance with Cryptography.",
        "groups": "Group 1",
        "rationale": "",
        "roleResponsible": [
            "IT Custodian"
        ],
        "guidance": "N/A if AD integrated else will need to demonstrate compliance.",
        "mappings": {
            "NIST": [
                "PR.PT-3",
                "PR.AC-1",
                "PR.AC-2",
                "PR.AC-4",
                "PR.PT-1:"
            ]
        }
    },
    {
        "title": "Identity and Access Management",
        "id": "SCS-IAM-3.4.4",
        "description": "Passwords must be stored using encryption techniques, where appropriate use hashing with a random salt in accordance with Cryptography",
        "groups": "Group 1",
        "rationale": "",
        "roleResponsible": [
            "IT Custodian"
        ],
        "guidance": "Met if AD integrated Else will need to demonstrate compliance.",
        "mappings": {
            "NIST": [
                "PR.PT-3",
                "PR.AC-1",
                "PR.AC-2",
                "PR.AC-4",
                "PR.PT-1:"
            ]
        }
    },
    {
        "title": "Identity and Access Management",
        "id": "SCS-IAM-3.5.1",
        "description": "Token Based Authentication processes for access to Nationwide IT Systems and Nationwide Information must:\na) \tprovide a procedure for registering new token users and issuing tokens to users, which:\ni.\tensures token-related passwords are not sent in clear text and with the token;\nii.\tdirectly involves the person to whom the token uniquely applies;\niii.\tverifies the identity of the user, such as via a special code, inspecting official identity documentation or through independent confirmation;\nb) \tgain approval for each connection by the identity provider and service provider;\nc) \tcreate a secure process to enable users to authenticate when the token authentication fails;\nd) \tprovide a mechanism for revocation of tokens in the event of compromise;\ne) \tensure that tokens are automatically expired or require renewal;\nf) \tbuild upon Nationwide’s existing Identity and Access Management arrangements;\ng) \tbe subject to governance, planning, risk assessment, review and monitoring;\nh) \tmake use of agreed protocols;\ni) \tuse approved connection software;\nj) \treview each connection, for planned and unplanned changes to connection every 6 months or earlier in the event of a material change or incident occurring. ",
        "groups": "Group 2",
        "rationale": "",
        "roleResponsible": [
            "Information Asset Owner",
            "Change Squads"
        ],
        "guidance": "Met if using Tokens issued by the Logical access team, else complaince required.",
        "mappings": {
            "NIST": [
                "PR.PT-3",
                "PR.AC-1",
                "PR.AC-2",
                "PR.AC-4",
                "PR.PT-1:"
            ]
        }
    },
    {
        "title": "Identity and Access Management",
        "id": "SCS-IAM-3.6.1",
        "description": "Biometric Based Authentication processes, where used, for access to Nationwide IT Systems and Nationwide Information must:\na) \tprovide a user enrolment process for registering a user’s biometrics that:\ni.\tdirectly involves the individual to whom the biometric uniquely applies;\nii.\tverifies the identity of the user, such as via physical confirmation and inspecting official identity documentation;\niii.\tensures that biometric information is not available to unauthorised individuals and is compliant with the Data Protection Act (DPA) 2018;\nb) \timplement a method for confirming the user is alive;\nc) \tprovide a secure process to enable users to authenticate when the biometric authentication fails;\nd) \tprovide a mechanism for revocation of authentication data;\ne) \terase biometric data upon revocation;\nf) \tencrypt biometric data in use, at rest and in transit in accordance with Cryptography;\ng) \tbe configured to reduce the likelihood of false positives and false negatives.",
        "groups": "Group 2",
        "rationale": "",
        "roleResponsible": [
            "Information Asset Owner",
            "Change Squads"
        ],
        "guidance": "",
        "mappings": {
            "NIST": [
                "PR.PT-3",
                "PR.AC-1",
                "PR.AC-2",
                "PR.AC-4",
                "PR.PT-1:"
            ]
        }
    },
    {
        "title": "Identity and Access Management",
        "id": "SCS-IAM-3.6.2",
        "description": "The use of any Biometric Authentication mechanism as part of a Multi-Factor Authentication (MFA) mechanism must be assessed using an Information Security Risk Assessment and approved by the Security Function prior to implementation",
        "groups": "Group 2",
        "rationale": "",
        "roleResponsible": [
            "Change Squads",
            "Security & Resilience"
        ],
        "guidance": "",
        "mappings": {
            "NIST": [
                "PR.PT-3",
                "PR.AC-1",
                "PR.AC-2",
                "PR.AC-4",
                "PR.PT-1:"
            ]
        }
    },
    {
        "title": "Privileged Access Management",
        "id": "SCS-PAM-1.1.1",
        "description": "IT Custodians must develop a technical definition of privileged access for each platform and application used for processing, transmission or storage of Nationwide Information. The technical definition must include justification for the number of privileged accounts required and permissions provided to privileged accounts",
        "groups": "Group 1",
        "rationale": "",
        "roleResponsible": [
            "IT Custodian"
        ],
        "guidance": "",
        "mappings": {
            "NIST": [
                "DE.CM-3"
            ]
        }
    },
    {
        "title": "Privileged Access Management",
        "id": "SCS-PAM-1.1.2",
        "description": "Privileged Accounts must be on-boarded to an approved Privileged Access Management (PAM) Solution. \n\nPrivileged Accounts that cannot be technically integrated with PAM Solutions must implement additional controls and be subject to the security control requirements within Identity and Access Management.",
        "groups": "Group 1",
        "rationale": "",
        "roleResponsible": [
            "IT Custodian"
        ],
        "guidance": "The Privileged Access Management team should be contacted to assist with this Delivery.",
        "mappings": {
            "NIST": [
                "ID.GV-1",
                "ID.GV-4",
                "PR.AC-1",
                "PR.AC-4"
            ]
        }
    },
    {
        "title": "Privileged Access Management",
        "id": "SCS-PAM-1.1.3",
        "description": "The creation and utilisation of Personal Administrative Accounts with privileged access (i.e. individually named accounts) to administer Nationwide IT Assets is not permitted. If discovered Personal Administrative Accounts must be removed and reported as a Security Incident.",
        "groups": "Group 1",
        "rationale": "",
        "roleResponsible": [
            "IT Custodian"
        ],
        "guidance": "",
        "mappings": {
            "NIST": [
                "ID.GV-1",
                "ID.GV-4",
                "PR.AC-1",
                "PR.AC-4"
            ]
        }
    },
    {
        "title": "Privileged Access Management",
        "id": "SCS-PAM-1.1.4",
        "description": "Privileged Accounts and credentials must:\na) \thave an appointed owner and a clearly defined purpose (descriptor, target system and technical platform);\nb) \tutilise an agreed naming convention;\nc) \tnot be provided with access to the public internet or external email except for internet services the account is specifically designed to administer;\nd) \tnot have access to productivity or business systems (such as email, public internet access, other business applications);\ne) \tbe assigned the least privilege and least functionality required for their operational purpose;\nf) \tbe controlled as per appropriate technical patterns for the account type;\ng) \tbe stored in an inventory;\nh) \tuse strong methods of authentication in accordance with Multi-Factor Authentication (MFA) and where passwords/passphrases are used, they must meet the following minimum criteria:\ni.\tcontain at least one numeric character;\nii.\tcontain at least one special character;\niii.\tcontain at least one upper case alpha character;\niv.\tcontain at least one lower case alpha character;\nv.\tbe unique (i.e. unique passwords for same account type on different systems, and password not used in systems outside of Nationwide, e.g. non-Nationwide email or social media account passwords);\nvi.\tnot be reused;\nvii.\tnot be dictionary words or easily guessable from personal data;\ni) \tnot be hardcoded into services or applications;\nj) \tnot be stored or transmitted in clear text (un-hashed or unencrypted);\nk) \tnot be stored outside of approved PAM Solutions or safes, including on administrator’s devices and tools used from the administrator’s device; \nl) \tnot be disclosed to the user for the purposes of log-on wherever possible;\nm) \tbe immediately changed upon the notification or suspicion of compromise. Where compromise is suspected, this must be logged as a Security Event for formal investigation in accordance with Security Event Management",
        "groups": "Group 1",
        "rationale": "",
        "roleResponsible": [
            "IT Custodian"
        ],
        "guidance": "The Privileged Access Management team should be contacted to assist with this Delivery.",
        "mappings": {
            "NIST": [
                "DE.CM-3",
                "DE.CM-7",
                "PR.PT-3",
                "PR.PT-1",
                "PR.IP-11",
                "PR.AT-1",
                "PR.AT-2"
            ]
        }
    },
    {
        "title": "Privileged Access Management",
        "id": "SCS-PAM-1.1.5.1",
        "description": "In addition to Baseline Security Requirements for Privileged Account Creation and Storage, Privileged Accounts and credentials for interactive use and manual log-on (i.e. administrative accounts) must:\na) \thave a minimum password/passphrase length of 14 characters;\nb) \tbe changed on a maximum of a 90 day cycle and after use;\nc) \tonly be logged onto using a dedicated administrative machine;\nd) \tbe provisioned as a pool of privileged accounts and configured in accordance with agreed technical patterns for each platform",
        "groups": "Group 1",
        "rationale": "",
        "roleResponsible": [
            "IT Custodian"
        ],
        "guidance": "Met if AD integrated Else will need to demonstrate compliance.",
        "mappings": {
            "NIST": [
                "ID.GV-1",
                "ID.GV-4",
                "PR.AC-1"
            ]
        }
    },
    {
        "title": "Privileged Access Management",
        "id": "SCS-PAM-1.1.5.2",
        "description": "Privileged access to Nationwide IT Systems provided through Default Accounts and Local Accounts must:\na) \thave default account credentials changed at installation in accordance with Secure Build and Build Standards;\nb) \tonly be used in break-glass situations;\nc) \tbe subject to approval prior to use",
        "groups": "Group 1",
        "rationale": "",
        "roleResponsible": [
            "IT Custodian"
        ],
        "guidance": "",
        "mappings": {
            "NIST": [
                "ID.GV-1",
                "ID.GV-4",
                "PR.AC-1",
                "PR.AC-4"
            ]
        }
    },
    {
        "title": "Privileged Access Management",
        "id": "SCS-PAM-1.1.6.1",
        "description": "In addition to Baseline Security Requirements for Privileged Account Creation and Storage, Privileged Accounts and credentials for non-interactive use, inclusive of Service Accounts, must:\na) \thave a minimum password/passphrase length of 32 characters;\nb) \tbe randomly generated by an approved Nationwide service;\nc) \tbe changed for Service Accounts on a maximum of a 180 day cycle and after use or exposure.",
        "groups": "Group 1",
        "rationale": "",
        "roleResponsible": [
            "IT Custodian"
        ],
        "guidance": "Met if AD integrated Else will need to demonstrate compliance.",
        "mappings": {
            "NIST": [
                "ID.GV-1",
                "ID.GV-4",
                "PR.AC-1",
                "PR.AC-4"
            ]
        }
    },
    {
        "title": "Privileged Access Management",
        "id": "SCS-PAM-1.1.6.2",
        "description": "Service Accounts with privileged access must:\na) \tnot be used interactively;\nb) \tbe provided with the minimum access privileges that are required for them to perform their business function;\nc) \tbe architected such that passwords/passphrases can be changed without downtime",
        "groups": "Group 1",
        "rationale": "",
        "roleResponsible": [
            "IT Custodian"
        ],
        "guidance": "",
        "mappings": {
            "NIST": [
                "ID.GV-1",
                "ID.GV-4",
                "PR.AC-1",
                "PR.AC-4"
            ]
        }
    },
    {
        "title": "Privileged Access Management",
        "id": "SCS-PAM-1.1.6.3",
        "description": "Legacy Service Accounts must be assessed for their compliance with Baseline Security Requirements for Privileged Account Creation and Storage and subject to an Information Security Risk Assessment to assess inherent risks (for example, from lateral movement between different tiers of Nationwide IT System) and compensating controls where Security Control Standards cannot be retrospectively applied.",
        "groups": "Group 1",
        "rationale": "",
        "roleResponsible": [
            "IT Custodian"
        ],
        "guidance": "The Privileged Access Management team should be contacted to assist with this Delivery.",
        "mappings": {
            "NIST": [
                "ID.GV-1",
                "ID.GV-4",
                "PR.AC-1",
                "PR.AC-4"
            ]
        }
    },
    {
        "title": "Privileged Access Management",
        "id": "SCS-PAM-1.2.2",
        "description": "IT Custodians (e.g. Change Squads, Engineering, IT Support) must on-board privileged accounts to approved Privileged Access Management (PAM) Solutions in accordance with the agreed technical configuration patterns when introducing new technical infrastructure. ",
        "groups": "Group 1",
        "rationale": "",
        "roleResponsible": [
            "IT Custodian"
        ],
        "guidance": "The Privileged Access Management team should be contacted to assist with this Delivery.",
        "mappings": {
            "NIST": [
                "ID.GV-1",
                "ID.GV-4",
                "PR.AC-1",
                "PR.AC-4"
            ]
        }
    },
    {
        "title": "Privileged Access Management",
        "id": "SCS-PAM-1.2.3",
        "description": "IT Custodians must:\na) \tdefine any actions and events that could indicate a circumvention of security controls at a platform level;\nb) \tperform reviews of activities undertaken using privileged access for all sessions containing the defined actions and events that could indicate a circumvention of security controls, including comparison of the stated reason for requiring the access against the actual activities performed;\nc) \tensure that reviews of all sessions are undertaken in a timely and diligent fashion and independently of the user who performed the activity;\nd) \traise change requests to decommission any privileged accounts no longer required;\ne) \traise any inappropriate use of privileged access as a Security Incident for formal investigation in accordance with Security Incident Management",
        "groups": "Group 1",
        "rationale": "",
        "roleResponsible": [
            "IT Custodian"
        ],
        "guidance": "The Privileged Access Management team should be contacted to assist with this Delivery.",
        "mappings": {
            "NIST": [
                "ID.GV-1",
                "ID.GV-4",
                "PR.AC-1",
                "PR.AC-4"
            ]
        }
    },
    {
        "title": "Privileged Access Management",
        "id": "SCS-PAM-1.2.4",
        "description": "Safe Owners of Privileged Account Management safes must:\na) \tauthorise access to safes in accordance with Identity and Access Management; \nb) \tensure that there are suitable and accurate descriptions of privileged account purpose",
        "groups": "Group 1",
        "rationale": "",
        "roleResponsible": [
            "Safe Owner"
        ],
        "guidance": "The Privileged Access Management team should be contacted to assist with this Delivery.",
        "mappings": {
            "NIST": [
                "ID.GV-1",
                "ID.GV-4",
                "PR.AC-1",
                "PR.AC-4"
            ]
        }
    },
    {
        "title": "Privileged Access Management",
        "id": "SCS-PAM-1.2.5",
        "description": "Line Managers and Safe Owners must recertify the access to Privileged Account Management safes and the permissions assigned to privileged accounts on Nationwide IT Systems in accordance with Privileged Access User Recertification",
        "groups": "Group 1",
        "rationale": "",
        "roleResponsible": [
            "Line Managers",
            "Safe Owner"
        ],
        "guidance": "The Priviliged Access Management team should be contacted to assist with this Delivery.",
        "mappings": {
            "NIST": [
                "ID.GV-1",
                "ID.GV-4",
                "PR.AC-1",
                "PR.AC-4"
            ]
        }
    },
    {
        "title": "Privileged Access Management",
        "id": "SCS-PAM-1.3.1",
        "description": "The usage of privileged accounts must:\na) \tbe restricted to only approved individuals with legitimate business needs (applying the least privilege necessary to perform job responsibilities) and validated competence;\nb) \trequire authorisation and justification for each use;\nc) \trequire Multi-Factor Authentication (MFA) to gain access to credentials;\nd) \tbe linked to an associated change or incident ticket;\ne) \tbe monitored and subject to session recording wherever the capability is available;\nf) \tbe subject to behavioural analytics, wherever the capability is available, to establish individual user baselines that will aid the identification of unusual or abnormal activity;\ng) \tnotify Platform/Account Owners/Line Managers of privileged account usage containing any actions and events that could indicate a circumvention of security controls;\nh) \tbe restricted to a time-bound session;\ni) \tbe subject to an audit trail of a minimum of 1 year and in compliance with relevant legal and regulatory requirements.",
        "groups": "Group 1",
        "rationale": "",
        "roleResponsible": [
            "IT Custodian"
        ],
        "guidance": "The Privileged Access Management team should be contacted to assist with this Delivery.",
        "mappings": {
            "NIST": [
                "ID.GV-1",
                "ID.GV-4",
                "PR.AC-1",
                "PR.AC-4"
            ]
        }
    },
    {
        "title": "Privileged Access Management",
        "id": "SCS-PAM-1.3.2",
        "description": "Business as Usual (BAU) processes requiring privileged access without a change or incident ticket must provide justification for release",
        "groups": "Group 1",
        "rationale": "",
        "roleResponsible": [
            "IT Custodian"
        ],
        "guidance": "The Privileged Access Management team should be contacted to assist with this Delivery.",
        "mappings": {
            "NIST": [
                "ID.GV-1",
                "ID.GV-4",
                "PR.AC-1",
                "PR.AC-4"
            ]
        }
    },
    {
        "title": "Privileged Access Management",
        "id": "SCS-PAM-1.4.1",
        "description": "Line Managers of employees and contingent workers with privileged access must:\na) \tensure that direct reports are adequately trained and experienced to equip them with the knowledge, skills and competence required to perform their roles before privileged access is granted;\nb) \treview and verify records for direct reports with privileged access are accurate in accordance with Employee Lifecycle;\nc) \tprovide documented approval authorising the employee or contingent worker’s privileged access prior to the access being granted;\nd) \timmediately initiate the removal of privileged access to any Nationwide IT System when this is no longer required in accordance with Identity and Access Management;\ne) \tconfirm the ongoing need and appropriateness of privileged access in accordance with Privileged User Access Recertification;\nf) \tarrange for the review of any sessions containing any actions and events that could indicate a circumvention of security controls by a technically competent individual.\n\nWhere the Line Manager is not closely aligned to day-to-day tasks and activities performed using privileged accounts, they must maintain communication with the individual's Task Manager to understand the need for ongoing access requirements.",
        "groups": "Group 1",
        "rationale": "",
        "roleResponsible": [
            "Line Managers"
        ],
        "guidance": "The PAM team should be contacted to assist with this Delivery.",
        "mappings": {
            "NIST": [
                "ID.GV-1",
                "ID.GV-4",
                "PR.AC-1",
                "PR.AC-4"
            ]
        }
    },
    {
        "title": "Privileged Access Management",
        "id": "SCS-PAM-1.4.2",
        "description": "Line Managers of employees and contingent workers with privileged access who are changing roles or responsibilities must perform a review of privileged access and raise a request(s) to remove any access no longer required within 1 working day of the employee or contingent worker assuming new responsibilities",
        "groups": "Group 1",
        "rationale": "",
        "roleResponsible": [
            "Line Managers"
        ],
        "guidance": "The Privileged Access Management team should be contacted to assist with this Delivery.",
        "mappings": {
            "NIST": [
                "ID.GV-1",
                "ID.GV-4",
                "PR.AC-1",
                "PR.AC-4"
            ]
        }
    },
    {
        "title": "Privileged Access Management",
        "id": "SCS-PAM-1.4.3",
        "description": "Line Managers of leavers with privileged access must initiate the removal of privileged access to Nationwide IT Systems (including Multi-Factor Authentication [MFA] and Privileged Access Management [PAM] Solutions) for employees and contingent workers prior to or within 1 working day of their leave date",
        "groups": "Group 1",
        "rationale": "",
        "roleResponsible": [
            "Line Managers"
        ],
        "guidance": "BAU line managers responsibility and N/A to projects",
        "mappings": {
            "NIST": [
                "ID.GV-1",
                "ID.GV-4",
                "PR.AC-1",
                "PR.AC-4"
            ]
        }
    },
    {
        "title": "Privileged Access Management",
        "id": "SCS-PAM-1.5.1",
        "description": "User access to privileged accounts and safes containing privileged accounts must be recertified as follows:\n•\tTier 1 Nationwide IT Systems – every 3 months;\n•\tTier 2 Nationwide IT Systems – every 3 months;\n•\tTier 3 Nationwide IT Systems – every 12 months;\n•\tTier 4 Nationwide IT Systems – every 12 months",
        "groups": "Group 1",
        "rationale": "",
        "roleResponsible": [
            "Safe Owner",
            "Security & Resilience"
        ],
        "guidance": "The Privileged Access Management team should be contacted to assist with this Delivery.",
        "mappings": {
            "NIST": [
                "ID.GV-1",
                "ID.GV-4",
                "PR.AC-1",
                "PR.AC-4"
            ]
        }
    },
    {
        "title": "Privileged Access Management",
        "id": "SCS-PAM-1.5.2",
        "description": "User access must be amended based on the results of recertification including the removal of any privileged accounts that are not recertified",
        "groups": "Group 1",
        "rationale": "",
        "roleResponsible": [
            "Safe Owner",
            "Security & Resilience"
        ],
        "guidance": "The Privileged Access Management team should be contacted to assist with this Delivery.",
        "mappings": {
            "NIST": [
                "ID.GV-1",
                "ID.GV-4",
                "PR.AC-1",
                "PR.AC-4"
            ]
        }
    },
    {
        "title": "Privileged Access Management",
        "id": "SCS-PAM-1.5.3",
        "description": "Privileged Accounts, including Managed Privileged Accounts, on Nationwide IT Systems must be monitored for privileged account drift and recertified for their continuing need and assigned permissions as follows:\n•\tTier 1 Nationwide IT Systems – every 12 months;\n•\tTier 2 Nationwide IT Systems – every 24 months;\n•\tTier 3 Nationwide IT Systems – every 36 months;\n•\tTier 4 Nationwide IT Systems – every 36 months",
        "groups": "Group 1",
        "rationale": "",
        "roleResponsible": [
            "IT Custodian",
            "Security & Resilience"
        ],
        "guidance": "The Privileged Access Management team should be contacted to assist with this Delivery.",
        "mappings": {
            "NIST": [
                "ID.GV-1",
                "ID.GV-4",
                "PR.AC-1",
                "PR.AC-4"
            ]
        }
    },
    {
        "title": "Privileged Access Management",
        "id": "SCS-PAM-1.7.1",
        "description": "Privileged access provided to suppliers to maintain Nationwide IT System components via remote access must be:\na) \tin accordance with Supply Chain Management;\nb) \tenabled only for the duration of the activities performed;\nc) \tmonitored by the IT Custodian during use",
        "groups": "Group 2",
        "rationale": "",
        "roleResponsible": [
            "Chief Security & Resilience Officer",
            "IT Custodian",
            "IT Support"
        ],
        "guidance": "",
        "mappings": {
            "NIST": [
                "ID.GV-1",
                "ID.GV-4",
                "PR.AC-1",
                "PR.AC-4"
            ]
        }
    },
    {
        "title": "Privileged Access Management",
        "id": "SCS-PAM-1.8.1",
        "description": "Privileged Access Management (PAM) Solutions must:\na) \tensure segregation of duties for the administration of PAM Solutions, safes and users from operational users of privileged accounts;\nb) \tenforce least privilege access controls on privileged accounts;\nc) \trequire the use of Multi-Factor Authentication (MFA) for the retrieval of privileged account credentials from safes;\nd) \tamend privileged account credentials to new random passwords/passphrases following use, which are compliant with minimum password/passphrase criteria; \ne) \tprovide an audit trail of the usage of privileged accounts, including the time/date, purpose of use, for a given session.",
        "groups": "Group 2",
        "rationale": "",
        "roleResponsible": [
            "IT Custodian",
            "Security & Resilience"
        ],
        "guidance": "",
        "mappings": {
            "NIST": [
                "ID.GV-1",
                "ID.GV-4",
                "PR.AC-1",
                "PR.AC-4"
            ]
        }
    },
    {
        "title": "Privileged Access Management",
        "id": "SCS-PAM-1.9.1",
        "description": "Monitoring must be undertaken to detect the presence of unauthorised privileged accounts on all target assets. If identified, this must be triaged, and a Security Event raised as appropriate in accordance with Security Event Management",
        "groups": "Group 2",
        "rationale": "",
        "roleResponsible": [
            "Security & Resilience"
        ],
        "guidance": "",
        "mappings": {
            "NIST": [
                "ID.GV-1",
                "ID.GV-4",
                "PR.AC-1",
                "PR.AC-4"
            ]
        }
    },
    {
        "title": "Privileged Access Management",
        "id": "SCS-PAM-1.9.2",
        "description": "Security monitoring of privileged accounts must be performed to:\na) \tdetect the creation, deletion or modification of any privileged accounts that have not been on-boarded into a Privileged Access Management (PAM) Solution;\nb) \tdetect the usage of on-boarded privileged accounts outside of a PAM Solution;\nc) \tdetect when credentials for on-boarded privileged accounts are used outside of a PAM Solution or without approval.",
        "groups": "Group 2",
        "rationale": "",
        "roleResponsible": [
            "IT Custodian",
            "Security & Resilience"
        ],
        "guidance": "",
        "mappings": {
            "NIST": [
                "ID.GV-1",
                "ID.GV-4",
                "PR.AC-1",
                "PR.AC-4"
            ]
        }
    },
    {
        "title": "Privileged Access Management",
        "id": "SCS-PAM-1.9.3",
        "description": "Where the creation or use of privileged accounts outside of a PAM Solution is identified without business justification, a Security Incident must be raised in accordance with Security Incident Management",
        "groups": "Group 2",
        "rationale": "",
        "roleResponsible": [
            "IT Custodian",
            "Security & Resilience"
        ],
        "guidance": "",
        "mappings": {
            "NIST": [
                "ID.GV-1",
                "ID.GV-4",
                "PR.AC-1",
                "PR.AC-4"
            ]
        }
    },
    {
        "title": "Privileged Access Management",
        "id": "SCS-PAM-1.9.4",
        "description": "Security Event Logs for PAM Solutions and target environments must be on-boarded into centralised security monitoring tools in accordance with Logging and Monitoring.",
        "groups": "Group 2",
        "rationale": "",
        "roleResponsible": [
            "IT Custodian",
            "Security & Resilience"
        ],
        "guidance": "All solutions that have accounts onboarded into PAM will require the Security logs to be sent to SPLUNK.  If this can not be achieved the Change leader will need to raise a dispensation.  \nThe specific monitoring requirements of those logs will still follow the Use Case Monitoring process.",
        "mappings": {
            "NIST": [
                "ID.GV-1",
                "ID.GV-4",
                "PR.AC-1",
                "PR.AC-4"
            ]
        }
    },
    {
        "title": "Privileged Access Management",
        "id": "SCS-PAM-1.9.5",
        "description": "Nationwide IT Systems must be configured to issue a log entry when:\na) \tan account is added or removed from any privileged access groups;\nb) \tan unsuccessful log-on attempt is made to a privileged account",
        "groups": "Group 2",
        "rationale": "",
        "roleResponsible": [
            "IT Custodian",
            "Security & Resilience"
        ],
        "guidance": "Met if AD integrated Else will need to demonstrate compliance.",
        "mappings": {
            "NIST": [
                "ID.GV-1",
                "ID.GV-4",
                "PR.AC-1",
                "PR.AC-4"
            ]
        }
    },
    {
        "title": "Privileged Access Management",
        "id": "SCS-PAM-1.10.1",
        "description": "Application Administration Accounts for Tier 1 Applications, inclusive of Cloud Services, must be secured as defined through the performance of an Information Security Risk Assessment that considers:\na) \tthe business need for always-on access;\nb) \tthe applicability of Multi-Factor Authentication (MFA) to mitigate identified cyber threats; \nc) \tinsider threats to business processes as identified and defined by the Information Asset Owner or Entitlement Owners;\nd) \tthe inability to implement adequate application level segregation of duties;\ne) \tdeficiencies within application role profiles;\nf) \tapplication level audit trails of activities undertaken using the account;\ng) \tthe ability of the account/assigned permissions to delete application activity and transactional audit trails.",
        "groups": "",
        "rationale": "",
        "roleResponsible": [
            "Information Asset Owner",
            "IT Custodian"
        ],
        "guidance": "",
        "mappings": {
            "NIST": [
                "ID.GV-1",
                "ID.GV-4",
                "PR.AC-1",
                "PR.AC-4"
            ]
        }
    },
    {
        "title": "Privileged Access Management",
        "id": "SCS-PAM-1.11.1",
        "description": "Incident Response Plans must be included in the Cyber Playbook, developed and maintained for the compromise of Privileged Access Management (PAM) Solutions and privileged accounts and for the recovery of credentials stored within PAM Solutions or safes",
        "groups": "",
        "rationale": "",
        "roleResponsible": [
            "Information Asset Owner",
            "IT Custodian",
            "Security & Resilience",
            "Operational Resilience"
        ],
        "guidance": "",
        "mappings": {
            "NIST": [
                "RS.AN-1",
                "RS.AN-2",
                "RS.AN-3",
                "RS.RP-1"
            ]
        }
    },
    {
        "title": "Privileged Access Management",
        "id": "SCS-PAM-1.11.2",
        "description": "Incident Response Plans must be tested at least annually or earlier in the event of material change or incident in accordance with Business Continuity and Disaster Recovery processes and Security Incident Management",
        "groups": "",
        "rationale": "",
        "roleResponsible": [
            "Information Asset Owner",
            "IT Custodian",
            "Security & Resilience",
            "Operational Resilience"
        ],
        "guidance": "",
        "mappings": {
            "NIST": [
                "RS.AN-1",
                "RS.AN-2",
                "RS.AN-3",
                "RS.RP-1"
            ]
        }
    },
    {
        "title": "Privileged Access Management",
        "id": "SCS-PAM-1.12.1",
        "description": "Where IaaS and PaaS cloud services are in use, default credentials must be stored on-premise. ",
        "groups": "",
        "rationale": "",
        "roleResponsible": [
            "Engineering",
            "Cloud CoE"
        ],
        "guidance": "",
        "mappings": {
            "NIST": [
                "ID.GV-1",
                "ID.GV-4",
                "PR.AC-1",
                "PR.AC-4"
            ]
        }
    },
    {
        "title": "Privileged Access Management",
        "id": "SCS-PAM-1.12.2",
        "description": "Nationwide IT Systems hosted in Cloud Environments must define a Role Based Access Control (RBAC) model, including roles with privileged access",
        "groups": "",
        "rationale": "",
        "roleResponsible": [
            "Engineering",
            "Cloud CoE"
        ],
        "guidance": "",
        "mappings": {
            "NIST": [
                "ID.GV-1",
                "ID.GV-4",
                "PR.AC-1",
                "PR.AC-4"
            ]
        }
    },
    {
        "title": "Privileged Access Management",
        "id": "SCS-PAM-1.12.3",
        "description": "Privileged Accounts used within Cloud Environments must use Shared Secret Managers in accordance with Cryptography",
        "groups": "",
        "rationale": "",
        "roleResponsible": [
            "Engineering",
            "Cloud CoE"
        ],
        "guidance": "",
        "mappings": {
            "NIST": [
                "ID.GV-1",
                "ID.GV-4",
                "PR.AC-1",
                "PR.AC-4"
            ]
        }
    },
    {
        "title": "Privileged Access Management",
        "id": "SCS-PAM-1.12.4",
        "description": "Privileged access to Cloud Service Provider environments must:\na) \tuse Multi-Factor Authentication (MFA);\nb) \tapply a whitelist to allow connectivity from only authorised devices on the Nationwide IT Network. ",
        "groups": "",
        "rationale": "",
        "roleResponsible": [
            "Engineering",
            "Cloud CoE"
        ],
        "guidance": "",
        "mappings": {
            "NIST": [
                "ID.GV-1",
                "ID.GV-4",
                "PR.AC-1",
                "PR.AC-4"
            ]
        }
    },
    {
        "title": "Privileged Access Management",
        "id": "SCS-PAM-1.12.5",
        "description": "Whitelists used for the authentication of authorised devices to Cloud Service Provider environments must be maintained and reviewed on at least an annual basis to validate restrictions applied",
        "groups": "",
        "rationale": "",
        "roleResponsible": [
            "Engineering",
            "Cloud CoE"
        ],
        "guidance": "",
        "mappings": {
            "NIST": [
                "ID.GV-1",
                "ID.GV-4",
                "PR.AC-1",
                "PR.AC-4"
            ]
        }
    },
    {
        "title": "Network Management",
        "id": "SCS-NETM-2.1.3",
        "description": "Nationwide IT Systems and or data hosted within SaaS Cloud Service Provider environments or on a multi-tenant basis must be segregated from other tenants as defined within the contractual terms and conditions developed in accordance with Supply Chain Management.",
        "groups": "Group 1",
        "rationale": "",
        "roleResponsible": [
            "Security Architecture"
        ],
        "guidance": "",
        "mappings": {
            "NIST": [
                "PR.DS-1",
                "PR.DS-2",
                "PR.DS-3"
            ]
        }
    },
    {
        "title": "Network Management",
        "id": "SCS-NETM-4.2.2",
        "description": "SaaS services implemented within Cloud Access Security Broker (CASB) solutions additionally must:\na) \tmonitor network traffic for data leakage in accordance with Data Loss Prevention;\nb) \tblock attempts to connect to unapproved Cloud Service Providers",
        "groups": "Group 1",
        "rationale": "",
        "roleResponsible": [
            "IT Support"
        ],
        "guidance": "",
        "mappings": {
            "NIST": [
                "PR.DS-1",
                "PR.DS-2",
                "PR.DS-3",
                "PR.DS-5"
            ]
        }
    },
    {
        "title": "Network Management",
        "id": "SCS-NETM-5.1",
        "description": "Contracts and/or non-disclosure agreement(s) (NDAs) /confidentiality clause(s) must be in place prior to external suppliers being granted access to Nationwide IT Systems and Nationwide IT Networks in accordance with Employee Lifecycle and Supply Chain Management.",
        "groups": "Group 2",
        "rationale": "",
        "roleResponsible": [
            "Relationship Manager/Owner"
        ],
        "guidance": "",
        "mappings": {
            "NIST": [
                "PR.DS-1",
                "PR.DS-2",
                "PR.DS-3",
                "PR.DS-5"
            ]
        }
    },
    {
        "title": "Network Management",
        "id": "SCS-NETM-5.2",
        "description": "Remote access to Nationwide IT Systems and Nationwide IT Networks must be restricted to contractually approved locations",
        "groups": "Group 2",
        "rationale": "",
        "roleResponsible": [
            "Relationship Manager/Owner"
        ],
        "guidance": "",
        "mappings": {
            "NIST": [
                "PR.DS-1",
                "PR.DS-2",
                "PR.DS-3",
                "PR.DS-5"
            ]
        }
    },
    {
        "title": "Network Management",
        "id": "SCS-NETM-5.3",
        "description": "Remote access to Nationwide IT Networks must be provided using a dedicated remote access server, which:\na) \tprovides reliable and complete authentication for external connections;\nb) \trequires Multi-Factor Authentication;\nc) \tprovides information for troubleshooting;\nd) \tlogs all connections and sessions;\ne) \tsupports the identification of suspected Security Events",
        "groups": "Group 2",
        "rationale": "",
        "roleResponsible": [
            "IT Support"
        ],
        "guidance": "",
        "mappings": {
            "NIST": [
                "PR.AC-1",
                "PR.AC-2",
                "PR.AC-3",
                "PR.AC-4"
            ]
        }
    },
    {
        "title": "Network Management",
        "id": "SCS-NETM-5.4",
        "description": "Security Architecture must specify approved remote access solutions through the Remote Access Working Group",
        "groups": "Group 2",
        "rationale": "",
        "roleResponsible": [
            "Security Architecture"
        ],
        "guidance": "",
        "mappings": {
            "NIST": [
                "PR.AC-1",
                "PR.AC-2",
                "PR.AC-3",
                "PR.AC-4"
            ]
        }
    },
    {
        "title": "Network Management",
        "id": "SCS-NETM-5.5",
        "description": "Remote access for the maintenance of Nationwide IT Systems and Nationwide IT Networks by employees and contingent workers of authorised suppliers must be managed by:\na) \tactivating remote-access technologies for suppliers only when needed;\nb) \trestricting access to authorised users;\nc) \tdefining and agreeing the objectives and scope of planned work;\nd) \tauthorising sessions individually only during the period of time needed;\ne) \traising an incident or change record for each session in accordance with Change Management;\nf) \tautomatically disconnecting of sessions after a 10-minute period of inactivity or when no longer required;\ng) \trestricting access rights to least privilege;\nh) \tverifying the source of the remote connection in accordance with the contractually approved location;\ni) \tensuring that Nationwide retains control of the session at all times;\nj) \tmonitoring and logging all activity to ensure accountability and non-repudiation;\nk) \trequiring the use of unique authentication credentials for individual users;\nl) \trevoking access privileges and changing passwords immediately after agreed maintenance is complete;\nm) \tperforming an independent review of remote maintenance activity;\nn) \tprohibiting the copying, moving, and storage of data onto Portable Storage Media and Removable Media, unless explicitly authorised for a defined business need",
        "groups": "Group 2",
        "rationale": "",
        "roleResponsible": [
            "Information Asset Owner",
            "IT Custodian",
            "IT Support"
        ],
        "guidance": "",
        "mappings": {
            "NIST": [
                "PR.AC-1",
                "PR.AC-2",
                "PR.AC-3",
                "PR.AC-4"
            ]
        }
    },
    {
        "title": "Network Management",
        "id": "SCS-NETM-7.8",
        "description": "Reviews of firewall rules for Nationwide IT Networks must be performed: \na) \tat least every 6 months between Nationwide IT Network boundary proxies and Cardholder Data Environments (CDEs); \nb) \tat least every 12 months between all other boundaries defined within Network Design Principles; \nc) \tat least every 2 years or earlier in the event of material change or incident for all other instances of firewalls",
        "groups": "Group 1",
        "rationale": "",
        "roleResponsible": [
            "IT Support"
        ],
        "guidance": "Project just needs to evidence they have passed the requirement to BAU. An email will suffice.",
        "mappings": {
            "NIST": [
                "PR.IP-1",
                "PR.IP-2"
            ]
        }
    },
    {
        "title": "Supply Chain Management",
        "id": "SCS-SUPPC-1.1.1",
        "description": "Suppliers must be selected through approved sourcing procedures where business requirements have been identified to:\na) \tcreate, receive, process, access, store, transmit or retain/destroy Nationwide Information, Nationwide IT Systems or Nationwide IT Networks; \nb) \tprovide Nationwide with software, systems, hardware, data processing or other services;\nc) \tprovide contingent workers or suppliers with access to Nationwide Premises;\nd) \tprovide physical resources;\ne) \tdefine the security requirements which need to be in place, beyond the supplier’s standard security terms and conditions using the Supplier Security Profile;\nf) \tidentify the need for further investigation of a bidding supplier's security capability;\ng) \tclarify and agree security related Service Level Agreements (SLAs);\nh) \testablish a method for exiting, terminating, renewing and renegotiating contracts with suppliers whilst meeting SLA requirements;\ni) \testablish Business Continuity (BC) and Disaster Recovery (DR) procedures in the eventuality that one or more suppliers becomes unavailable",
        "groups": "Group 1",
        "rationale": "",
        "roleResponsible": [
            "Change/Project Sponsor"
        ],
        "guidance": "Met if 3rd party team & procurement engaged, else compliance required.",
        "mappings": {
            "NIST": [
                "ID.AM-6",
                "PR.AT-3",
                "PR.IP-11",
                "PR.IP-8",
                "PR.IP-9",
                "PR.IP-10"
            ]
        }
    },
    {
        "title": "Supply Chain Management",
        "id": "SCS-SUPPC-1.1.2",
        "description": "All proposed services being sought by Nationwide must be categorised and evaluated using the Service Risk Profile tool and Supplier Security Profile for the services proposed for sourcing. The level of support required from the Security Function throughout the sourcing process must be determined",
        "groups": "Group 1",
        "rationale": "",
        "roleResponsible": [
            "Change/Project Sponsor"
        ],
        "guidance": "Met if 3rd party team & procurement engaged, else compliance required.",
        "mappings": {
            "NIST": [
                "ID.AM-6",
                "PR.AT-3",
                "PR.IP-11",
                "PR.IP-8",
                "PR.IP-9",
                "PR.IP-10"
            ]
        }
    },
    {
        "title": "Supply Chain Management",
        "id": "SCS-SUPPC-1.1.3",
        "description": "The sourcing process, including the use of the Service Risk Profile tool, must:\na) \tidentify the associated Information Classification of the types and volumes of Nationwide Information, including personal, special category or Payment Card Industry (PCI) data that will be shared with, accessed, processed, transmitted or stored by suppliers as part of the service being procured, and mapping between the supplier information classification scheme;\nb) \tprovide an Asset Classification (e.g. HARM assessment) where Nationwide IT Systems are to be built or operated outside of the Nationwide IT Networks;\nc) \tprovide a Supplier Security Profile (i.e. business impact assessment) for the services proposed for sourcing;\nd) \tdetermine and assess internal, commercial, contractual, governmental, legal and regulatory obligations for protecting Nationwide Information;\ne) \tprovide a security categorisation of the service being outsourced including, as a minimum, requirements for:\ni) \tthe supplier’s employees, contingent workers or sub-contractors (including fourth and fifth parties) to access Nationwide Premises;\nii) \taccess to Nationwide IT Systems through the Nationwide IT Network and/or remote access; \niii) \tthe electronic or physical transmission of Nationwide Information;\niv) \tthe provision of websites or applications that provide member, intermediary or employee authentication or access control procedures; \nv) \tthe geographical locations of data that will be accessed, processed, transmitted or stored;\nvi) \tthe storage and processing of data within Cloud Service Provider infrastructure and cloud service models.",
        "groups": "Group 1",
        "rationale": "",
        "roleResponsible": [
            "Security & Resilience",
            "Procurement"
        ],
        "guidance": "Met if 3rd party team & procurement engaged, else compliance required.",
        "mappings": {
            "NIST": [
                "ID.AM-6",
                "PR.AT-3",
                "PR.IP-11",
                "PR.IP-8",
                "PR.IP-9",
                "PR.IP-10"
            ]
        }
    },
    {
        "title": "Supply Chain Management",
        "id": "SCS-SUPPC-1.2.1",
        "description": "Where indicated by the Service Risk Profile tool, Procurement must engage with the Security Function to evaluate the service requirements",
        "groups": "Group 1",
        "rationale": "",
        "roleResponsible": [
            "Procurement"
        ],
        "guidance": "Met if 3rd party team engaged, else compliance required.",
        "mappings": {
            "NIST": [
                "ID.AM-6",
                "PR.AT-3",
                "PR.IP-11",
                "PR.IP-8",
                "PR.IP-9",
                "PR.IP-10"
            ]
        }
    },
    {
        "title": "Supply Chain Management",
        "id": "SCS-SUPPC-1.2.2",
        "description": "Where indicated by the Service Risk Profile tool, the Security Function must evaluate each service based on the following wherever possible: \na) \tsecurity posture based on industry ratings (i.e. Bitsight and Cloud Access Security Broker [CASB]);\nb) \tability to meet Nationwide’s security requirements for protecting Nationwide Information including contractual, regulatory and legal obligations including the supply chain where applicable;\nc) \tgeographical location (including location of data storage for Cloud Services) and those of their suppliers (including fourth and fifth parties) and contingent workers;\nd) \texisting security certification(s) relevant to the scope of services being procured as defined within the Supplier Security Profile;\ne) \tcapability to report on and enhance security arrangements to meet the Society’s requirements and compliance obligations.",
        "groups": "Group 1",
        "rationale": "",
        "roleResponsible": [
            "Security & Resilience"
        ],
        "guidance": "Met if 3rd party team engaged, else compliance required.",
        "mappings": {
            "NIST": [
                "ID.AM-6",
                "PR.AT-3",
                "PR.IP-11",
                "PR.IP-8",
                "PR.IP-9",
                "PR.IP-10"
            ]
        }
    },
    {
        "title": "Supply Chain Management",
        "id": "SCS-SUPPC-1.2.3",
        "description": "The Security Function must define the expected minimum security criteria for suppliers based on their Service Risk Profile and Supplier Security Profile",
        "groups": "Group 1",
        "rationale": "",
        "roleResponsible": [
            "Security & Resilience"
        ],
        "guidance": "Met if 3rd party team engaged, else compliance required.",
        "mappings": {
            "NIST": [
                "ID.AM-6",
                "PR.AT-3",
                "PR.IP-11",
                "PR.IP-8",
                "PR.IP-9",
                "PR.IP-10"
            ]
        }
    },
    {
        "title": "Supply Chain Management",
        "id": "SCS-SUPPC-2.1",
        "description": "Contracts with all suppliers (including Cloud Service Providers), must be established and signed prior to providing access to Nationwide Information, Nationwide IT Systems, the Nationwide IT Network or unescorted access to Nationwide Premises",
        "groups": "Group 1",
        "rationale": "",
        "roleResponsible": [
            "Security & Resilience",
            "Procurement",
            "Legal"
        ],
        "guidance": "",
        "mappings": {
            "NIST": [
                "ID.AM-6",
                "PR.AT-3",
                "PR.IP-11",
                "PR.IP-8",
                "PR.IP-9",
                "PR.IP-10"
            ]
        }
    },
    {
        "title": "Supply Chain Management",
        "id": "SCS-SUPPC-2.2",
        "description": "A Security contract schedule must be defined and involve as a minimum, parties responsible for privacy, legal, information management and security service classification and Information Classification. This must include responsibilities for control ownership and operation where applicable.",
        "groups": "Group 1",
        "rationale": "",
        "roleResponsible": [
            "Security & Resilience"
        ],
        "guidance": "Met if 3rd party team engaged, else compliance required.",
        "mappings": {
            "NIST": [
                "ID.AM-6",
                "PR.AT-3",
                "PR.IP-11",
                "PR.IP-8",
                "PR.IP-9",
                "PR.IP-10"
            ]
        }
    },
    {
        "title": "Supply Chain Management",
        "id": "SCS-SUPPC-2.3",
        "description": "A Security contract schedule must be maintained and reviewed on at least an annual basis or where there is material change",
        "groups": "Group 1",
        "rationale": "",
        "roleResponsible": [
            "Security & Resilience"
        ],
        "guidance": "Met if 3rd party team engaged, else compliance required.",
        "mappings": {
            "NIST": [
                "ID.AM-6",
                "PR.AT-3",
                "PR.IP-11",
                "PR.IP-8",
                "PR.IP-9",
                "PR.IP-10"
            ]
        }
    },
    {
        "title": "Supply Chain Management",
        "id": "SCS-SUPPC-2.4",
        "description": "Additional security requirements and contractual schedules for suppliers must be defined based on the Supplier Security Profile and included in the contract or relevant contract schedules",
        "groups": "Group 1",
        "rationale": "",
        "roleResponsible": [
            "Security & Resilience",
            "Procurement",
            "Legal"
        ],
        "guidance": "Met if 3rd party team engaged, else compliance required.",
        "mappings": {
            "NIST": [
                "ID.AM-6",
                "PR.AT-3",
                "PR.IP-11",
                "PR.IP-8",
                "PR.IP-9",
                "PR.IP-10"
            ]
        }
    },
    {
        "title": "Supply Chain Management",
        "id": "SCS-SUPPC-3.1",
        "description": "Suppliers with access to Nationwide Information and Nationwide Premises must be recorded within a supplier inventory. The inventory of suppliers and associated contract schedules must contain:\na) \tthe relationship with the supplier and who they are including:\ni.\tthe service risk profile of the supplier;\nii.\tthe Supplier Security Profile;\niii.\tthe assigned Relationship Manager and nominated points of contact from the Procurement Team and the Security Function;\nb) \t a description of the service provided;\nc) \tthe types and classification of Nationwide Information created, received, accessed, processed, stored, transmitted or retained/destroyed by the supplier",
        "groups": "Group 1",
        "rationale": "",
        "roleResponsible": [
            "Relationship Manager/Owner",
            "Security & Resilience"
        ],
        "guidance": "Met if 3rd party team and procurement engaged, else compliance required.",
        "mappings": {
            "NIST": [
                "ID.AM-6",
                "PR.AT-3",
                "PR.IP-11",
                "PR.IP-8",
                "PR.IP-9",
                "PR.IP-10"
            ]
        }
    },
    {
        "title": "Supply Chain Management",
        "id": "SCS-SUPPC-3.2",
        "description": "Contingency arrangements must be established to ensure that Nationwide’s business and security processes can continue in the event that one or more suppliers are not available. These arrangements must be determined in accordance with a Business Continuity Impact Assessment and must include:\na) \tthe provision of alternative, secure facilities for business processes to continue;\nb) \tescrow agreements for Nationwide Information and closed/proprietary technologies using a trusted supplier;\nc) \trecovery arrangements to ensure continued availability of Nationwide Information stored by a supplier or Cloud Service Provider;\nd) \tfull integration within Nationwide’s Business Continuity Programme.",
        "groups": "Group 1",
        "rationale": "",
        "roleResponsible": [
            "Relationship Manager/Owner",
            "Security & Resilience",
            "Procurement"
        ],
        "guidance": "",
        "mappings": {
            "NIST": [
                "ID.AM-6",
                "PR.AT-3",
                "PR.IP-11",
                "PR.IP-8",
                "PR.IP-9",
                "PR.IP-10"
            ]
        }
    },
    {
        "title": "Supply Chain Management",
        "id": "SCS-SUPPC-3.3",
        "description": "Security incident reporting processes must be implemented with suppliers to immediately notify Nationwide of any Security Events or Security Incidents with potential impacts to Nationwide Information, Nationwide People or Nationwide Premises via nominated point(s) of contact from both the supplier and Nationwide",
        "groups": "Group 1",
        "rationale": "",
        "roleResponsible": [
            "Relationship Manager/Owner",
            "Security & Resilience",
            "Procurement"
        ],
        "guidance": "Met if 3rd party team engaged, else compliance required.",
        "mappings": {
            "NIST": [
                "ID.AM-6",
                "PR.AT-3",
                "PR.IP-11",
                "PR.IP-8",
                "PR.IP-9",
                "PR.IP-10"
            ]
        }
    },
    {
        "title": "Supply Chain Management",
        "id": "SCS-SUPPC-4.1",
        "description": "Relationship Managers for suppliers that access, store, process and transmit Nationwide Information, and/or access, support and enable Nationwide IT Systems and Nationwide IT Networks must:\na) \tensure suppliers enforce the security requirements as agreed within contractual terms and conditions throughout the lifecycle of the contractual agreement;\nb) \tmonitor adherence to Service Level Agreements (SLAs) and terms and conditions that impact security, with a formal review of compliance for all suppliers as follows:\n•\tHigh rated – at least quarterly;\n•\tMedium rated – at least every 6 months;\n•\tLow rated – at least annually;\nc) \tundertake remedial actions if deficiencies in supplier delivery are observed using commercial obligations where possible, and advise the Security Function of any deficiencies that impact the confidentiality, integrity or availability of Nationwide Information;\nd) \tcomplete a review of the Service Risk Profile and Supplier Security Profile if there are changes to the service provision with updates to requirements, contractual terms and conditions and monitoring procedures as necessary",
        "groups": "Group 1",
        "rationale": "",
        "roleResponsible": [
            "Relationship Manager/Owner",
            "Security & Resilience"
        ],
        "guidance": "Met if 3rd party team and procurement engaged, else compliance required.",
        "mappings": {
            "NIST": [
                "ID.AM-6",
                "PR.AT-3",
                "PR.IP-11",
                "PR.IP-8",
                "PR.IP-9",
                "PR.IP-10"
            ]
        }
    },
    {
        "title": "Supply Chain Management",
        "id": "SCS-SUPPC-4.2",
        "description": "Relationship Managers must ensure that procedures are defined and implemented to:\na) \tensure compliance with legislative, regulatory and contractual requirements related to intellectual property rights and the use of proprietary software products;\nb) \tdeploy the agreed contractual terms and security arrangements in practice and establish monitoring procedures;\nc) \tensure suppliers advise of the steps undertaken and progress with adhering to changes in contractual, regulatory or legal obligations within the scope of service",
        "groups": "Group 1",
        "rationale": "",
        "roleResponsible": [
            "Relationship Manager/Owner",
            "Security & Resilience"
        ],
        "guidance": "Met if 3rd party team and procurement engaged, else compliance required.",
        "mappings": {
            "NIST": [
                "ID.AM-6",
                "PR.AT-3",
                "PR.IP-11",
                "PR.IP-8",
                "PR.IP-9",
                "PR.IP-10"
            ]
        }
    },
    {
        "title": "Supply Chain Management",
        "id": "SCS-SUPPC-4.3",
        "description": "Suppliers must be subject to security assurance procedures in accordance with their Service Risk Profile and Supplier Security Profile as follows:\n•\tHigh rated – at least quarterly:\ni) \tusing a security posture evaluation tool (such as Bitsight);\nii) \tproposing and gaining approval for security remediation projects to address contractual non-performance;\niii) \tmanaging security remediation projects;\n•\tMedium rated – at least every 6 months:\ni) \tusing a security posture evaluation tool (such as Bitsight);\nii) \tmanaging security remediation projects;\n•\tLow rated – at least annually:\ni) \tproviding self-attestation for security control function and remediation.",
        "groups": "Group 1",
        "rationale": "",
        "roleResponsible": [
            "Relationship Manager/Owner",
            "Security & Resilience"
        ],
        "guidance": "Met if 3rd party team and procurement engaged, else compliance required.",
        "mappings": {
            "NIST": [
                "ID.AM-6",
                "PR.AT-3",
                "PR.IP-11",
                "PR.IP-8",
                "PR.IP-9",
                "PR.IP-10"
            ]
        }
    },
    {
        "title": "Supply Chain Management",
        "id": "SCS-SUPPC-4.4",
        "description": "The Security Function must design and communicate a risk-based controls testing approach that uses available evidence for suppliers based on their Service Risk Profile and Supplier Security Profile including consideration of:\na) \ttesting of suppliers whom operate controls tested as part of adherence to internal control standards (i.e. managed service providers);\nb) \tavailability of self-attestations and/or external certifications (i.e. SOC2, CAIQ, ISAE3402, Cyber Essentials+);\nc) \tresults of self-attestation",
        "groups": "Group 1",
        "rationale": "",
        "roleResponsible": [
            "Relationship Manager/Owner",
            "Security & Resilience"
        ],
        "guidance": "Met if 3rd party team engaged, else compliance required.",
        "mappings": {
            "NIST": [
                "ID.AM-6",
                "PR.AT-3",
                "PR.IP-11",
                "PR.IP-8",
                "PR.IP-9",
                "PR.IP-10"
            ]
        }
    },
    {
        "title": "Supply Chain Management",
        "id": "SCS-SUPPC-4.5",
        "description": "The Service Risk Profile and Supplier Security Profile of a supplier must be reviewed on an annual basis or earlier in the event of a material change (inclusive of additional service offerings being procured or utilised) or Security Incident occurring",
        "groups": "Group 1",
        "rationale": "",
        "roleResponsible": [
            "Relationship Manager/Owner",
            "Security & Resilience"
        ],
        "guidance": "Met if 3rd party team and procurement engaged, else compliance required.",
        "mappings": {
            "NIST": [
                "ID.AM-6",
                "PR.AT-3",
                "PR.IP-11",
                "PR.IP-8",
                "PR.IP-9",
                "PR.IP-10"
            ]
        }
    },
    {
        "title": "Supply Chain Management",
        "id": "SCS-SUPPC-4.7",
        "description": "Relationship Managers must ensure testing is undertaken in accordance with the testing schedule and the criticality of the service",
        "groups": "Group 1",
        "rationale": "",
        "roleResponsible": [
            "Relationship Manager/Owner"
        ],
        "guidance": "N/A to projects.",
        "mappings": {
            "NIST": [
                "ID.AM-6",
                "PR.AT-3",
                "PR.IP-11",
                "PR.IP-8",
                "PR.IP-9",
                "PR.IP-10"
            ]
        }
    },
    {
        "title": "Supply Chain Management",
        "id": "SCS-SUPPC-4.8",
        "description": "Senior Relationship Owners, or delegated Relationship Managers, must:\na) \tdevelop and discuss appropriate risk response with the supplier and the Security Function if any issues are identified within supplier assurance activities or if they are notified of relevant internal and external Security Incidents; \nb) \trecord and track any risk response activities required by the supplier",
        "groups": "Group 1",
        "rationale": "",
        "roleResponsible": [
            "Relationship Manager/Owner",
            "Security & Resilience",
            "Controls Testing"
        ],
        "guidance": "Evidence required if issues identified during change. Else N/A",
        "mappings": {
            "NIST": [
                "ID.AM-6",
                "PR.AT-3",
                "PR.IP-11",
                "PR.IP-8",
                "PR.IP-9",
                "PR.IP-10"
            ]
        }
    },
    {
        "title": "Supply Chain Management",
        "id": "SCS-SUPPC-5.1",
        "description": "Relationship Managers must ensure that exit and contingency plans are executed with suppliers upon termination, in accordance with the Service Resilience Strategy & Exit Planning section of the OVM Framework, to ensure that: \na) \tphysical and logical access rights to Nationwide Information including access to Nationwide Premises are revoked on contract termination;\nb) \tany Nationwide Assets, including Nationwide Information, in the supplier’s possession are returned, transferred, or securely destroyed/disposed of with verification;\nc) \tcompliance with license agreements and intellectual property rights are maintained",
        "groups": "Group 1",
        "rationale": "",
        "roleResponsible": [
            "Relationship Manager/Owner",
            "Sourcing Manager"
        ],
        "guidance": "Evidence required if change includes supplier termination else N/A",
        "mappings": {
            "NIST": [
                "ID.AM-6",
                "PR.AT-3",
                "PR.IP-11",
                "PR.IP-8",
                "PR.IP-9",
                "PR.IP-10",
                "PR.IP-6"
            ]
        }
    },
    {
        "title": "Supply Chain Management",
        "id": "SCS-SUPPC-5.2",
        "description": "Sourcing Managers, on instruction by Senior Relationship Owners renewing or renegotiating contracts with suppliers, must verify existing security arrangements and propose any revised security terms and conditions with support from the Security Function prior to completing new contractual terms and conditions",
        "groups": "Group 1",
        "rationale": "",
        "roleResponsible": [
            "Relationship Manager/Owner",
            "Sourcing Manager"
        ],
        "guidance": "Met if 3rd party team and procurement engaged, else compliance required.",
        "mappings": {
            "NIST": [
                "ID.AM-6",
                "PR.AT-3",
                "PR.IP-11",
                "PR.IP-8",
                "PR.IP-9",
                "PR.IP-10"
            ]
        }
    },
    {
        "title": "Member and Intermediary Access",
        "id": "SCS-MEMINT-1.1.1",
        "description": "Member and intermediary access control procedures must be determined by undertaking an Information Security Risk Assessment to determine enrolment, authentication and authorisation requirements",
        "groups": "Group 2",
        "rationale": "A risk assessment should be carried out to identify access requirements for members and intermediaries (M&I) , ensuring their access process (incl. credentials) , Nationwide's systems and the data within are secure at all times.",
        "roleResponsible": [
            "Product Owner"
        ],
        "guidance": "",
        "mappings": {
            "NIST": [
                "PR.AC-1",
                "PR.AC-2",
                "PR.AC-4"
            ]
        }
    },
    {
        "title": "Member and Intermediary Access",
        "id": "SCS-MEMINT-1.1.2",
        "description": "Member and intermediary access procedures to Nationwide IT Systems and Nationwide Information must:\na) \tprotect Nationwide Information including Personally Identifiable Information (PII) and sensitive information from unauthorised disclosure;\nb) \tbe supported by formally documented enrolment, maintenance and deprovisioning procedures for both member and intermediary access;\nc) \tauthenticate members and intermediaries prior to providing access to Nationwide Information;\nd) \trestrict access to member and intermediary information based on the principle of least privilege;\ne) \tcomply with legal, regulatory or contractual requirements, inclusive of Strong Customer Authentication (SCA) or superseding regulation;\nf) \tbe supported by a fraud risk assessment that has considered transactional risks and the requirement for re-authentication and/or Multi-Factor Authentication (MFA);\ng) \tinclude any security requirements for provision of services to members and intermediaries in different legal jurisdictions;\nh) \trestrict unauthorised device types from connecting to applications;\ni) \tprovide members and intermediaries with mechanisms to report Security Events or Security Incidents;\nj) \tinclude production and maintenance of terms and conditions of use that are approved by regulatory and legal functions;\nk) \tensure that once a member or intermediary is authenticated, they are only presented with the information and services they are authorised for.",
        "groups": "Group 2",
        "rationale": "Identifies the requirements that should be put in place to design, safeguard and maintain security of access provision to M&I as well as Nationwide systems and data.",
        "roleResponsible": [
            "Product Owner"
        ],
        "guidance": "",
        "mappings": {
            "NIST": [
                "PR.AC-1",
                "PR.AC-2",
                "PR.AC-4"
            ]
        }
    },
    {
        "title": "Member and Intermediary Access",
        "id": "SCS-MEMINT-1.1.3",
        "description": "Procedures relating to member and intermediary access must be reviewed as part of an Information Security Risk Assessment at least annually or earlier in the event of material change or incident",
        "groups": "Group 2",
        "rationale": "Documentation of procedures relating to M&I access are required so Nationwide has a clear record for reference should changes or incidents occur - enabling impact of these to be understood.",
        "roleResponsible": [
            "Product Owner"
        ],
        "guidance": "",
        "mappings": {
            "NIST": [
                "PR.AC-1",
                "PR.AC-2",
                "PR.AC-4"
            ]
        }
    },
    {
        "title": "Member and Intermediary Access",
        "id": "SCS-MEMINT-1.1.4",
        "description": "Member and intermediary access controls must:\na) \tprovide each individual with a unique identifier;\nb) \tperform integrity checks to validate devices used to connect to Nationwide applications and services have not been compromised;\nc) \tdisplay conditions that limit the liabilities of Nationwide to members and intermediaries;\nd) \tverify identity and successfully authenticate before granting access to Nationwide Information;\ne) \tuse authentication mechanisms as identified through an Information Security Risk Assessment",
        "groups": "Group 2",
        "rationale": "The foundational requirements for access provision for M&I users ensuring secure access and protection of M&I accounts.",
        "roleResponsible": [
            "Product Owner"
        ],
        "guidance": "",
        "mappings": {
            "NIST": [
                "PR.AC-1",
                "PR.AC-2",
                "PR.AC-4"
            ]
        }
    },
    {
        "title": "Member and Intermediary Access",
        "id": "SCS-MEMINT-1.1.5",
        "description": "Wherever Strong Customer Authentication is not applicable, member and intermediary access to Nationwide applications and services, in accordance with the Systems Development Lifecycle, as a minimum must:\na) \tprevent brute force attacks;\nb) \tnot display identifiers until the log-on process has been successfully completed;\nc) \tdisplay a general notice warning that access must only be by authorised users;\nd) \tprovides generic error messages if authentication is unsuccessful when attempting to log-on;\ne) \tvalidate the log-on information only on completion of all input data;\nf) \tlock out the account following 3 repeated failed log-on attempts;\ng) \tlog unsuccessful and successful attempts including account lockouts;\nh) \tdisplay the data and time of the previous successful log-on on completion of a member’s successful log-in; \ni) \tnot display the password being entered;\nj) \tnot transmit passwords in clear text over a network;\nk) \trestrict access to a single authenticated session;\nl) \tterminate inactive sessions after a maximum of 10 minutes of inactivity;\nm) \tprovide a mechanism for recovering lost or forgotten credentials;\nn) \tenable re-activation of blocked or disabled accounts;\no) \tbe implemented in accordance with biometric and token-based authentication in Identity and Access Management",
        "groups": "Group 2",
        "rationale": "The foundational security requirements for protection of Nationwide systems and services that are accessed by M&I. Including controls that prevent and detect unauthorised access ",
        "roleResponsible": [
            "Product Owner"
        ],
        "guidance": "",
        "mappings": {
            "NIST": [
                "PR.AC-1",
                "PR.AC-2",
                "PR.AC-4"
            ]
        }
    },
    {
        "title": "Member and Intermediary Access",
        "id": "SCS-MEMINT-1.1.6",
        "description": "Authentication requirements for member and intermediary access to Nationwide applications and services must:\na) \tvalidate the authenticity of log-on credentials and contact details;\nb) \tenforce the use of unique individual user IDs;\nc) \tallow users to select and change their own passwords and include a confirmation procedure to allow for input errors;\nd) \trequire selected passwords/passphrases to meet minimum length and complexity requirements including:\ni.\tminimum length of 8 characters;\nii.\tmaximum length of 128 characters;\niii.\tat least one alphabet character;\niv.\tat least one numeric character;\nv.\tat least one special character;\nvi.\tat least one upper case character;\nvii.\tat least on lower case character; \ne) \tmaintain a record of previously used passwords and prevent re-use;\nf) \tnot display passwords on the screen when being entered;\ng) \tstore password files separately from application system data;\nh) \tsecurely store and transmit passwords in accordance with Cryptography",
        "groups": "Group 2",
        "rationale": "Requirements that enable Nationwide to offer secure account and credential services to M&I users - providing secure ways to identify and secure users and their accounts.",
        "roleResponsible": [
            "Product Owner"
        ],
        "guidance": "",
        "mappings": {
            "NIST": [
                "PR.AC-1",
                "PR.AC-2",
                "PR.AC-4"
            ]
        }
    },
    {
        "title": "Member and Intermediary Access",
        "id": "SCS-MEMINT-1.1.7",
        "description": "Changes to member and intermediary authentication and log-on process must be reviewed and approved by Fraud, Security, Compliance and Legal teams",
        "groups": "Group 2",
        "rationale": "Ensuring that changes to authentication and log-on procedures are appropriate and do not contravene requirements set out by the named compliance teams.",
        "roleResponsible": [
            "Product Owner"
        ],
        "guidance": "",
        "mappings": {
            "NIST": [
                "PR.AC-1",
                "PR.AC-2",
                "PR.AC-4"
            ]
        }
    },
    {
        "title": "Member and Intermediary Access",
        "id": "SCS-MEMINT-1.1.8",
        "description": "Applications and services providing member and intermediary access to Nationwide Information must maintain suitable audit trails in accordance with Logging and Monitoring, including as a minimum:\na) \tauthorised member and intermediary user accounts;\nb) \taccess rights assigned to Nationwide applications and services;\nc) \ttypes of information accessed;\nd) \ttransactions initiated;\ne) \tauthentication events and parameters",
        "groups": "Group 2",
        "rationale": "Auditing is required to ensure that any incident, queries related to access or complaints can be investigated for our M&I users and Nationwide.",
        "roleResponsible": [
            "Product Owner"
        ],
        "guidance": "",
        "mappings": {
            "NIST": [
                "PR.AC-1",
                "PR.AC-2",
                "PR.AC-4"
            ]
        }
    },
    {
        "title": "Member and Intermediary Access",
        "id": "SCS-MEMINT-1.1.9",
        "description": "Nationwide IT Systems, applications and services providing member and intermediary access to Nationwide Information must provide methods for handling Security Incidents, including:\na) \tproviding members and intermediaries with mechanisms to report Security Events, Security Incidents and any observed or suspected security weaknesses;\nb) \tagreeing predetermined times that support will be available;\nc) \tdefining pre-agreed responses to potential Security Events to minimise the disruption of Security Incidents;\nd) \tdefining processes for contacting the member and/or intermediary when a Security Incident occurs via a pre-agreed mechanism",
        "groups": "Group 2",
        "rationale": "Provision of a way for our M&I users to report security issues and associated processes and procedures for Nationwide to resolve those issues or incidents incl. customer contact and incident resolution.",
        "roleResponsible": [
            "Product Owner"
        ],
        "guidance": "",
        "mappings": {
            "NIST": [
                "PR.AC-1",
                "PR.AC-2",
                "PR.AC-4"
            ]
        }
    },
    {
        "title": "Member and Intermediary Access",
        "id": "SCS-MEMINT-1.1.10",
        "description": "Security Incidents affecting members and intermediaries must be managed in accordance with Nationwide’s Security Incident Management",
        "groups": "Group 2",
        "rationale": "Security incidents affecting M&I user must be handled in accordance with the Security Incident Management standards.",
        "roleResponsible": [
            "Product Owner"
        ],
        "guidance": "",
        "mappings": {
            "NIST": [
                "PR.AC-1",
                "PR.AC-2",
                "PR.AC-4"
            ]
        }
    },
    {
        "title": "Member and Intermediary Access",
        "id": "SCS-MEMINT-1.1.11",
        "description": "Nationwide IT Systems applications and services providing member and intermediary access to Nationwide Information must provide methods for security vulnerability disclosure",
        "groups": "Group 2",
        "rationale": "Requirement to put in place a process whereby anyone that identifies a security vulnerability has a route to report it directly to Nationwide at the earliest opportunity - this could prevent public disclosure of a security vulnerability in one of Nationwide's systems/services.",
        "roleResponsible": [
            "Product Owner"
        ],
        "guidance": "",
        "mappings": {
            "NIST": [
                "PR.AC-1",
                "PR.AC-2",
                "PR.AC-4"
            ]
        }
    },
    {
        "title": "Member and Intermediary Access",
        "id": "SCS-MEMINT-2.1",
        "description": "Member and intermediary access to Nationwide applications, services and Nationwide Information must be supported by terms and conditions of use that are:\na) \tapproved by the Product Owner and Service Owner;\nb) \treviewed at least annually or earlier in the event of material change or incident",
        "groups": "",
        "rationale": "Terms and conditions of use provide clear rules of engagement and conditions of use for users of the system/service",
        "roleResponsible": [
            "Product Owner",
            "Legal"
        ],
        "guidance": "",
        "mappings": {
            "NIST": [
                "PR.AC-1",
                "PR.AC-2",
                "PR.AC-4"
            ]
        }
    },
    {
        "title": "Member and Intermediary Access",
        "id": "SCS-MEMINT-2.2",
        "description": "Member and intermediary terms and conditions of use must clearly define:\na) \tobligations, responsibilities and liabilities of both parties;\nb) \taccess control procedures; \nc) \tdates and times when the service is operational;\nd) \tactions to be taken in the event of a breach of terms and conditions of use",
        "groups": "",
        "rationale": "Clear language must be used in the terms and conditions so that M&I users understand their responsibility and impact from non-adherence to those terms and conditions.",
        "roleResponsible": [
            "Product Owner",
            "Legal"
        ],
        "guidance": "",
        "mappings": {
            "NIST": [
                "PR.AC-1",
                "PR.AC-2",
                "PR.AC-4"
            ]
        }
    },
    {
        "title": "Member and Intermediary Access",
        "id": "SCS-MEMINT-2.3",
        "description": "Member and intermediary terms and conditions of use must contain the security activities to be performed by Nationwide, which include:\na) \tprotecting Personally Identifiable Information (PII) of the member or individuals associated with the member (and other external parties) to the extent legally required;\nb) \tlimiting access to member information to a minimum number of authorised employees or contingent workers;\nc) \tmeeting legal and regulatory requirements;\nd) \tdefining if, and how, Nationwide is permitted to outsource to external parties;\ne) \tproviding dedicated support;\nf) \tprocedures for notifying the member of maintenance activities, such as managing changes to Nationwide IT Systems and applications;\ng) \tany monitoring activities carried out by Nationwide (including use of cookies);\nh) \tdealing with security issues effectively via agreed points of contact within Nationwide who are available at predetermined times.",
        "groups": "",
        "rationale": "This outlines the activity Nationwide will be taking to keep M&I users and Nationwide systems and data secure and the reasons for that activity.",
        "roleResponsible": [
            "Product Owner",
            "Legal"
        ],
        "guidance": "",
        "mappings": {
            "NIST": [
                "PR.AC-1",
                "PR.AC-2",
                "PR.AC-4"
            ]
        }
    },
    {
        "title": "Member and Intermediary Access",
        "id": "SCS-MEMINT-2.4",
        "description": "Member and intermediary terms and conditions of use must clearly define the security responsibilities of the member and/or intermediary, including:\na) \tperforming account management procedures;\nb) \tapplying agreed security controls;\nc) \tpreventing unauthorised disclosure of Nationwide Information;\nd) \tprotecting Nationwide Information when sharing with external parties;\ne) \tsafeguarding Nationwide Information and Nationwide IT Systems;\nf) \treturning or destroying Nationwide Information and Nationwide IT Systems (including Hardware) on an agreed date or upon request;\ng) \tnotifying Nationwide of any actual or suspected Security Incidents",
        "groups": "",
        "rationale": "This outlines the responsibilities of M&I users in keeping their account and data secure, along with Nationwide systems and data.",
        "roleResponsible": [
            "Product Owner",
            "Legal"
        ],
        "guidance": "",
        "mappings": {
            "NIST": [
                "PR.AC-1",
                "PR.AC-2",
                "PR.AC-4"
            ]
        }
    },
    {
        "title": "Member and Intermediary Access",
        "id": "SCS-MEMINT-3.1",
        "description": "Nationwide applications and services providing members and intermediaries with access to Nationwide Information must provide security awareness materials that advise users on:\na) \trelevant methodologies used by threat actors targeting members and intermediaries;\nb) \tmember and intermediary security responsibilities, including steps to secure their log-on credentials (e.g. not sharing user IDs and passwords/passphrases, not using devices that have been jailbroken or rooted);\nc) \tsecurity issues with clients/devices used to access Nationwide applications and services;\nd) \tactions to be taken and reporting procedures in the event of a Security Event or Security Incident",
        "groups": "",
        "rationale": "This ensures that Nationwide fulfils it's responsibility for providing M&I users with security awareness advice, which will help them to keep their information and Nationwide systems and data secure.",
        "roleResponsible": [
            "Product Owner",
            "Security & Resilience"
        ],
        "guidance": "",
        "mappings": {
            "NIST": [
                "PR.AC-1",
                "PR.AC-2",
                "PR.AC-4"
            ]
        }
    },
    {
        "title": "Member and Intermediary Access",
        "id": "SCS-MEMINT-3.2",
        "description": "Security awareness materials must be reviewed and updated as soon as practicable upon the receipt of relevant Cyber or Physical Threat Intelligence",
        "groups": "",
        "rationale": "The security awareness information must be reviewed regularly, and revisited when incidents or threat intelligence that could impact M&I users or the advice provided (e.g. a new scam, malware threat) is identified.",
        "roleResponsible": [
            "Product Owner",
            "Security & Resilience"
        ],
        "guidance": "",
        "mappings": {
            "NIST": [
                "PR.AT-1"
            ]
        }
    },
    {
        "title": "Equipment Management",
        "id": "SCS-EQMGT-1.1.1",
        "description": "Hardware used for the processing, transmission or storage of Nationwide Information and for Nationwide IT Systems must be:\na) \tprocured, acquired and supported by contractual arrangements in accordance with Supply Chain Management;\nb) \tevaluated by obtaining and reviewing independent assessments of technical security controls and the receipt of any relevant Cyber and Physical Threat Intelligence;\nc) \ttested prior to use to validate that legal, regulatory and contractual requirements can be fulfilled;\nd) \tsupported by maintenance arrangements with any warranty and maintenance constraints clarified, agreed and documented;\ne) \tapproved by the Security Function if used in the support of Tier 1 and Tier 2 Nationwide IT Systems in accordance with Systems Development Lifecycle",
        "groups": "Group 1",
        "rationale": "Hardware (any physical IT asset that is used to support corporate information or systems (e.g. laptop which includes MacBooks, a desktop, a server, network device, monitor, mobile device, printer). The requirements in 1.1.1 help to ensure that only appropriate (approved, secure, in line with architecture/technology strategy etc.) are used within Nationwide.",
        "roleResponsible": [
            "IT Support",
            "Change Squads"
        ],
        "guidance": "",
        "mappings": {
            "NIST": [
                "ID.AM-1",
                "ID.AM-5",
                "ID.AM-6",
                "PR.MA-1",
                "PR.MA-2"
            ]
        }
    },
    {
        "title": "Equipment Management",
        "id": "SCS-EQMGT-1.1.2",
        "description": "Wherever relevant, Cyber and Physical Threat Intelligence must be provided to parties sourcing and procuring Hardware to advise them of any risks relating to suppliers and/or suppliers that are not approved by the Security Function in accordance with the Supply Chain Management",
        "groups": "Group 1",
        "rationale": "Threat intelligence can inform sourcing and procurement functions of known security issues with hardware or vendors that could negatively impact Nationwide and its information.",
        "roleResponsible": [
            "Security & Resilience"
        ],
        "guidance": "",
        "mappings": {
            "NIST": [
                "ID.RM-3",
                "ID.RM-1",
                "ID.RA-3"
            ]
        }
    },
    {
        "title": "Equipment Management",
        "id": "SCS-EQMGT-1.2.1",
        "description": "Hardware used for the processing, transmission or storage of Nationwide Information and for Nationwide IT Systems must be securely stored, implemented and maintained through:\na) \tcategorising Hardware based on the Asset Classification of the Nationwide IT Systems that are supported and relevant legal, regulatory and contractual requirements (e.g. Payment Card Industry Data Security Standard [PCI-DSS]); \nb) \trecording and maintaining an asset inventory of Hardware including the purpose, ownership, physical location and description of functionality;\nc) \tmonitoring Hardware to ensure details about specification and configuration are accurately and completely recorded in the asset inventory;\nd) \tservicing and maintaining Hardware in accordance with manufacturer recommendations;\ne) \tmanaging Hardware in accordance with End of Service Life if identified to be going out of vendor support; \nf) \treporting and alerting the Security Function of any discrepancies in reconciliations of the asset inventory and hardware discovery procedures in accordance with Security Incident Management.",
        "groups": "Group 1",
        "rationale": "Management of assets is a key requirement as it enables the organisation ensure the product is operating, being accessed, monitored and maintained - all of which are essential to keep Nationwide and its information and systems secure.",
        "roleResponsible": [
            "IT Custodian",
            "Engineering"
        ],
        "guidance": "",
        "mappings": {
            "NIST": [
                "ID.AM-1",
                "ID.AM-5",
                "ID.AM-6",
                "PR.MA-1",
                "PR.MA-2"
            ]
        }
    },
    {
        "title": "Equipment Management",
        "id": "SCS-EQMGT-1.2.2",
        "description": "Prior to the implementation of new or updated Hardware, any associated software must be subject to system hardening in accordance with Build Standards and Systems Configuration",
        "groups": "",
        "rationale": "Hardware often comes with built in software which must also be assessed for security, locking down any unrequired capabilities (hardening)",
        "roleResponsible": [
            "IT Custodian",
            "Engineering"
        ],
        "guidance": "",
        "mappings": {
            "NIST": [
                "PR.IP-1"
            ]
        }
    },
    {
        "title": "Equipment Management",
        "id": "SCS-EQMGT-1.3.1",
        "description": "Hardware storing Nationwide Information that requires transportation outside of Nationwide Premises must:\na) \tnot be taken outside of Nationwide Premises without prior authorisation from the IT Custodian (excluding Nationwide-owned laptops, mobile devices and authorised Bring Your Own Device [BYOD] devices); \nb) \tbe maintained in an asset inventory with its location and a log of its chain of custody;\nc) \tnot be left unattended or without physical protection;\nd) \tnot be identifiable as belonging to Nationwide;\ne) \tbe maintained in accordance with manufacturer recommendations;\nf) \tbe transported in accordance with Information Handling and Management and Goods Movement Documents;\ng) \tbe encrypted in accordance with Cryptography",
        "groups": "Group 1",
        "rationale": "These steps are required to help ensure that the hardware and any information or technology associated with it are kept secure at all times.",
        "roleResponsible": [
            "IT Custodian",
            "IT Support"
        ],
        "guidance": "Only Applicable if transporting Hardware off NBS premises else N/A",
        "mappings": {
            "NIST": [
                "PR.DS-1",
                "PR.DS-2",
                "PR.DS-3",
                "PR.DS-4",
                "PR.DS-5",
                "ID.AM-5"
            ]
        }
    },
    {
        "title": "Equipment Management",
        "id": "SCS-EQMGT-1.3.2",
        "description": "Documentation related to the transport of Hardware must be retained in accordance with the appropriate retention schedule",
        "groups": "Group 1",
        "rationale": "This provides an audit log of activity relating to the hardware.",
        "roleResponsible": [
            "IT Custodian",
            "IT Support"
        ],
        "guidance": "Only Applicable if transporting Hardware off NBS premises else N/A",
        "mappings": {
            "NIST": [
                "ID.AM-5",
                "PR.IP-6"
            ]
        }
    },
    {
        "title": "Equipment Management",
        "id": "SCS-EQMGT-1.4.1",
        "description": "Hardware used in the processing of Nationwide Information classified as INTERNAL, CONFIDENTIAL or SECRET must be securely destroyed. Disposal procedures must:\na) \tensure that all Nationwide Information and licensed software has been securely removed or overwritten prior to disposal, decommissioning, transfer to a supplier or re-use;\nb) \tsecurely destroy all Nationwide Information stored on Hardware beyond recoverability in accordance with Information Handling and Management;\nc) \trender Hardware components capable of processing, storing or transmitting Nationwide Information unreadable in accordance with the Destruction Specification;\nd) \tincorporate steps to assess and handle destruction of damaged Hardware containing Nationwide Information;\ne) \tuse a certified information destruction supplier that has been procured in accordance with Supply Chain Management;\nf) \tbe supported by a record of individual component destruction and a certificate of destruction to reconcile with the asset inventory;\ng) \tupdate and maintain the related asset inventories to confirm decommission and disposal",
        "groups": "Group 1",
        "rationale": "As the organisation would not want this class of information to be accessed externally, additional steps are required to ensure that the information and in some cases the hardware are completely destroyed, beyond recovery. ",
        "roleResponsible": [
            "IT Support",
            "End User Services"
        ],
        "guidance": "Only Applicable if decommissioning Hardware else N/A",
        "mappings": {
            "NIST": [
                "PR.DS-1",
                "PR.DS-2",
                "PR.DS-3",
                "PR.DS-4",
                "PR.DS-5",
                "ID.AM-5"
            ]
        }
    },
    {
        "title": "Equipment Management",
        "id": "SCS-EQMGT-1.4.2",
        "description": "Nationwide IT Systems and Nationwide Information hosted within Cloud Service Providers must be securely destroyed through the confirmed deletion of encryption keys used to protect Nationwide Information, or overwriting of Nationwide Information, and verification of destruction must be obtained and recorded.",
        "groups": "Group 1",
        "rationale": "As the organisation would not want their assets to be accessed by other organisations or people, these steps in 1.4.2 are required to ensure that the information and in some cases the virtual hardware are completely destroyed, beyond recovery. ",
        "roleResponsible": [
            "Information Asset Owner",
            "Engineering"
        ],
        "guidance": "Only Applicable if decommissioning cloud service else N/A",
        "mappings": {
            "NIST": [
                "PR.DS-1",
                "PR.DS-2",
                "PR.DS-3",
                "PR.DS-4",
                "PR.DS-5",
                "ID.AM-5"
            ]
        }
    },
    {
        "title": "Equipment Management",
        "id": "SCS-EQMGT-1.4.3",
        "description": "Reviews of re-use procedures for encryption keys must be undertaken in accordance with Cryptography",
        "groups": "Group 1",
        "rationale": "To ensure that key re-use procedures are still relevant and appropriate and in line with the Cryptography control standards.",
        "roleResponsible": [
            "Information Asset Owner",
            "Engineering"
        ],
        "guidance": "Only Applicable if any exisitng encryption key is intended to be reused for another purpose else N/A",
        "mappings": {
            "NIST": [
                "PR.DS-1",
                "PR.DS-2",
                "PR.DS-3",
                "PR.DS-4",
                "PR.DS-5",
                "ID.AM-5"
            ]
        }
    },
    {
        "title": "Equipment Management",
        "id": "SCS-EQMGT-2.2.1",
        "description": "Build standards for Office Systems processing, storing or transmitting Nationwide Information must, as a minimum, ensure:\na) \tthe logical segregation of printing traffic on Nationwide IT Networks in accordance with Network Management;\nb) \tan audit trail of print and copy jobs is maintained;\nc) \tall unnecessary services and functions are removed or disabled;\nd) \tunauthorised removal of local media storage is prevented;\ne) \tauthorised printing services are configured in accordance with Information Handling and Management;\nf) \tdata loss prevention rules are enforced in accordance with Data Loss Prevention;\ng) \tprinting queues and network folders are cleared at the end of each working day;\nh) \tencryption for data in transit and at rest is utilised in accordance with Cryptography",
        "groups": "",
        "rationale": "This provides a consistent approach to build standards and lays out baseline security requirements that must be in place for this type of device to help prevent any confidentiality, integrity or availability issues occurring.",
        "roleResponsible": [
            "IT Custodian",
            "End User Services"
        ],
        "guidance": "",
        "mappings": {
            "NIST": [
                "PR.DS-1",
                "PR.DS-2",
                "PR.DS-3",
                "PR.DS-4",
                "PR.DS-5",
                "ID.AM-5"
            ]
        }
    },
    {
        "title": "Equipment Management",
        "id": "SCS-EQMGT-2.2.2",
        "description": "Build standards for Multi-Functional Devices (MFDs) processing, storing or transmitting Nationwide Information must adhere to the build standards for Office Systems and in addition ensure:\na) \taccess to authenticated users is restricted in accordance with Identity and Access Management;\nb) \taudit trails of authorised users and authentication events are maintained",
        "groups": "",
        "rationale": "Due to the extra capabilities of MFDs, further controls must be put in place around access management and audit trails.",
        "roleResponsible": [
            "IT Custodian",
            "End User Services"
        ],
        "guidance": "",
        "mappings": {
            "NIST": [
                "PR.DS-1",
                "PR.DS-2",
                "PR.DS-3",
                "PR.DS-4",
                "PR.DS-5",
                "ID.AM-5"
            ]
        }
    },
    {
        "title": "Equipment Management",
        "id": "SCS-EQMGT-3.1.1",
        "description": "ICS used for the support and maintenance of Nationwide IT Systems and/or Nationwide Premises must be: \na) \trecorded within an asset inventory;\nb) \tassigned an Information Asset Owner and IT Custodian;\nc) \tsupported by nominated points of contact from key suppliers and/or parties responsible for the maintenance of ICS equipment;\nd) \tsubject to an Information Security Risk Assessment at least annually or earlier in the event of material change or incident occurring to identify appropriate security controls based on the threats, vulnerabilities and impacts associated with the ICS purpose",
        "groups": "",
        "rationale": "Industrial Control Systems (ICS) assets  must be recorded and ownership, support and risks identified to ensure Nationwide can manage and maintain their oversight and security of these products.",
        "roleResponsible": [
            "IT Custodian",
            "Security & Resilience"
        ],
        "guidance": "",
        "mappings": {
            "NIST": [
                "PR.DS-1",
                "PR.DS-2",
                "PR.DS-3",
                "PR.DS-4",
                "PR.DS-5",
                "ID.AM-1",
                "ID.AM-5"
            ]
        }
    },
    {
        "title": "Operational Security",
        "id": "SCS-OPSEC-1.11",
        "description": "Responses to Cyber Threat Intelligence must utilise the Cyber Threat Response procedure (i.e. taking action to react to a threat and undertake risk response) and Security Incident Management procedure if a Security Incident has occurred by:\na) \tconfirming to the Security Function the actions undertaken and response to any relevant, disseminated Cyber Threat Intelligence;\nb) \tassessing and using the Cyber Threat Intelligence to inform decisions related to security risk;\nc) \tundertaking risk response and recording the response;\nd) \tconfirming whether mitigation activity has been completed",
        "groups": "",
        "rationale": "Formal procedures must be used so that cyber threat responses are recorded and tracked.",
        "roleResponsible": [
            "IT Custodian",
            "Relationship Manager/Owner",
            "IT Support"
        ],
        "guidance": "Project to check with SOC threat team to assess any activity required in relation to the change.",
        "mappings": {
            "NIST": [
                "PR.IP-7",
                "PR.IP-12",
                "RS.CO-2"
            ]
        }
    },
    {
        "title": "Operational Security",
        "id": "SCS-OPSEC-2.1",
        "description": "Anti-Malware solutions must be applied to:\na) \tall network boundary gateways and traffic entering and leaving the Nationwide IT Network including email messaging, collaboration platforms, business to business connections, and internet browsing gateways;\nb) \tnetwork boundaries with Cloud Service Providers;\nc) \tservers including applications, databases, file servers, print servers;\nd) \tsystems hosting dormant machine images, snapshots and backups;\ne) \tcontainers;\nf) \tEnd User Devices;\ng) \tany other Nationwide IT System that is commonly affected by malware",
        "groups": "Group 1",
        "rationale": "Anti-malware solutions provide protection in many instances against known malware and must be applied to all devices featured in 2.1",
        "roleResponsible": [
            "IT Custodian",
            "IT Support",
            "Security & Resilience"
        ],
        "guidance": "",
        "mappings": {
            "NIST": [
                "DE.CM-8",
                "DE.CM-4",
                "DE.CM-5",
                "DE.CM-6"
            ]
        }
    },
    {
        "title": "Operational Security",
        "id": "SCS-OPSEC-2.2",
        "description": "Procedures for Anti-Malware solutions must include:\na) \tmethods for installing and configuring Anti-Malware;\nb) \tmaintenance of Anti-Malware versions in accordance with Systems Maintenance;\nc) \tupdate mechanisms for malware signature definition files within 2 hours of vendor release;\nd) \tthe daily processes required to ensure Anti-Malware is effective;\ne) \tthe production of Management Information (MI) to evidence the effectiveness and coverage of Anti-Malware;\nf) \troles and responsibilities for Anti-Malware on Nationwide IT Systems",
        "groups": "Group 1",
        "rationale": "These procedures are required to maintain and monitor the health of the configured anti-malware solution.",
        "roleResponsible": [
            "IT Custodian",
            "IT Support",
            "Security & Resilience"
        ],
        "guidance": "",
        "mappings": {
            "NIST": [
                "DE.CM-8",
                "DE.CM-4",
                "DE.CM-5",
                "DE.CM-6"
            ]
        }
    },
    {
        "title": "Operational Security",
        "id": "SCS-OPSEC-2.3",
        "description": "Anti-Malware solutions must be supported by:\na) \tsecurity incident reporting procedures for end users and administrators;\nb) \tprocedures to monitor external threat intelligence sources to identify new and valid malware threats as part of Cyber Threat Intelligence aggregation;\nc) \tresponse and recovery playbooks to contain, eradicate and restore environments as a result of malware, including pre-determined decision points to isolate environments",
        "groups": "",
        "rationale": "Support and response processes must be in place to effectively manage, respond to and recover from security incidents detected by the anti-malware solution.",
        "roleResponsible": [
            "IT Custodian",
            "IT Support",
            "Security & Resilience"
        ],
        "guidance": "",
        "mappings": {
            "NIST": [
                "DE.CM-8",
                "DE.CM-4",
                "DE.CM-5",
                "DE.CM-6"
            ]
        }
    },
    {
        "title": "Operational Security",
        "id": "SCS-OPSEC-2.4",
        "description": "Anti-Malware solution configuration must: \na) \tbe in accordance with approved Build Standards;\nb) \tuse signature-based Anti-Malware for the detection of all types of malware;\nc) \tuse heuristics-based Anti-Malware to detect unusual or abnormal behaviour;\nd) \tbe active at all times and performed according to defined schedule;\ne) \tprovide an alert when:\ni.\tsuspected malware is identified;\nii.\ta scan has not taken place as expected;\niii.\tdefinitions have not updated as expected;\nf) \tdisable, quarantine and remove files suspected of containing malware upon detection, retaining malware samples to allow later analysis, where possible;\ng) \tbe applied to scan firmware, master boot records, protected files, and folders mounted/shared;\nh) \tbe supported by stable and effective agents;\ni) \tscan all Portable Storage Devices, Mobile Devices and Removable Media immediately upon loading or connection to a Nationwide IT System;\nj) \tscan each file upon accessing in real time as it is downloaded, opened, or executed;\nk) \tprevent unauthorised users from modifying or disabling Anti-Malware settings or software. ",
        "groups": "Group 1",
        "rationale": "The configuration of the anti-malware solution must meet the control standards identified in 2.4 so that Nationwide can be assured it's assets are protected as fully as possible by the anti-malware solution.",
        "roleResponsible": [
            "IT Custodian",
            "IT Support",
            "Security & Resilience"
        ],
        "guidance": "",
        "mappings": {
            "NIST": [
                "DE.CM-8",
                "DE.CM-4",
                "DE.CM-5",
                "DE.CM-6"
            ]
        }
    },
    {
        "title": "Operational Security",
        "id": "SCS-OPSEC-2.5",
        "description": "Exception processes for users and administrators requiring the temporary disablement of Anti-Malware software must:\na) \tlog a change request in accordance with Change Management;\nb) \tprovide justification for the exception;\nc) \tspecify the time period required for the exception;\nd) \tobtain authorisation from the IT Custodian and notify the Security Operations Centre Engineering;\ne) \tallow IT Operations to disable and re-enable Anti-Malware within the authorised and specified time period, with any changes to this time period requiring re-authorisation.",
        "groups": "Group 1",
        "rationale": "A formal change request needs to be carried out for any disablement (incl. re-enablement) of the anti-malware service so that Nationwide is not put at risk by unauthorised changes, leading to reduction of security controls.",
        "roleResponsible": [
            "IT Custodian",
            "IT Support",
            "Security & Resilience"
        ],
        "guidance": "",
        "mappings": {
            "NIST": [
                "DE.CM-8",
                "DE.CM-4",
                "DE.CM-5",
                "DE.CM-6"
            ]
        }
    },
    {
        "title": "Operational Security",
        "id": "SCS-OPSEC-2.6",
        "description": "End User Devices must be configured to reduce the risk of downloading malware in accordance with Systems Configuration",
        "groups": "Group 1",
        "rationale": "Additional configuration controls must be applied where possible to any endpoint devices to reduce the possibility of downloading malware.",
        "roleResponsible": [
            "IT Custodian",
            "IT Support",
            "Security & Resilience"
        ],
        "guidance": "",
        "mappings": {
            "NIST": [
                "DE.CM-8",
                "DE.CM-4",
                "DE.CM-5",
                "DE.CM-6"
            ]
        }
    },
    {
        "title": "Operational Security",
        "id": "SCS-OPSEC-2.7",
        "description": "Anti-Malware solutions must have their performance quantified and approved to ensure that the impact to system performance of Nationwide IT Systems is minimised to an acceptable level",
        "groups": "Group 1",
        "rationale": "Anti-malware solutions must be optimised (tuning process) from a performance point of view as well as configuration to ensure that there is no impact to Nationwide IT Systems.",
        "roleResponsible": [
            "IT Support",
            "Security & Resilience"
        ],
        "guidance": "",
        "mappings": {
            "NIST": [
                "DE.CM-8",
                "DE.CM-4",
                "DE.CM-5",
                "DE.CM-6"
            ]
        }
    },
    {
        "title": "Operational Security",
        "id": "SCS-OPSEC-2.8",
        "description": "Anti-Malware solutions must be continuously monitored and, in addition to virus alerts, generate performance alerts for the following events:\na) \tincomplete Anti-Malware coverage;\nb) \tdisabling of software;\nc) \tnon-adherence to defined configurations;\nd) \tunsuccessful application of signature files and updated rules within defined timescales",
        "groups": "Group 1",
        "rationale": "Key monitoring and alerting must be in place for anti-malware to identify infections and changes to the system that may be unexpected or unauthorised.",
        "roleResponsible": [
            "Security & Resilience"
        ],
        "guidance": "",
        "mappings": {
            "NIST": [
                "DE.CM-8",
                "DE.CM-4",
                "DE.CM-5",
                "DE.CM-6"
            ]
        }
    },
    {
        "title": "Operational Security",
        "id": "SCS-OPSEC-3.1",
        "description": "DLP solutions must be deployed for devices, Nationwide IT Systems and Nationwide IT Networks that create, process, store and transmit Nationwide Information classified as INTERNAL, CONFIDENTIAL or SECRET in accordance with Information Handling and Management.",
        "groups": "Group 2",
        "rationale": "Data Loss Prevention solutions must be put in place to protect Nationwide information being created, processed, stored or transmitted.",
        "roleResponsible": [
            "IT Support",
            "Security & Resilience"
        ],
        "guidance": "",
        "mappings": {
            "NIST": [
                "PR.DS-1",
                "PR.DS-2",
                "PR.DS-5",
                "PR.DS-6"
            ]
        }
    },
    {
        "title": "Operational Security",
        "id": "SCS-OPSEC-3.2",
        "description": "DLP solutions must be supported by documented procedures that are maintained in accordance with Change Management and defined use cases to detect when Nationwide Information classified as INTERNAL, CONFIDENTIAL or SECRET is both at risk of unauthorised disclosure and disclosed. This includes, but is not limited to, monitoring the use of:\na) \tapplications;\nb) \temail;\nc) \tcollaboration platforms;\nd) \ttelephony and VoIP communication services;\ne) \tweb browsers;\nf) \tPortable Storage Devices and Removable Media",
        "groups": "Group 2",
        "rationale": "3.2 identifies some of the services/systems that must have a DLP solution in place for protection of Nationwide Information.",
        "roleResponsible": [
            "IT Support",
            "Security & Resilience"
        ],
        "guidance": "",
        "mappings": {
            "NIST": [
                "PR.DS-1",
                "PR.DS-2",
                "PR.DS-5",
                "PR.DS-6"
            ]
        }
    },
    {
        "title": "Operational Security",
        "id": "SCS-OPSEC-3.3",
        "description": "DLP solutions must:\na) \tidentify Nationwide Information at risk of unauthorised disclosure through defined use cases, including, but not limited to:\ni.\tscanning databases, collaboration spaces, network folders and users’ local hard disk drives;\nii.\tmonitoring the sharing of Nationwide Information through egress routes and the public internet;\niii.\tmonitoring the printing of electronic Nationwide Information;\nb) \tbe configured using defined DLP rules approved by Risk Partners in accordance with Information Handling and Management;\nc) \tbe configured to scan Nationwide Information at rest on Nationwide IT Networks to identify Payment Card Industry data (e.g. Primary Account Numbers [PANs]) at risk of exposure to unauthorised individuals;\nd) \tbe capable of evaluating the context of Nationwide Information before identifying it as being at risk of disclosure or detected as having been disclosed to unauthorised parties during processing or transmission;\ne) \tinspect for and prevent the egress of Nationwide Information from Nationwide IT Networks in accordance with the rules configured, including at the following boundaries:\ni.\ton-premises to cloud;\nii.\tcorporate cloud to personal cloud;\niii.\tcloud to cloud.\nf) \talert, quarantine and remove Nationwide Information that is detected in an unauthorised location in accordance with DLP rules;\ng) \tbe updated and continuously refined to ensure their configuration covers Nationwide Information that needs to be protected.",
        "groups": "Group 2",
        "rationale": "These are the requirements that DLP solutions in Nationwide must be capable of performing. Identification, rule & data type configuration, scanning, contextualisation, alerting and quarantine are fundamental capabilities required by Nationwide to protect its information.",
        "roleResponsible": [
            "IT Support",
            "Security & Resilience"
        ],
        "guidance": "",
        "mappings": {
            "NIST": [
                "PR.DS-1",
                "PR.DS-2",
                "PR.DS-5",
                "PR.DS-6"
            ]
        }
    },
    {
        "title": "Operational Security",
        "id": "SCS-OPSEC-3.4",
        "description": "DLP solutions must have their performance quantified and approved to ensure that the impact on the performance of devices, Nationwide IT Systems and Nationwide IT Networks are minimised to an acceptable level",
        "groups": "Group 2",
        "rationale": "DLP solutions must be optimised from a performance point of view as well as configuration to ensure that there is no impact to Nationwide IT Systems.",
        "roleResponsible": [
            "IT Support",
            "Security & Resilience"
        ],
        "guidance": "",
        "mappings": {
            "NIST": [
                "PR.DS-1",
                "PR.DS-2",
                "PR.DS-5",
                "PR.DS-6"
            ]
        }
    },
    {
        "title": "Operational Security",
        "id": "SCS-OPSEC-3.5",
        "description": "DLP solutions must be reviewed:\na) \tat least monthly or earlier in the event of a material change or incident, including changes to network egress points, to:\ni.\thelp minimise the occurrence of false positives and false negatives;\nii.\tenable updates to the DLP rules in accordance with Information Handling and Management;\nb) \tat least annually to review the effectiveness of the deployed solutions, which must be reported to the Security and Data Governance Senior Leadership Team (SLT & DGLT) .",
        "groups": "Group 2",
        "rationale": "",
        "roleResponsible": [
            "IT Support",
            "Security & Resilience"
        ],
        "guidance": "",
        "mappings": {
            "NIST": [
                "PR.DS-1",
                "PR.DS-2",
                "PR.DS-5",
                "PR.DS-6"
            ]
        }
    },
    {
        "title": "Operational Security",
        "id": "SCS-OPSEC-4.1.1",
        "description": "Security Event Logging requirements for new and existing Nationwide IT Systems, inclusive of changes through the Systems Development Lifecycle, must be determined through:\na) \tthe application of Build Standards based on industry best practices and vendor recommendations (i.e. CIS benchmarks);\nb) \tadherence to all applicable legal, statutory or regulatory compliance obligations, inclusive of supporting forensic investigative capabilities in the event of a Security Incident;\nc) \tmeeting defined use cases arising from:\ni.\tThreat Modelling and an Information Security Risk Assessment for Tier 1 and Tier 2 Nationwide IT Systems;\nii.\tanalysis of common cyber-attack methodologies from the organisational threat model and using industry frameworks",
        "groups": "Group 2",
        "rationale": "Security event logging must be determined by aligning with the requirements in 4.1.1 so that Nationwide is able to detect any unexpected or unauthorised activity on its systems, infrastructure, network or data estates.",
        "roleResponsible": [
            "Information Asset Owner",
            "Security & Resilience"
        ],
        "guidance": "",
        "mappings": {
            "NIST": [
                "PR.PT-1",
                "PR.PT-3",
                "DE.AE-1",
                "DE.AE-2",
                "DE.AE-3",
                "DE.AE-4",
                "DE.AE-5"
            ]
        }
    },
    {
        "title": "Operational Security",
        "id": "SCS-OPSEC-4.1.2",
        "description": "All Security Event Log types must include:\na) \tdate and time stamps using an accurate time source in accordance with Network Management;\nb) \ttime zone (set to UTC);\nc) \tevent code;\nd) \tsource",
        "groups": "Group 2",
        "rationale": "These log types are required to accurately identify the source device/system etc. where the logs are being generated from.",
        "roleResponsible": [
            "IT Custodian"
        ],
        "guidance": "",
        "mappings": {
            "NIST": [
                "PR.PT-1",
                "PR.PT-3",
                "DE.AE-1",
                "DE.AE-2",
                "DE.AE-3",
                "DE.AE-4",
                "DE.AE-5"
            ]
        }
    },
    {
        "title": "Operational Security",
        "id": "SCS-OPSEC-4.1.3",
        "description": "In totality, the collection of Security Event Logs must include:\na) \tthe device identity or location if possible and the Nationwide IT System identifier;\nb) \tthe event that has occurred with attribution to an individual user or account;\nc) \tuse of privileged accounts and privileged access;\nd) \tchanges to user privilege;\ne) \tchanges to account credentials;\nf) \trecords of successful and rejected access or log-on attempts",
        "groups": "Group 2",
        "rationale": "These log types are required to accurately identify certain activities performed on devices/systems etc.",
        "roleResponsible": [
            "IT Custodian"
        ],
        "guidance": "",
        "mappings": {
            "NIST": [
                "PR.PT-1",
                "PR.PT-3",
                "DE.AE-1",
                "DE.AE-2",
                "DE.AE-3",
                "DE.AE-4",
                "DE.AE-5"
            ]
        }
    },
    {
        "title": "Operational Security",
        "id": "SCS-OPSEC-4.1.4",
        "description": "Minimum baseline security logging requirements for all Tiers of Nationwide IT Systems must be met in accordance with Appendix A: Baseline Security Logging Requirements for Protective Monitoring table in the Operational Security Standard",
        "groups": "Group 2",
        "rationale": "Please see Appendix A in the Operational Security Standard for the minimum baseline security logging requirements for all systems.",
        "roleResponsible": [
            "IT Custodian"
        ],
        "guidance": "",
        "mappings": {
            "NIST": [
                "PR.PT-1",
                "PR.PT-3",
                "DE.AE-1",
                "DE.AE-2",
                "DE.AE-3",
                "DE.AE-4",
                "DE.AE-5"
            ]
        }
    },
    {
        "title": "Operational Security",
        "id": "SCS-OPSEC-4.1.5",
        "description": "Database activity monitoring must be performed for all databases supporting Tier 1 and Tier 2 Nationwide IT Systems or where determined through Information Security Risk Assessment",
        "groups": "Group 2",
        "rationale": "Activity monitoring is a requirements so that activity performed on the database and the data can be logged and monitored - this ensures an audit trail of activity should it ever be required and early warning of unexpected activity.",
        "roleResponsible": [
            "IT Custodian"
        ],
        "guidance": "",
        "mappings": {
            "NIST": [
                "PR.PT-1",
                "PR.PT-3",
                "DE.AE-1",
                "DE.AE-2",
                "DE.AE-3",
                "DE.AE-4",
                "DE.AE-5"
            ]
        }
    },
    {
        "title": "Operational Security",
        "id": "SCS-OPSEC-4.1.6",
        "description": "Security Event Logging Procedures must:\na) \tidentify Nationwide IT Systems on which security event logging must be enabled to help identify security-related events;\nb) \trestrict access to Security Event Logs in source systems and Security Information and Event Management (SIEM) tools in accordance with Privileged Access Management;\nc) \tprotect the integrity of Security Event Logs and ensure they are tamper-proof;\nd) \tmonitor and alert on the capacity of log storage in accordance with Capacity Management;\ne) \tallocate sufficient storage capacity and maximum size allowances based on expected volumes of event information;\nf) \tensure Security Event Logs are retained in accordance with the Data Governance Policy and associated data retention schedules and for Forensic Readiness in accordance with Security Incident Management;\ng) \tenable changes to the status of logging (e.g. stopping, pausing or restarting logs) .",
        "groups": "Group 2",
        "rationale": "This is to ensure the confidentiality, integrity and availability of logs is maintained at all times.",
        "roleResponsible": [
            "IT Custodian"
        ],
        "guidance": "",
        "mappings": {
            "NIST": [
                "PR.PT-1",
                "PR.PT-3",
                "DE.AE-1",
                "DE.AE-2",
                "DE.AE-3",
                "DE.AE-4",
                "DE.AE-5"
            ]
        }
    },
    {
        "title": "Operational Security",
        "id": "SCS-OPSEC-4.1.7",
        "description": "Security Event Logs, inclusive of those within Cloud Service Provider environments, must utilise an accurate, synchronised and mutually agreed upon industry time source in accordance with Network Management",
        "groups": "Group 2",
        "rationale": "This is to ensure timestamps are accurate across the organisation.",
        "roleResponsible": [
            "IT Custodian"
        ],
        "guidance": "",
        "mappings": {
            "NIST": [
                "PR.PT-1",
                "PR.PT-3",
                "DE.AE-1",
                "DE.AE-2",
                "DE.AE-3",
                "DE.AE-4",
                "DE.AE-5"
            ]
        }
    },
    {
        "title": "Operational Security",
        "id": "SCS-OPSEC-4.1.8",
        "description": "Security Event Logs from Cloud Services must be available to support security operations, internal and external (including regulator) audits as defined within the Shared Responsibility Model for the Cloud Service Provider",
        "groups": "Group 2",
        "rationale": "Security event logs are required to be accessible to satisfy regulator (and other) requirements for auditing and other security operations.",
        "roleResponsible": [
            "IT Custodian"
        ],
        "guidance": "",
        "mappings": {
            "NIST": [
                "PR.PT-1",
                "PR.PT-3",
                "DE.AE-1",
                "DE.AE-2",
                "DE.AE-3",
                "DE.AE-4",
                "DE.AE-5"
            ]
        }
    },
    {
        "title": "Operational Security",
        "id": "SCS-OPSEC-4.1.9",
        "description": "Event Logs, inclusive of those related to security, must not contain unencrypted or clear text for the following information and data types in accordance with Data Security:\na) \tNationwide Information classified as SECRET;\nb) \tpersonal authentication information (e.g. passwords, passphrases, Personal Identification Numbers [PINs]);\nc) \tPayment Card Industry data (e.g. PANs);\nd) \tPersonally Identifiable Information (PII) or Sensitive Personal Information (SPI) unless approved by Data Owners",
        "groups": "Group 2",
        "rationale": "Including any of the identified data types in clear text is not permitted as it breaches regulations and legislation that Nationwide must meet, as well as Information Handling & Management control standards ",
        "roleResponsible": [
            "IT Custodian",
            "Change Squads"
        ],
        "guidance": "",
        "mappings": {
            "NIST": [
                "PR.PT-1",
                "PR.PT-3",
                "DE.AE-1",
                "DE.AE-2",
                "DE.AE-3",
                "DE.AE-4",
                "DE.AE-5"
            ]
        }
    },
    {
        "title": "Operational Security",
        "id": "SCS-OPSEC-4.1.10",
        "description": "Data Owners must provide Change Squads, Engineering and the Security Function with any additional data types, fields or values that should not be retained with event log files in accordance with Data Security",
        "groups": "Group 2",
        "rationale": "If there are other types of data that Data Owners consider as not appropriate for storing in logs it is their responsibility to identify this to the IT Custodian.",
        "roleResponsible": [
            "IT Custodian"
        ],
        "guidance": "",
        "mappings": {
            "NIST": [
                "PR.PT-1",
                "PR.PT-3",
                "DE.AE-1",
                "DE.AE-2",
                "DE.AE-3",
                "DE.AE-4",
                "DE.AE-5"
            ]
        }
    },
    {
        "title": "Operational Security",
        "id": "SCS-OPSEC-4.1.11",
        "description": "When obfuscation, tokenization or masking of Nationwide Information required for monitoring procedures and classified as INTERNAL, CONFIDENTIAL or SECRET within event logs cannot be achieved, compensating controls must be assessed and implemented through performance of an Information Security Risk Assessment",
        "groups": "Group 2",
        "rationale": "Other compensating controls must be put in place if internal, confidential or secret information cannot be avoided in logs - performance of an information security risk assessment must be carried out to identify options.",
        "roleResponsible": [
            "IT Custodian"
        ],
        "guidance": "",
        "mappings": {
            "NIST": [
                "PR.PT-1",
                "PR.PT-3",
                "DE.AE-1",
                "DE.AE-2",
                "DE.AE-3",
                "DE.AE-4",
                "DE.AE-5"
            ]
        }
    },
    {
        "title": "Operational Security",
        "id": "SCS-OPSEC-4.1.12",
        "description": "If Security Event Logs fail to arrive as expected from an agreed source to SIEM tools, an alert must be generated as defined within the use case(s), investigated and fixed",
        "groups": "Group 2",
        "rationale": "Alerting is required for when logs start failing to reach their destination so that this unexpected behaviour can be rectified or investigated.",
        "roleResponsible": [
            "IT Custodian"
        ],
        "guidance": "",
        "mappings": {
            "NIST": [
                "PR.PT-1",
                "PR.PT-3",
                "DE.AE-1",
                "DE.AE-2",
                "DE.AE-3",
                "DE.AE-4",
                "DE.AE-5"
            ]
        }
    },
    {
        "title": "Operational Security",
        "id": "SCS-OPSEC-4.2.1",
        "description": "A Security Event Management process must be established to identify, investigate and help respond to security-related events, which is supported by a Security Operations Centre (SOC) and updated at least annually. The process must include:\na) \tupdating Security Information and Event Management (SIEM) tools with indicators of compromise (IOCs) based on an assessment of the threat to Nationwide or received notifications/IOCs from governments and non-government sources;\nb) \tprocessing of key security-related events and applying a risk modifier to determine the urgency and prioritisation of events by considering as a minimum Asset Classification (i.e. Tier) and confidence level;\nc) \tintegration of Cyber Threat Intelligence;\nd) \tanalysis and interpretation of security-related events by competent analysts, to help identify unusual activity or anomalous behaviour, including analysis of the following:\ni.\texceptions identified through the use of predetermined rules;\nii.\tdistinguishing anomalous behaviour and abnormal network traffic from the baseline of known behaviour patterns and standard network traffic;\niii.\tresults of trend/pattern analysis;\niv.\tavailable Cyber Threat Intelligence;\nv.\tdetermining whether a security-related event(s) represents a Security Incident to be investigated.",
        "groups": "Group 1",
        "rationale": "A formal process is required to identify, investigate and respond to security related events so the organisation is prepared and capable of dealing with and identifying security events and incidents. The requirements related to this process are identified in 4.2.1 ",
        "roleResponsible": [
            "Security & Resilience"
        ],
        "guidance": "Project to check with SOC to assess any activity required in relation to the change.",
        "mappings": {
            "NIST": [
                "PR.PT-1",
                "PR.PT-3",
                "DE.AE-1",
                "DE.AE-2",
                "DE.AE-3",
                "DE.AE-4",
                "DE.AE-5"
            ]
        }
    },
    {
        "title": "Operational Security",
        "id": "SCS-OPSEC-4.2.2",
        "description": "The process for identifying use cases for Security Event Monitoring must be reviewed by the Security Function at least every 6 months or earlier to ensure it is effective and fit for purpose.",
        "groups": "Group 1",
        "rationale": "Use cases for identifying security event monitoring and the associated process should be reviewed on a 6 monthly basis minimum - to ensure the correct monitoring is in place for the Society's needs.",
        "roleResponsible": [
            "Security & Resilience"
        ],
        "guidance": "Project to check with SOC to assess any activity required in relation to the change.",
        "mappings": {
            "NIST": [
                "PR.PT-1",
                "PR.PT-3",
                "DE.AE-1",
                "DE.AE-2",
                "DE.AE-3",
                "DE.AE-4",
                "DE.AE-5"
            ]
        }
    },
    {
        "title": "Operational Security",
        "id": "SCS-OPSEC-4.2.3",
        "description": "The Security Operations Centre (SOC) must update the organisational threat profile based on Security Incidents, Cyber Threat Intelligence and any other internal and external sources",
        "groups": "Group 1",
        "rationale": "All relevant sources must be used to compile and assess the  organisation's threat profile to ensure it is as complete as possible.",
        "roleResponsible": [
            "Security & Resilience"
        ],
        "guidance": "Project to check with SOC to assess any activity required in relation to the change.",
        "mappings": {
            "NIST": [
                "DE.CM-7",
                "RS.CO-1",
                "RS.CO-2",
                "RS.CO-3",
                "RS.CO-4",
                "RS.CO-5"
            ]
        }
    },
    {
        "title": "Operational Security",
        "id": "SCS-OPSEC-4.2.4",
        "description": "All applicable Nationwide IT Systems, inclusive of SIEM tools, must be configured to ingest Cyber Threat Intelligence on an automated basis in accordance with industry best practice (e.g. via STIX) .",
        "groups": "Group 1",
        "rationale": "Automation of CTI information into systems enables precise and efficient information to be available at the earliest opportunity.",
        "roleResponsible": [
            "Security & Resilience"
        ],
        "guidance": "Project to check with SOC to assess any activity required in relation to the change.",
        "mappings": {
            "NIST": [
                "DE.CM-7",
                "RS.CO-1",
                "RS.CO-2",
                "RS.CO-3",
                "RS.CO-4",
                "RS.CO-5"
            ]
        }
    },
    {
        "title": "Operational Security",
        "id": "SCS-OPSEC-4.2.5",
        "description": "The use case methodology operated as part of the Systems Development Lifecycle must include the following as a minimum:\na) \twho is performing the use case;\nb) \twhat is the requirement and who owns the requirement;\nc) \twho is the risk owner;\nd) \twhen does the requirement apply;\ne) \twhat is the action(s) to be performed and contacts to respond;\nf) \twhat speed of response is required",
        "groups": "Group 1",
        "rationale": "Use case methodologies need to be a formal process to ensure consistency in use case development.",
        "roleResponsible": [
            "Security & Resilience"
        ],
        "guidance": "Project to check with SOC to assess any activity required in relation to the change.",
        "mappings": {
            "NIST": [
                "DE.CM-7",
                "RS.CO-1",
                "RS.CO-2",
                "RS.CO-3",
                "RS.CO-4",
                "RS.CO-5"
            ]
        }
    },
    {
        "title": "Operational Security",
        "id": "SCS-OPSEC-4.2.6",
        "description": "Use cases for Security Event Monitoring and the identification of Security Event Logs to be generated must be:\na) \tinformed by and developed using the organisational threat profile and recognised industry cyber-attack frameworks;\nb) \tinformed by and developed through Threat Modelling and an Information Security Risk Assessment for Nationwide IT Systems;\nc) \tvalidated to ensure the use case produces an accurate representation of expected activity or does not produce an unmanageable quantity of false positive alerts;\nd) \tassigned ownership at the point of definition of the use case;\ne) \tmaintained to ensure the accuracy, validity and effectiveness of the use case(s) through reviews at least annually or earlier in the event of material change or incident in accordance with Systems Maintenance;\nf) \tused to inform the Security Operations Centre’s (SOC) Cyber Playbooks that are updated at least annually or earlier in the event of material change or incident",
        "groups": "Group 1",
        "rationale": "Development and maintenance of use cases for event monitoring and event logs must be consistent with and make use of other available information, such as organisational threat profile, information security risk assessments. They must also be validated, checked for accuracy, updated/maintained and owned.",
        "roleResponsible": [
            "IT Custodian",
            "Change Squads"
        ],
        "guidance": "Project to follow the Use Case decisioning process.",
        "mappings": {
            "NIST": [
                "DE.CM-7",
                "RS.CO-1",
                "RS.CO-2",
                "RS.CO-3",
                "RS.CO-4",
                "RS.CO-5"
            ]
        }
    },
    {
        "title": "Operational Security",
        "id": "SCS-OPSEC-4.2.7",
        "description": "Nationwide’s Cyber Resilience, inclusive of response and recovery capability, must be:\na) \tdocumented in Cyber Playbooks that are informed by defined use cases and reviewed and updated at least annually;\nb) \texercised at least annually to test response and recovery plans in accordance with Business Continuity and Disaster Recovery processes",
        "groups": "Group 1",
        "rationale": "Documentation must be reviewed and updated and the capability tested to ensure the resilience capability performs as required.",
        "roleResponsible": [
            "Security & Resilience",
            "Operational Resilience"
        ],
        "guidance": "Project to check with SOC/BC to assess any activity required in relation to the change.",
        "mappings": {
            "NIST": [
                "DE.CM-7",
                "RS.CO-1",
                "RS.CO-2",
                "RS.CO-3",
                "RS.CO-4",
                "RS.CO-5"
            ]
        }
    },
    {
        "title": "Operational Security",
        "id": "SCS-OPSEC-4.2.8",
        "description": "Situational awareness must be maintained through the monitoring and integration of capabilities (technical and procedural as applicable) performing decentralised security monitoring on Nationwide IT Systems, inclusive of Cloud Services and supplier services, with Nationwide’s Security Event Management process",
        "groups": "Group 1",
        "rationale": "The organisation requires an estate wide understanding of it's security position - this requires a centralised event management process that takes feeds from other decentralised security monitoring functions and services.",
        "roleResponsible": [
            "Information Asset Owner"
        ],
        "guidance": "Project to ensure complaince if operating Decentralised Security monitoring else N/A",
        "mappings": {
            "NIST": [
                "DE.CM-7",
                "RS.CO-1",
                "RS.CO-2",
                "RS.CO-3",
                "RS.CO-4",
                "RS.CO-5"
            ]
        }
    },
    {
        "title": "Operational Security",
        "id": "SCS-OPSEC-4.2.9",
        "description": "Responsibility for incident command must be agreed and documented for decentralised security monitoring",
        "groups": "Group 1",
        "rationale": "Where security monitoring is not managed by security, incident roles and responsibilities must be agreed and documented so that each person/area knows the role they will play in the event of a security incident.",
        "roleResponsible": [
            "IT Custodian",
            "Relationship Manager/Owner",
            "Security & Resilience"
        ],
        "guidance": "Project to ensure compliance if operating Decentralised Security monitoring else N/A",
        "mappings": {
            "NIST": [
                "DE.CM-7",
                "RS.CO-1",
                "RS.CO-2",
                "RS.CO-3",
                "RS.CO-4",
                "RS.CO-5"
            ]
        }
    },
    {
        "title": "Operational Security",
        "id": "SCS-OPSEC-4.2.10",
        "description": "Security alerts and identified Security Incidents must be analysed, reported and managed in accordance with Security Incident Management irrespective of centralised or decentralised operation",
        "groups": "Group 1",
        "rationale": "A consistent approach must be used across the society for management of security incidents.",
        "roleResponsible": [
            "IT Custodian",
            "Relationship Manager/Owner",
            "Security & Resilience"
        ],
        "guidance": "",
        "mappings": {
            "NIST": [
                "DE.CM-7",
                "RS.CO-1",
                "RS.CO-2",
                "RS.CO-3",
                "RS.CO-4",
                "RS.CO-5"
            ]
        }
    },
    {
        "title": "Operational Security",
        "id": "SCS-OPSEC-5.1.1",
        "description": "Methodologies for the assessment and management of technical vulnerabilities identified through vulnerability scanning and build compliance configuration must be defined",
        "groups": "Group 1",
        "rationale": "A defined approach will ensure that all technical vulnerabilities can be assessed and managed in a consistent manner.",
        "roleResponsible": [
            "IT Custodian"
        ],
        "guidance": "Project to check with Vulnerability Management Team to assess any activity required in relation to the change.",
        "mappings": {
            "NIST": [
                "DE.CM-7",
                "RS.CO-1",
                "RS.CO-2",
                "RS.CO-3",
                "RS.CO-4",
                "RS.CO-5"
            ]
        }
    },
    {
        "title": "Operational Security",
        "id": "SCS-OPSEC-5.1.2",
        "description": "The Technical Vulnerability Management process for Nationwide-owned or managed applications and Mobile Devices, Nationwide IT Systems, Nationwide IT Networks, and Cloud Service Provider environments must:\na) \tidentify information sources for relevant technical vulnerabilities related to the software and hardware utilised within Nationwide based on the Society’s asset inventories;\nb) \timplement procedures to maintain currency of the sources based on new technologies introduced as part of the Systems Development Lifecyle or Change Management;\nc) \tidentify processes and technologies for vulnerability identification and assessment;\nd) \tscan for specific, identified technical vulnerabilities via automated scanning tools;\ne) \tspecify remediation procedures, prioritisation and timescales for technical vulnerabilities;\nf) \tdetermine the extent to which they are exposed to threats;\ng) \tidentify whether they will be affected by specific vulnerabilities and if so, how;\nh) \toperate continuously;\ni) \tprovide escalation criteria and response plans for newly discovered and critical vulnerabilities; \nj) \tvalidate the successful implementation of remediation performed (i.e. closed loop);\nk) \tbe aligned with Security Incident Management activities to communicate information on vulnerabilities to the Incident Response Function and provide technical procedures to be carried out in the event of a Security Incident occurring;\nl) \tmaintain an audit log for all procedures undertaken",
        "groups": "Group 1",
        "rationale": "TVM requires a consistent approach for the full lifecycle of TVM and integration with other security functions and processes within the organisation as laid out in 5.1.2. Full TVM will enable vulnerabilities to be identified and managed to conclusion as early as possible, ensuring Nationwide maintains the security of it's systems, infrastructure, network and data.",
        "roleResponsible": [
            "Change Squads",
            "Security & Resilience"
        ],
        "guidance": "Project to check with Vulnerability Management Team to assess any activity required in relation to the change.",
        "mappings": {
            "NIST": [
                "RS.AN-1",
                "RS.AN-2",
                "DE.CM-8",
                "DE.DP-2",
                "DE.DP-3",
                "DE.DP-4"
            ]
        }
    },
    {
        "title": "Operational Security",
        "id": "SCS-OPSEC-5.1.3",
        "description": "Change Squads must define and establish the roles and responsibilities associated with Technical Vulnerability Management for their Nationwide IT Systems, including: \na) \tvulnerability monitoring;\nb) \tremediation prioritisation;\nc) \tpatching in accordance with Systems Maintenance;\nd) \tasset tracking;\ne) \tany coordination responsibilities required;\nf) \tcommunication of pertinent Management Information (MI) and reporting to the Technical Vulnerability Authority (TVA) for governance and oversight purposes",
        "groups": "Group 1",
        "rationale": "To ensure that information related to systems, infrastructure, network and data are tracked and mitigation or risk acceptance is performed as required - this is to ensure systems are hardened where vulnerabilities have been identified or risk accepted where additional controls are in place.",
        "roleResponsible": [
            "Change Squads"
        ],
        "guidance": "",
        "mappings": {
            "NIST": [
                "RS.AN-1",
                "RS.AN-2",
                "DE.CM-8",
                "DE.DP-2",
                "DE.DP-3",
                "DE.DP-4"
            ]
        }
    },
    {
        "title": "Operational Security",
        "id": "SCS-OPSEC-5.1.4",
        "description": "Roles and responsibilities, associated procedures, and remediation timescales for the management of technical vulnerabilities within PaaS and IaaS cloud services must be documented as part of the Shared Responsibility Model defined within the supplier contract in accordance with Supply Chain Management",
        "groups": "Group 1",
        "rationale": "Roles and responsibilities with regards to vulnerability management within IaaS and PaaS cloud services must be documented to ensure each organisation fully understands and is prepared for the role they will play.",
        "roleResponsible": [
            "Relationship Manager/Owner"
        ],
        "guidance": "",
        "mappings": {
            "NIST": [
                "RS.AN-1",
                "RS.AN-2",
                "DE.CM-8",
                "DE.DP-2",
                "DE.DP-3",
                "DE.DP-4"
            ]
        }
    },
    {
        "title": "Operational Security",
        "id": "SCS-OPSEC-5.1.5",
        "description": "Technical vulnerability scanning to identify technical vulnerabilities within Nationwide IT Networks, hosted applications, Nationwide IT Systems, network devices, virtualisation technologies and containers must:\na) \tutilise authenticated scanning for internal network vulnerability discovery;\nb) \tuse automated vulnerability scanning software or a commercial vulnerability scanning service;\nc) \tincorporate Cyber Threat Intelligence and Asset Classification to prioritise vulnerability remediation;\nd) \tbe performed:\ni.\tevery 24 hours on all external internet facing and boundary proxy devices for Nationwide IT Networks;\nii.\tat least every 7 days or earlier in the event of material change for devices within internal Nationwide IT Network segments and PaaS and IaaS environments as contractually agreed within the Shared Responsibility Model",
        "groups": "Group 1",
        "rationale": "To enable the required focus and most appropriate level of scanning the requirements in 5.1.5 must be aligned to.",
        "roleResponsible": [
            "Relationship Manager/Owner",
            "Security & Resilience"
        ],
        "guidance": "Project to check with Vulnerability Management Team to assess any activity required in relation to the change.",
        "mappings": {
            "NIST": [
                "RS.AN-1",
                "RS.AN-2",
                "DE.CM-8",
                "DE.DP-2",
                "DE.DP-3",
                "DE.DP-4"
            ]
        }
    },
    {
        "title": "Operational Security",
        "id": "SCS-OPSEC-5.1.6",
        "description": "Technical vulnerability scanning tools and services must be:\na) \trestricted to authorised and competent individuals in accordance with Privileged Access Management;\nb) \tcapable of updating CVE libraries on a regular basis;\nc) \tperformed using approved and dedicated Nationwide IT Systems and Approved Scanning Vendors (ASV) for external scans;\nd) \tmonitored for misuse in accordance with Logging and Monitoring",
        "groups": "Group 1",
        "rationale": "Approved TVM tooling must only be used by authorised and competent individuals and use of them logged and monitored.",
        "roleResponsible": [
            "Security & Resilience"
        ],
        "guidance": "Project to check with Vulnerability Management Team to assess any activity required in relation to the change.",
        "mappings": {
            "NIST": [
                "RS.AN-1",
                "RS.AN-2",
                "DE.CM-8",
                "DE.DP-2",
                "DE.DP-3",
                "DE.DP-4"
            ]
        }
    },
    {
        "title": "Operational Security",
        "id": "SCS-OPSEC-5.1.7",
        "description": "Web application vulnerability scanning must:\na) \tutilise authenticated scanning of web applications;\nb) \tbe conducted regularly for internet facing applications on at least an annual basis;\nc) \tidentify technical vulnerabilities for risk response in accordance with Information Security Risk Assessment",
        "groups": "Group 1",
        "rationale": "Specific requirements for Web application vulnerability scanning, ensuring appropriate frequency, scan type and identification of vulnerabilities.",
        "roleResponsible": [
            "Security & Resilience"
        ],
        "guidance": "Project to check with Vulnerability Management Team to assess any activity required in relation to the change.",
        "mappings": {
            "NIST": [
                "RS.AN-1",
                "RS.AN-2",
                "DE.CM-8",
                "DE.DP-2",
                "DE.DP-3",
                "DE.DP-4"
            ]
        }
    },
    {
        "title": "Operational Security",
        "id": "SCS-OPSEC-5.1.8",
        "description": "Static and dynamic analysis tools and services must:\na) \tbe securely configured in accordance with Systems Configuration;\nb) \tbe capable of protecting against top vulnerabilities in accordance with Open Web Application Security Project (OWASP), or equivalent best practice advice, and cloud equivalent vulnerability awareness guidance;\nc) \tcapable of updating Common Weakness Enumeration (CWE) libraries on a regular basis",
        "groups": "Group 1",
        "rationale": "Code testing tools must be capable of secure configuration, protecting and detecting against known and common vulnerabilities as advised in guidance concerning the technology being used - the tools also need to be updated regularly with vulnerability libraries.",
        "roleResponsible": [
            "Security & Resilience"
        ],
        "guidance": "Project to ensure compliance if selecting new tool else evidence use of corporate approved tool.",
        "mappings": {
            "NIST": [
                "RS.AN-1",
                "RS.AN-2",
                "DE.CM-8",
                "DE.DP-2",
                "DE.DP-3",
                "DE.DP-4"
            ]
        }
    },
    {
        "title": "Operational Security",
        "id": "SCS-OPSEC-5.1.9",
        "description": "All findings identified during vulnerability scanning and build compliance configuration must:\na) \tbe applied a severity and prioritisation rating in accordance with the Technical Vulnerability Authority (TVA) that includes consideration for:\ni.\timpacted asset value and network placement;\nii.\tcurrent exploits, Cyber Threat Intelligence and threat actor capabilities;\niii.\tcompensating controls and control effectiveness;\nb) \tbe remediated within the timescales provided by the TVA based on the categorisation of the vulnerability;\nc) \tbe remediated in accordance with b) prior to promoting the Nationwide IT System into the production environment if the vulnerability is rated as medium or above;\nd) \tbe assessed and risk accepted by the Information Asset Owner if not mitigated prior to promoting the Nationwide IT System into the production environment or if detected within an existing production environment;\ne) \tbe re-tested following corrective actions to verify successful remediation",
        "groups": "Group 1",
        "rationale": "To ensure that vulnerabilities are identified are classified and prioritised according to the system's impact to Nationwide and the appropriate action relating to them is taken to protect Nationwide and its systems, infrastructure, network and data the requirements in 5.1.9 must be met.",
        "roleResponsible": [
            "Change Squads",
            "Engineering"
        ],
        "guidance": "",
        "mappings": {
            "NIST": [
                "RS.AN-1",
                "RS.AN-2",
                "DE.CM-8",
                "DE.DP-2",
                "DE.DP-3",
                "DE.DP-4"
            ]
        }
    },
    {
        "title": "Operational Security",
        "id": "SCS-OPSEC-5.1.10",
        "description": "Technical vulnerabilities must be subject to risk response in accordance with the severity ratings applied by the Technical Vulnerability Authority (TVA):\n•\tCritical – within 3 days;\n•\tHigh – within 15 days;\n•\tMed – within 90 days;\n•\tLow – within 180 days",
        "groups": "Group 1",
        "rationale": "Response to vulnerabilities must be carried out within the timescales related to the criticality of the vulnerability.",
        "roleResponsible": [
            "Information Asset Owner",
            "IT Support",
            "Change Squads"
        ],
        "guidance": "",
        "mappings": {
            "NIST": [
                "RS.AN-1",
                "RS.AN-2",
                "DE.CM-8",
                "DE.DP-2",
                "DE.DP-3",
                "DE.DP-4"
            ]
        }
    },
    {
        "title": "Operational Security",
        "id": "SCS-OPSEC-5.1.11",
        "description": "Technical vulnerabilities that cannot be patched or remediated through a configuration control, must be assessed for compensating controls and residual risk exposure. Vulnerabilities with a residual risk of medium or above must be formally risk accepted by the Information Asset Owner and IT Custodian and recorded",
        "groups": "Group 1",
        "rationale": "To ensure that a vulnerability that can't be mitigated through technical means or patching is fully understood and whether current or new compensating controls reduce the risk in any way. If not the risk must be acknowledged and accepted by the asset owner and logged.",
        "roleResponsible": [
            "Information Asset Owner",
            "IT Support",
            "Change Squads"
        ],
        "guidance": "",
        "mappings": {
            "NIST": [
                "RS.AN-1",
                "RS.AN-2",
                "DE.CM-8",
                "DE.DP-2",
                "DE.DP-3",
                "DE.DP-4"
            ]
        }
    },
    {
        "title": "Operational Security",
        "id": "SCS-OPSEC-5.1.12",
        "description": "Suppliers that are managing and remediating technical vulnerabilities for Tier 1 and Tier 2 Nationwide IT Systems or handling Nationwide Information classified as SECRET or CONFIDENTIAL and/or within the scope of the Payment Card Industry Data Security Standard (PCI-DSS) must confirm remediation of technical vulnerabilities to meet their Service Level Agreement(s) (SLA) in accordance with Supply Chain Management. Confirmation can be provided through certification to industry frameworks inclusive of Cyber Essentials Plus",
        "groups": "Group 1",
        "rationale": "This concerns vulnerabilities associated with Nationwide's most critical systems and/or data, which requires controls and evidence around the mediation within SLAs.",
        "roleResponsible": [
            "Information Asset Owner",
            "IT Support",
            "Change Squads"
        ],
        "guidance": "",
        "mappings": {
            "NIST": [
                "RS.AN-1",
                "RS.AN-2",
                "DE.CM-8",
                "DE.DP-2",
                "DE.DP-3",
                "DE.DP-4"
            ]
        }
    },
    {
        "title": "Operational Security",
        "id": "SCS-OPSEC-5.1.13",
        "description": "Cyber Threat Response (i.e. taking action to react to a threat and undertake risk response) and technical vulnerability response procedures must:\na) \ttriage responses to identified technical vulnerabilities where there is no suitable countermeasure (for example, patch or configuration change) or risk response timescales cannot be achieved within risk appetite;\nb) \tprovide pre-defined escalation routes;\nc) \ttest response and recovery capabilities as part of Cyber Playbooks; \nd) \tnotify suppliers within the supply chain of technical vulnerabilities that may impact services connecting with Nationwide IT Networks, Nationwide IT Systems, or those processing, transmitting or storing Nationwide Information. \ne) \tmake emergency amendments to processes or technology in accordance with Emergency Fixes and Security Incident Management",
        "groups": "Group 1",
        "rationale": "Cyber threat and TVM responses must align with the control standards in 5.1.13 to ensure that Nationwide can respond to any occasion where the unmitigated vulnerabilities are exploited which includes communication with suppliers as appropriate and amendments to processes or technology being used across the organisation.",
        "roleResponsible": [
            "Security & Resilience"
        ],
        "guidance": "",
        "mappings": {
            "NIST": [
                "RS.AN-1",
                "RS.AN-2",
                "DE.CM-8",
                "DE.DP-2",
                "DE.DP-3",
                "DE.DP-4"
            ]
        }
    },
    {
        "title": "Operational Security",
        "id": "SCS-OPSEC-5.2.1",
        "description": "Methodologies for the assessment and management of technical vulnerabilities identified through penetration testing and Red Team testing must be defined",
        "groups": "Group 2",
        "rationale": "A defined approach will ensure that all technical vulnerabilities can be assessed and managed in a consistent manner.",
        "roleResponsible": [
            "IT Custodian"
        ],
        "guidance": "Project to check with Technical Security Testing Team to assess any activity required in relation to the change.",
        "mappings": {
            "NIST": [
                "RS.AN-1",
                "RS.AN-2",
                "DE.CM-8",
                "DE.DP-2",
                "DE.DP-3",
                "DE.DP-4"
            ]
        }
    },
    {
        "title": "Operational Security",
        "id": "SCS-OPSEC-5.2.2",
        "description": "The Nationwide penetration testing methodology must:\na) \tbe based on industry-accepted penetration testing approaches (e.g. NIST SP800-115);\nb) \tinclude physical and social engineering techniques where possible;\nc) \tbe aligned to and incorporate Cyber Threat Intelligence, technical vulnerabilities and Security Incidents experienced during the last 12 months;\nd) \tdefine the scoping approach for penetration tests;\ne) \tcategorise findings according to severity ratings (including exploitability and threat actor capabilities), provide a root cause categorisation, and assign remediation timescales;\nf) \tdefine procedures for tracking risk response and re-testing requirements to validate any remediation has been successfully applied;\ng) \tspecify retention timescales for findings identified from penetration testing and outcomes from remediation activities;\nh) \trequire testing to be undertaken by competent individuals that are independent of Nationwide IT System or Nationwide IT Network design, build or operation",
        "groups": "Group 2",
        "rationale": "Penetration testing requires a consistent approach for the full lifecycle and integration with other security functions and processes within the organisation as laid out in 5.2.2. The consistent, industry accepted approach will enable vulnerabilities to be identified and managed to conclusion as early as possible, ensuring Nationwide maintains the security of it's systems, infrastructure, network and data.",
        "roleResponsible": [
            "Security & Resilience"
        ],
        "guidance": "Project to check with Technical Security Testing Team to assess any activity required in relation to the change.",
        "mappings": {
            "NIST": [
                "RS.AN-1",
                "RS.AN-2",
                "DE.CM-8",
                "DE.DP-2",
                "DE.DP-3",
                "DE.DP-4"
            ]
        }
    },
    {
        "title": "Operational Security",
        "id": "SCS-OPSEC-5.2.3",
        "description": "Penetration testing for Web Applications, Mobile Applications and Application Programming Interfaces (APIs) must be performed in accordance with the below table, where the time is measured from the date of the previous penetration test (regardless of whether this is performed as per the tabulated cycle or following a material change), and in line with applicable compliance obligations:\n - Tier 1: Manual Penetration Testing every 2 years, reduced to every 3 years if static & dynamic code analysis and authenticated continous web application vlunerability scanning is in place\n - Tier 2: Manual Penetration Testing every 3 years, reduced to every 4 years if static & dynamic code analysis and authenticated continous web application vlunerability scanning is in place\n - Tier 3: Static & dynamic code analysis must be undertaken\n - Tier 4: Static & dynamic code analysis must be undertaken\n\n - ALL Tiers: Manual code inspection must be performed as a compensating control within Systems Development Lifecycle if static and dynamic testing cannot be performed",
        "groups": "Group 2",
        "rationale": "Specific guidelines for each Security Tier of Nationwide systems, defining the minimum requirement for this type of system to ensure that the highest security Tier systems are tested to an appropriate frequency.",
        "roleResponsible": [
            "IT Custodian"
        ],
        "guidance": "Project to check with Technical Security Testing Team to assess any activity required in relation to the change.",
        "mappings": {
            "NIST": [
                "RS.AN-1",
                "RS.AN-2",
                "DE.CM-8",
                "DE.DP-2",
                "DE.DP-3",
                "DE.DP-4"
            ]
        }
    },
    {
        "title": "Operational Security",
        "id": "SCS-OPSEC-5.2.4",
        "description": "Penetration testing of Nationwide IT Systems and the Nationwide IT Network must be performed:\na) \tannually from both inside and outside of the Nationwide IT Network to cover the entire perimeter of the Nationwide IT Network, inclusive of Nationwide IT Systems and Nationwide IT Networks hosted in Cloud Service Provider environments in accordance with the Shared Responsibility Model;\nb) \tannually to ensure defined network segmentation in accordance with Nationwide IT Network Zones and inter-zones are operational and effective, and to ensure compliance with legal, regulatory and contractual requirements;\nc) \tin accordance with the below table for Nationwide IT Systems based on their Asset Classification and supporting technical vulnerability assessment procedures, where the time is measured from the date of the previous penetration test (regardless of whether this is performed as per the tabulated cycle or following a material change), and in line with applicable compliance obligations:\n - Tier 1: Manual Penetration Testing every 2 years, reduced to every 3 years if vulnerability scanning (authenticated) is performed\n - Tier 2: Manual Penetration Testing every 2 years, reduced to every 4 years if vulnerability scanning (authenticated) is performed\n - Tier 3: Vulnerability scanning (authenticated) must be undertaken\n - Tier 4: Vulnerability scanning (authenticated) must be undertaken\n\n - ALL Tiers: Unauthenticated vulnerability scanning must be performed as a compensating control if authenticated scanning cannot be technically achieved.",
        "groups": "Group 2",
        "rationale": "Specific guidelines for each Security Tier of Nationwide systems, defining the minimum requirement for this type of system to ensure that the highest security Tier systems are tested to an appropriate frequency.",
        "roleResponsible": [
            "IT Custodian"
        ],
        "guidance": "Project to check with Technical Security Testing Team to assess any activity required in relation to the change.",
        "mappings": {
            "NIST": [
                "RS.AN-1",
                "RS.AN-2",
                "DE.CM-8",
                "DE.DP-2",
                "DE.DP-3",
                "DE.DP-4"
            ]
        }
    },
    {
        "title": "Operational Security",
        "id": "SCS-OPSEC-5.2.5",
        "description": "Penetration testing of Nationwide IT Systems hosted within Cloud Service Provider environments must be performed in accordance with the below table, where the time is measured from the date of the previous penetration test (regardless of whether this is performed as per the tabulated cycle or following a material change), and in line with applicable compliance obligations:\n - Tier 1: Static & dynamic code analysis, regular authenticated web application vulnerability scanning and also manual Penetration Testing every 3 years\n - Tier 2: Static & dynamic code analysis, regular authenticated web application vulnerability scanning and also manual Penetration Testing every 4 years\n - Tier 3: Static & dynamic code analysis must be undertaken\n - Tier 4: Static & dynamic code analysis must be undertaken\n\n - ALL Tiers: Manual code inspection must be performed as a compensating control within Systems Development Lifecycle if static and dynamic testing cannot be performed",
        "groups": "Group 2",
        "rationale": "Specific guidelines for each Security Tier of Nationwide systems, defining the minimum requirement for this type of system to ensure that the highest security Tier systems are tested to an appropriate frequency.",
        "roleResponsible": [
            "IT Custodian"
        ],
        "guidance": "Project to check with Technical Security Testing Team to assess any activity required in relation to the change.",
        "mappings": {
            "NIST": [
                "RS.AN-1",
                "RS.AN-2",
                "DE.CM-8",
                "DE.DP-2",
                "DE.DP-3",
                "DE.DP-4"
            ]
        }
    },
    {
        "title": "Operational Security",
        "id": "SCS-OPSEC-5.2.6",
        "description": "Technical vulnerabilities identified during penetration testing must be remediated or risk managed, and testing repeated to verify the remediation in accordance with Technical Vulnerability Management",
        "groups": "Group 2",
        "rationale": "These courses of actions ensure that vulnerabilities identified receive acknowledgement and appropriate treatment in line with TVM control standards.",
        "roleResponsible": [
            "IT Custodian"
        ],
        "guidance": "Project to contact Technical Security Testing Team to agree pentest and scope.",
        "mappings": {
            "NIST": [
                "RS.AN-1",
                "RS.AN-2",
                "DE.CM-8",
                "DE.DP-2",
                "DE.DP-3",
                "DE.DP-4"
            ]
        }
    },
    {
        "title": "Operational Security",
        "id": "SCS-OPSEC-5.2.7",
        "description": "Red Team testing schedules must be developed and executed utilising:\na) \tthe receipt of relevant Cyber Threat intelligence;\nb) \tscenarios identified within the organisational threat profile;\nc) \tthreat models developed for Tier 1 for Nationwide IT Systems;\nd) \timprovements to controls as part of business and technology change, including those controls introduced as part of the Security Programme",
        "groups": "Group 2",
        "rationale": "Red team testing should be based on the requirements laid out in 5.2.7 so that focused testing can take place for the key systems of Nationwide, in line with CTI and threat profiling.",
        "roleResponsible": [
            "Information Asset Owner",
            "Change Squads",
            "Security & Resilience"
        ],
        "guidance": "Project to check with Technical Security Testing Team to assess any activity required in relation to the change.",
        "mappings": {
            "NIST": [
                "RS.AN-1",
                "RS.AN-2",
                "DE.CM-8",
                "DE.DP-2",
                "DE.DP-3",
                "DE.DP-4"
            ]
        }
    },
    {
        "title": "Operational Security",
        "id": "SCS-OPSEC-5.2.8",
        "description": "Red Team testing preparation and execution processes must:\na) \tclearly define the objectives and threat actors for the scenarios in accordance with the organisational and/or asset threat profiles;\nb) \tinclude evaluation of security behaviours, processes and technology within the scope of assessment;\nc) \tassess capabilities to identify, prevent, detect, recover and respond as per the scope of assessment that is specified during the testing objectives;\nd) \tprovide assessment of the effectiveness of controls during testing;\ne) \treport any control improvements or recommendations;\nf) \tspecify where test objectives are achieved",
        "groups": "Group 2",
        "rationale": "A defined and consistent approach will ensure that all red team exercises can be planned, scoped and provide assessment and reporting of controls.",
        "roleResponsible": [
            "Information Asset Owner",
            "Change Squads",
            "Security & Resilience"
        ],
        "guidance": "Project to check with Technical Security Testing Team to assess any activity required in relation to the change.",
        "mappings": {
            "NIST": [
                "RS.AN-1",
                "RS.AN-2",
                "DE.CM-8",
                "DE.DP-2",
                "DE.DP-3",
                "DE.DP-4"
            ]
        }
    },
    {
        "title": "Operational Security",
        "id": "SCS-OPSEC-5.2.9",
        "description": "Red Team results and control improvements must be:\na) \treported to Business Service Line (BSL) Owners and/or Information Asset Owners as appropriate;\nb) \tassessed or aligned where applicable with the Security Programme and strategic initiatives;\nc) \ttracked via risk response",
        "groups": "Group 2",
        "rationale": "Red team testing results must be shared with BSL owners and Asset owners and aligned with security programme and strategic initiatives, tracked for awareness and management by the appropriate individuals.",
        "roleResponsible": [
            "Information Asset Owner",
            "Change Squads",
            "Security & Resilience"
        ],
        "guidance": "Project to check with Technical Security Testing Team to assess any activity required in relation to the change.",
        "mappings": {
            "NIST": [
                "RS.AN-1",
                "RS.AN-2",
                "DE.CM-8",
                "DE.DP-2",
                "DE.DP-3",
                "DE.DP-4"
            ]
        }
    },
    {
        "title": "Operational Security",
        "id": "SCS-OPSEC-5.2.10",
        "description": "All findings identified during security testing must:\na) \tbe applied a severity and prioritisation rating in accordance with the Technical Vulnerability Authority (TVA) that includes consideration for:\ni.\timpacted asset value and network placement;\nii.\tcurrent exploits, Cyber Threat Intelligence and threat actor capabilities;\niii.\tcompensating controls and control effectiveness;\nb) \tbe remediated within the timescales provided by the TVA based on the categorisation of the vulnerability;\nc) \tbe remediated prior to promoting the Nationwide IT System into the production environment if the vulnerability is rated as high or medium;\nd) \tbe assessed and risk accepted by the Information Asset Owner if not mitigated prior to promoting the Nationwide IT System into the production environment or if detected within an existing production environment;\ne) \tbe re-tested following corrective actions to verify successful remediation",
        "groups": "Group 2",
        "rationale": "To ensure that vulnerabilities are identified are classified and prioritised according to the system's impact to Nationwide and the appropriate action relating to them is taken to protect Nationwide and its systems, infrastructure, network and data the requirements in 5.2.10 must be met.",
        "roleResponsible": [
            "Change Squads",
            "Engineering"
        ],
        "guidance": "",
        "mappings": {
            "NIST": [
                "RS.AN-1",
                "RS.AN-2",
                "DE.CM-8",
                "DE.DP-2",
                "DE.DP-3",
                "DE.DP-4"
            ]
        }
    },
    {
        "title": "Operational Security",
        "id": "SCS-OPSEC-5.2.11",
        "description": "Results from security testing must be used to update or create new Cyber Playbooks in accordance with Business Continuity Management.",
        "groups": "Group 2",
        "rationale": "To ensure Nationwide is fully equipped and ready to respond to incidents where the identified vulnerabilities are exploited.",
        "roleResponsible": [
            "Information Asset Owner",
            "Change Squads",
            "Security & Resilience"
        ],
        "guidance": "Project to check with Business Contingency if any impacts as a result of this change output.",
        "mappings": {
            "NIST": [
                "RS.AN-1",
                "RS.AN-2",
                "DE.CM-8",
                "DE.DP-2",
                "DE.DP-3",
                "DE.DP-4"
            ]
        }
    },
    {
        "title": "Electronic Communications",
        "id": "SCS-ECOMMS-1.2.5",
        "description": "Employees and contingent workers within an exception group for internet browsing must be recertified in accordance with Identity and Access Management",
        "groups": "Group 2",
        "rationale": "Recertification is required for employees and contingent workers accessing websites through an exception to ensure the access is still required and appropriate.",
        "roleResponsible": [
            "Information Asset Owner",
            "Security & Resilience"
        ],
        "guidance": "If implementing new exception group, project to contact Logical Access Team to ensure its added to the recert list.",
        "mappings": {
            "NIST": [
                "PR.AC-4"
            ]
        }
    },
    {
        "title": "Systems Configuration",
        "id": "SCS-SYSCONF-1.4",
        "description": "Technical platforms and infrastructure for Nationwide IT Systems must be configured in accordance with the defined Build Standard using standardised build images, templates and automated orchestration.",
        "groups": "Group 1",
        "rationale": "This configuration approach leads to efficient and consistent build processes.",
        "roleResponsible": [
            "IT Support",
            "Engineering"
        ],
        "guidance": "",
        "mappings": {
            "NIST": [
                "PR.IP-1",
                "DE.AE-1"
            ]
        }
    },
    {
        "title": "Systems Configuration",
        "id": "SCS-SYSCONF-1.6",
        "description": "Standardised build images must be reviewed at least every 6 months to incorporate changes or new patches released by the vendor. ",
        "groups": "Group 1",
        "rationale": "The build images are likely to require changing regularly based on patching cycles of the vendor so require reviewing and updating where necessary every 6 months.",
        "roleResponsible": [
            "IT Support",
            "Engineering"
        ],
        "guidance": "Project to check that no impact on the standard build as a result of the change.",
        "mappings": {
            "NIST": [
                "PR.IP-1",
                "PR.IP-3",
                "DE.AE-1"
            ]
        }
    },
    {
        "title": "Systems Configuration",
        "id": "SCS-SYSCONF-1.7",
        "description": "Changes to Build Standards and associated standardised build images must:\na) \tbe updated for all Nationwide IT Systems hosted within Cloud Service Provider environments within 5 working days of the update entering production;\nb) \tbe assessed by all Technical Leads for hosted on-premise Nationwide IT Systems and updated within the timescales agreed with the Technical Vulnerability Authority (TVA) in accordance with Technical Vulnerability Management.",
        "groups": "Group 1",
        "rationale": "This is to ensure that the production system is aligned with the build standard at an early stage, in case new changes are required.",
        "roleResponsible": [
            "IT Support",
            "Engineering"
        ],
        "guidance": "",
        "mappings": {
            "NIST": [
                "PR.IP-3",
                "PR.IP-7"
            ]
        }
    },
    {
        "title": "Systems Configuration",
        "id": "SCS-SYSCONF-1.8",
        "description": "Compliance with defined Build Standards to assure the secure configuration of Nationwide IT Systems and detect any configuration drift through security configuration scanning must be: \na) \tvalidated for all new environments being deployed in accordance with the Systems Development Lifecycle;\nb) \tscanned every 5 working days for all Nationwide IT Systems, inclusive of Cloud Service Provider environments, where technically feasible. ",
        "groups": "Group 1",
        "rationale": "There needs to be an assurance control in place that can confirm the production system is matching the build standard - this enables any mis-alignment to be corrected at the earliest opportunity.",
        "roleResponsible": [
            "IT Support",
            "Engineering"
        ],
        "guidance": "",
        "mappings": {
            "NIST": [
                "PR.IP-3",
                "PR.IP-7",
                "PR.IP-12",
                "DE.AE-1"
            ]
        }
    },
    {
        "title": "Systems Configuration",
        "id": "SCS-SYSCONF-1.9",
        "description": "Non-compliance with Build Standards identified through security configuration scanning must be logged, assessed and subject to risk response in accordance with Technical Vulnerability Management.",
        "groups": "Group 1",
        "rationale": "This is required to ensure that identified non-compliance is responded to as soon as possible to maintain the security of the system.",
        "roleResponsible": [
            "IT Support",
            "Engineering"
        ],
        "guidance": "",
        "mappings": {
            "NIST": [
                "DE.CM-8",
                "DE.DP-2"
            ]
        }
    },
    {
        "title": "Systems Configuration",
        "id": "SCS-SYSCONF-2.1",
        "description": "Infrastructure installation procedures must:\na) \tbe designed to meet security architecture principles and security requirements;\nb) \tensure compatibility is maintained with other Nationwide IT Systems, Nationwide IT Network and telecommunication installations used by Nationwide;\nc) \tensure designated Nationwide IT Systems and Nationwide IT Networks are protected from unauthorised or malicious traffic sent from other internal Nationwide IT Systems or external systems;\nd) \tensure Nationwide IT Systems, Nationwide IT Network and telecommunication installations are designed to cope to allow for adaption in the event of newly identified attack methods or secure integration with emerging technologies. ",
        "groups": "",
        "rationale": "Installation procedures must align to all statements in 2.1 so that they are consistent and effective at securely installing Nationwide IT Infrastructure without affecting performance.",
        "roleResponsible": [
            "IT Support",
            "Engineering"
        ],
        "guidance": "",
        "mappings": {
            "NIST": [
                "PR.IP-1",
                "PR.IP-2",
                "PR.IP-7"
            ]
        }
    },
    {
        "title": "Systems Configuration",
        "id": "SCS-SYSCONF-2.2",
        "description": "Infrastructure must be installed in accordance with Installation Procedures. ",
        "groups": "",
        "rationale": "To maintain a consistent approach infrastructure should follow specifically designed procedures.",
        "roleResponsible": [
            "IT Support",
            "Engineering"
        ],
        "guidance": "",
        "mappings": {
            "NIST": [
                "PR.IP-1",
                "PR.IP-2",
                "PR.IP-7"
            ]
        }
    },
    {
        "title": "Systems Configuration",
        "id": "SCS-SYSCONF-2.3",
        "description": "Infrastructure installations must:\na) \tbe managed centrally using a minimum number of management consoles;\nb) \tbe set up so that they can be configured remotely;\nc) \tbe monitored against predefined thresholds;\nd) \thave their capacity managed in accordance with Capacity Management;\ne) \tencrypt all non-console administrative access to Nationwide IT Systems, Nationwide IT Network devices and telecommunications equipment in accordance with Cryptography;\nf) \tbe designed to incorporate security architecture principles including:\ni.\tgranting users the minimum level of access (using the principle of least privilege);\nii.\tensuring separation of duties;\niii.\tminimising single points of failure;\niv.\tproviding fail secure systems where in the event of a system failure, Nationwide Information is not accessible to unauthorised individuals and cannot be tampered with or modified;\ng) \tbe hardened to provide only necessary and approved ports, protocols and services;\nh) \tinclude the installation of Anti-Malware solutions in accordance with Anti-Malware;\ni) \tutilise approved Build Standards; \nj) \tsupport the timely application of security updates and patches in accordance with Patch Management.",
        "groups": "",
        "rationale": "To further ensure the installed infrastructure is secure and protected, including access to the infrastructure the statements in 2.3 must be put in place.",
        "roleResponsible": [
            "IT Support",
            "Engineering"
        ],
        "guidance": "",
        "mappings": {
            "NIST": [
                "PR.IP-1",
                "PR.IP-2",
                "PR.IP-7",
                "PR.IP-3",
                "PR.IP-10",
                "PR.IP-12",
                "DE.CM-4"
            ]
        }
    },
    {
        "title": "Systems Configuration",
        "id": "SCS-SYSCONF-2.4",
        "description": "Technical infrastructure for Nationwide IT Systems must be capable of providing the following: \na) \trestricting physical access to a limited number of authorised individuals;\nb) \tmaintaining up-to-date Anti-Malware solutions and definitions in accordance with Anti-Malware;\nc) \tmaintaining software licenses in accordance with Systems Maintenance;\nd) \tmonitoring the infrastructure and enable detection of events;\ne) \twhere appropriate, and where capability provides for this, enable prevention of events;\nf) \tusing secure protocols to perform remote support of technical infrastructure;\ng) \tpatching and maintaining support in accordance with Patch Management and Systems Maintenance.",
        "groups": "Group 1",
        "rationale": "This is to ensure that the infrastructure we procure and use has certain security enhancing capabilities that Nationwide require to maintain security of our infrastructure.",
        "roleResponsible": [
            "IT Support",
            "IT Operations"
        ],
        "guidance": "",
        "mappings": {
            "NIST": [
                "DE.CM-4",
                "DE.CM-8",
                "DE.DP-2",
                "DE.DP-3",
                "DE.DP-4"
            ]
        }
    },
    {
        "title": "Systems Configuration",
        "id": "SCS-SYSCONF-2.5",
        "description": "End User Devices must be configured to reduce the risk of downloading malware by:\na) \trestricting the sources and types of JavaScript, ActiveX, and Macros that can be downloaded;\nb) \tpreventing applications that use unwanted code from running (e.g. JavaScript, ActiveX and Macros);\nc) \trunning JavaScript, ActiveX, and Macros in a protected environment.",
        "groups": "Group 1",
        "rationale": "Nationwide's end-user devices must be protected in a way that prevents use of unsafe connections, tooling and software from being used on them.",
        "roleResponsible": [
            "IT Custodian",
            "IT Support"
        ],
        "guidance": "",
        "mappings": {
            "NIST": [
                "DE.CM-4",
                "DE.CM-8",
                "DE.DP-2",
                "DE.DP-3",
                "DE.DP-4"
            ]
        }
    },
    {
        "title": "Systems Configuration",
        "id": "SCS-SYSCONF-3.1",
        "description": "Virtual systems must be deployed, configured, hardened and maintained in accordance with procedures and Build Standards, which must:\na) \tensure segregation of virtualisation according to Asset Classification and Information Classification;\nb) \tensure hypervisors used for the management for virtualised Nationwide Infrastructure:\ni.\trestrict access to the virtualisation management console and ensure segregation of duties;\nii.\trestrict administration of virtualised systems to a minimum of authorised individuals;\niii.\tapply patches to ensure the hypervisor remains up to date in accordance with Patch Management;\niv.\tlog administrative activity in accordance with Logging and Monitoring;\nv.\tmonitor Nationwide IT Network traffic between different virtual servers and between virtual services and physical servers",
        "groups": "Group 1",
        "rationale": "Specifically for virtualisation, the requirements in 3.1 must be met to ensure there is no overlap or ability to move from one environment to another and that system patching and logging are up to date and appropriate.",
        "roleResponsible": [
            "Engineering"
        ],
        "guidance": "",
        "mappings": {
            "NIST": [
                "DE.CM-4",
                "DE.CM-8",
                "DE.DP-2",
                "DE.DP-3",
                "DE.DP-4"
            ]
        }
    },
    {
        "title": "Systems Configuration",
        "id": "SCS-SYSCONF-4.1",
        "description": "All user access to, user queries of, and user actions on any database or data repository containing cardholder data (including access by applications, administrators and all other users) must be through programmatic methods.",
        "groups": "",
        "rationale": "Specifically for databases containing cardholder data, interactions with the database must be closely controlled so the use of pre-defined procedures will reduce the attack surface.",
        "roleResponsible": [
            "IT Support",
            "Engineering"
        ],
        "guidance": "",
        "mappings": {
            "NIST": [
                "DE.CM-4",
                "DE.CM-8",
                "DE.DP-2",
                "DE.DP-3",
                "DE.DP-4"
            ]
        }
    },
    {
        "title": "Systems Configuration",
        "id": "SCS-SYSCONF-4.2.1",
        "description": "Database applications that are owned, developed or utilised for the processing, storage or transmission of Nationwide Information must: \na) \tbe designed and built in accordance with Application Security and Build Standards;\nb) \trestrict administrative views and privileged access to authorised users in accordance with Privileged Access Management;\nc) \tensure only users authorised for database administration duties have the ability to directly access or query databases;\nd) \tensure any default passwords have been changed and any unnecessary default accounts have been removed or disabled;\ne) \tensure all unnecessary functions or services have been disabled;\nf) \tbe stored on a central database server;\ng) \tbe assessed for technical vulnerabilities in accordance with Technical Vulnerability Management; \nh) \trun the latest stable and approved version of the database software on the server, and where relevant, all connected clients;\ni) \tapply security updates and patches in accordance with Patch Management;\nj) \tencrypt Nationwide Information in transit and whilst in use (field-level encryption) in accordance with Information Classification and Cryptography;\nk) \tobfuscate/mask Nationwide Information in accordance with Data Security;\nl) \tmaintain database integrity;\nm) \tapply change management in accordance with Change Management;\nn) \tlog both successful and unsuccessful access attempts, all database activities and provide audit trails in accordance with Logging and Monitoring;\no) \tmonitor both successful and unsuccessful attempts to access to the database;\np) \tensure compliance with all applicable legal, regulatory and contractual requirements and obligations, including the Payment Card Industry Data Security Standard (PCI-DSS);\nq) \thave backup, roll-back and contingency plans;\nr) \tbe backed up in accordance with Backups and encrypt all backup copies in accordance with Cryptography.",
        "groups": "",
        "rationale": "To further ensure the database and the information stored within it is secure, protected, restricted and monitored the requirements in 4.2.1 must be put in place.",
        "roleResponsible": [
            "IT Support",
            "Engineering"
        ],
        "guidance": "",
        "mappings": {
            "NIST": [
                "DE.CM-4",
                "DE.CM-8",
                "DE.DP-2",
                "DE.DP-3",
                "DE.DP-4",
                "DE.CM-3",
                "DE.CM-7"
            ]
        }
    },
    {
        "title": "Systems Configuration",
        "id": "SCS-SYSCONF-4.3.1",
        "description": "Data repositories (inclusive of data warehouses, data lakes and other similar distributed storage and processing systems) that are owned, developed or utilised for the processing, storage or transmission of Nationwide Information must: \na) \trestrict administrative views and privileged access to authorised users in accordance with Privileged Access Management;\nb) \tensure that access is provided on a least privileged basis in accordance with Identity and Access Management;\nc) \tensure any default passwords have been changed and any unnecessary default accounts have been removed or disabled;\nd) \tensure all unnecessary functions or services have been disabled;\ne) \tbe assessed for technical vulnerabilities in accordance with Technical Vulnerability Management; \nf) \trun the latest version of the software in accordance with Systems Maintenance;\ng) \tapply security updates and patches in accordance with Patch Management;\nh) \tencrypt Nationwide Information at rest in accordance with Cryptography;\ni) \tobfuscate/mask Nationwide Information in accordance with Data Security;\nj) \tmaintain the integrity of Nationwide Information;\nk) \tapply change management in accordance with Change Management;\nl) \tlog both successful and unsuccessful access attempts, all queries and data extracts in accordance with Logging and Monitoring;\nm) \tensure compliance with all applicable legal, regulatory and contractual requirements and obligations, including the Payment Card Industry Data Security Standard (PCI-DSS);\nn) \thave backup, roll-back and recovery plans in accordance with Business Continuity;\no) \tbe backed up in accordance with Backups and encrypt all backup copies in accordance with Cryptography.",
        "groups": "",
        "rationale": "To further ensure the data repository and the information stored within it is secure, protected, restricted and monitored the requirements in 4.3.1 must be put in place.",
        "roleResponsible": [
            "IT Support",
            "Engineering"
        ],
        "guidance": "",
        "mappings": {
            "NIST": [
                "DE.CM-4",
                "DE.CM-8",
                "DE.DP-2",
                "DE.DP-3",
                "DE.DP-4",
                "DE.CM-3",
                "DE.CM-7"
            ]
        }
    },
    {
        "title": "Systems Configuration",
        "id": "SCS-SYSCONF-6.1",
        "description": "Host-based Intrusion Detection and Prevention Systems (HIDS and HIPS) capabilities must be deployed for all Tier 1 and Tier 2 Nationwide IT Systems.",
        "groups": "",
        "rationale": "Intrusion detection and prevention systems provide a defence against certain cyber attacks or unexpected activity - detecting and preventing this type of activity.",
        "roleResponsible": [
            "IT Support",
            "Engineering"
        ],
        "guidance": "",
        "mappings": {
            "NIST": [
                "DE.CM-7",
                "DE.CM-8"
            ]
        }
    },
    {
        "title": "Systems Configuration",
        "id": "SCS-SYSCONF-6.2",
        "description": "Network and host-based intrusion detection and prevention systems deployed within Nationwide IT Networks must:\na) \testablish baselines of normal, acceptable and expected system and network activity using network traffic normalisation, known signatures and unplanned termination of processes or applications;\nb) \tbe configured in accordance with Build Standards;\nc) \tbe patched and maintained in accordance with Patch Management and Systems Configuration;\nd) \tupdate new or existing signatures on at least a monthly basis in accordance with Service Level Agreements (SLAs);\ne) \tupdate new or emergency signatures on receipt of relevant Cyber Threat Intelligence;\nf) \thide sensors from adversary detection;\ng) \talert and, where the risk of intrusion is considered high enough, block suspected intrusions for security monitoring triage;\nh) \tperform continuous integrity checks on system and file configurations (i.e. File Integrity Monitoring [FIM]) and virtual machine images;\ni) \tprovide a security alert in event of any suspected tampering or disablement of the sensor; \nj) \tmaintain the currency of engines, baselines and signatures in accordance with SLAs;\nk) \tlog all alerts and suspected intrusions in accordance with Logging and Monitoring;",
        "groups": "",
        "rationale": "Configuration of these systems is vital to ensure they are effective in the security duties that they will be performing, well tuned, maintained and secured to identify incidents and events that are out of character for the system/network they are protecting.",
        "roleResponsible": [
            "IT Support",
            "Engineering"
        ],
        "guidance": "",
        "mappings": {
            "NIST": [
                "DE.CM-4",
                "DE.CM-8",
                "DE.DP-2",
                "DE.DP-3",
                "DE.DP-4",
                "DE.CM-3",
                "DE.CM-7"
            ]
        }
    },
    {
        "title": "Systems Development Lifecycle",
        "id": "SCS-SYSDEV-1.1.1",
        "description": "Secure system development methodologies used for the development of Nationwide IT Systems must be established and applied to all developments including:\na) \tsecurity of the development environment;\nb) \tguidance on security in the system development lifecycle including:\ni.\tsecurity in the system development methodology;\nii.\tsecure coding guidelines for each programming language used;\nc) \tsecurity requirements in the design phase;\nd) \tsecurity checkpoints within the project milestones;\ne) \tsecure code libraries;\nf) \tcode version control;\ng) \trequired application security knowledge;\nh) \tdevelopers’ capability of preventing, finding and fixing vulnerabilities.",
        "groups": "",
        "rationale": "",
        "roleResponsible": [
            "Change Squads",
            "Engineering"
        ],
        "guidance": "",
        "mappings": {
            "NIST": [
                "PR.IP-1",
                "PR.IP-2",
                "PR.IP-3",
                "PR.DS-4",
                "PR.DS-6",
                "PR.DS-7"
            ]
        }
    },
    {
        "title": "Systems Development Lifecycle",
        "id": "SCS-SYSDEV-1.1.2",
        "description": "System development methodologies must require that, upon starting each new project, initial activities include:\na) \tnotification of the start of the project to the Security Function;\nb) \tan assessment of the need for confidentiality, integrity and availability of Nationwide Information;\nc) \ta Business Impact Assessment (i.e. HARM assessment);\nd) \tclarification of Nationwide’s information classification scheme and the requirement for Nationwide Information Assets to be classified.",
        "groups": "Group 1",
        "rationale": "",
        "roleResponsible": [
            "Change Squads",
            "Engineering"
        ],
        "guidance": "",
        "mappings": {
            "NIST": [
                "PR.IP-2"
            ]
        }
    },
    {
        "title": "Systems Development Lifecycle",
        "id": "SCS-SYSDEV-1.1.3",
        "description": "System development activities must be subject to quality assurance associated with security requirements during all stages of the Systems Development Lifecycle.",
        "groups": "Group 1",
        "rationale": "",
        "roleResponsible": [
            "Change Squads",
            "Engineering"
        ],
        "guidance": "",
        "mappings": {
            "NIST": [
                "PR.IP-1"
            ]
        }
    },
    {
        "title": "Systems Development Lifecycle",
        "id": "SCS-SYSDEV-1.1.4",
        "description": "Nationwide must obtain assurance that suppliers of outsourced systems development are able to comply with the requirements detailed within this standard in accordance with Supply Chain Management.",
        "groups": "Group 1",
        "rationale": "",
        "roleResponsible": [
            "Relationship Manager/Owner",
            "Procurement"
        ],
        "guidance": "",
        "mappings": {
            "NIST": [
                "PR.IP-1",
                "PR.IP-2",
                "PR.IP-3",
                "PR.DS-4",
                "PR.DS-6",
                "PR.DS-7"
            ]
        }
    },
    {
        "title": "Systems Development Lifecycle",
        "id": "SCS-SYSDEV-1.2.3",
        "description": "Developers must be trained and competent in the use of Secure Coding Standards.",
        "groups": "Group 1",
        "rationale": "",
        "roleResponsible": [
            "Engineering",
            "People & Culture"
        ],
        "guidance": "",
        "mappings": {
            "NIST": [
                "ID.RM-2",
                "PR.AT-1"
            ]
        }
    },
    {
        "title": "Systems Development Lifecycle",
        "id": "SCS-SYSDEV-1.2.4",
        "description": "All development, testing and production environments must be physically and/or logically segregated from each other.",
        "groups": "Group 1",
        "rationale": "",
        "roleResponsible": [
            "Change Squads",
            "Engineering"
        ],
        "guidance": "",
        "mappings": {
            "NIST": [
                "PR.AT-1",
                "PR.DS-7"
            ]
        }
    },
    {
        "title": "Systems Development Lifecycle",
        "id": "SCS-SYSDEV-1.2.5",
        "description": "Secure Coding Standards must be used when building new developments and making amendments to existing code",
        "groups": "Group 1",
        "rationale": "",
        "roleResponsible": [
            "Change Squads"
        ],
        "guidance": "",
        "mappings": {
            "NIST": [
                "PR.DS-7",
                "PR.DS-5",
                "PR.IP-2"
            ]
        }
    },
    {
        "title": "Systems Development Lifecycle",
        "id": "SCS-SYSDEV-2.1.1",
        "description": "Security requirements for new or existing Nationwide IT Systems under development, or those undergoing material change, must be specified within a requirement catalogue or product backlog, supported by an agreed change management process, and approved by the Product Owner and Technical Lead, which must:\na) \tidentify security requirements to protect the confidentiality, integrity and availability of Nationwide Information and Nationwide IT Systems throughout their lifecycle;\nb) \tevaluate the impact of changes utilising new or updated HARM assessment(s) and Information Security Risk Assessments of existing security controls:\nc) \tdefine any changes to the types of Nationwide Information that will be handled by the application, such as customer records, Personally Identifiable Information (PII), and standing data;\nd) \tconfirm the classification of Nationwide Information to be processed, transmitted or handled in accordance with Information Classification;\ne) \tdefine the types of Nationwide IT System that will handle Nationwide Information;\nf) \toutline the physical environments and locations where Nationwide Information, Nationwide IT Systems and associated Hardware are located.",
        "groups": "Group 1",
        "rationale": "",
        "roleResponsible": [
            "Change Squads",
            "Security & Resilience"
        ],
        "guidance": "",
        "mappings": {
            "NIST": [
                "PR.IP-1",
                "PR.IP-2",
                "PR.IP-3",
                "PR.DS-4",
                "PR.DS-6",
                "PR.DS-7"
            ]
        }
    },
    {
        "title": "Systems Development Lifecycle",
        "id": "SCS-SYSDEV-2.1.2",
        "description": "Security requirements catalogues or product backlogs for new or existing Nationwide IT Systems under development, or those undergoing material change, must include identified requirements, including control requirements based on Asset Classification, for:\na) \tuser authentication, access provisioning and authorisation;\nb) \tinforming users and operators of their duties and responsibilities;\nc) \tthe required protection needs of Nationwide Information and the Nationwide IT Systems involved, in particular regarding their availability, confidentiality and integrity;\nd) \trequirements derived from Business as Usual (BAU) processes, such as transaction logging and monitoring, nonrepudiation requirements;\ne) \tsupporting requirements mandated by other security controls, e.g. interfaces to logging and monitoring or data leakage detection systems;\nf) \trelevant contractual, legal and regulatory obligations including Data Privacy;\ng) \tadherence to security architecture artefacts;\nh) \tSecure Coding Standards;\ni) \tOperational Security controls;\nj) \tthe provision of arrangements to support new or existing Nationwide IT Systems under development or those undergoing material change in the production environment;\nk) \tthe reduction or elimination of single points of failure.",
        "groups": "Group 1",
        "rationale": "",
        "roleResponsible": [
            "Change Squads",
            "Security & Resilience"
        ],
        "guidance": "",
        "mappings": {
            "NIST": [
                "PR.IP-1",
                "PR.IP-2",
                "PR.IP-3",
                "PR.DS-4",
                "PR.DS-6",
                "PR.DS-7"
            ]
        }
    },
    {
        "title": "Systems Development Lifecycle",
        "id": "SCS-SYSDEV-2.2.3",
        "description": "Open source code, source code libraries, technology and software must only be used following the performance of an Information Security Risk Assessment. Usage must include support and procedures for:\na) \tfuture support and End of Service Life (EOSL) requirements;\nb) \tintellectual property rights;\nc) \tassessments of technical vulnerabilities in source code libraries;\nd) \tusing software composition analysis toolsets in accordance with Technical Vulnerability Management.",
        "groups": "Group 1",
        "rationale": "",
        "roleResponsible": [
            "Change Squads",
            "Engineering",
            "Security & Resilience"
        ],
        "guidance": "",
        "mappings": {
            "NIST": [
                "PR.IP-1",
                "PR.IP-2",
                "PR.IP-3",
                "PR.DS-4",
                "PR.DS-6",
                "PR.DS-7",
                "PR.IP-12"
            ]
        }
    },
    {
        "title": "Systems Development Lifecycle",
        "id": "SCS-SYSDEV-2.2.4",
        "description": "Open source code must be subject to technical vulnerability assessment (vulnerability scanning and software composition analysis) in accordance with Technical Vulnerability Management prior to deployment and during the software lifecycle.",
        "groups": "Group 1",
        "rationale": "",
        "roleResponsible": [
            "Change Squads",
            "Engineering",
            "Security & Resilience"
        ],
        "guidance": "",
        "mappings": {
            "NIST": [
                "PR.IP-12"
            ]
        }
    },
    {
        "title": "Systems Development Lifecycle",
        "id": "SCS-SYSDEV-2.4.1",
        "description": "New or existing Nationwide IT Systems under development, or those undergoing material change, must be designed and implemented to:\na) \tincorporate identified security requirements and security architecture principles for performance, capacity, continuity, scalability, connectivity and compatibility;\nb) \tvalidate data inputs and connections to Nationwide IT Systems in accordance with Application Security;\nc) \tsecurely transmit data between system components in accordance with Data Security and Cryptography;\nd) \tprocess and store Nationwide Information, access to databases and other types of storage;\ne) \tauthenticate and validate the integrity of outbound connections to other Nationwide IT Systems and applications, and inbound connections that provide application data from other Nationwide IT Systems;\nf) \tsecurely erase Nationwide Information no longer required in accordance with Information Handling and Management.",
        "groups": "Group 1",
        "rationale": "",
        "roleResponsible": [
            "Technical Lead",
            "Change Squads"
        ],
        "guidance": "",
        "mappings": {
            "NIST": [
                "PR.IP-1",
                "PR.IP-2",
                "PR.IP-3",
                "PR.DS-4",
                "PR.DS-6",
                "PR.DS-7"
            ]
        }
    },
    {
        "title": "Systems Development Lifecycle",
        "id": "SCS-SYSDEV-2.4.2",
        "description": "Design of new or existing Nationwide IT Systems under development, or those undergoing material change, must include analysis of:\na) \tthe full range of security controls required to protect Nationwide Information and Nationwide IT Systems against identified threat events;\nb) \tthe capabilities of security controls to prevent, detect or respond to security events;\nc) \tspecific security controls required by particular Nationwide processes supported by Nationwide IT Systems;\nd) \twhere and how security controls are to be applied;\ne) \thow individual security controls (manual and automated) work together to produce an integrated set of controls.",
        "groups": "Group 1",
        "rationale": "",
        "roleResponsible": [
            "Technical Lead",
            "Change Squads"
        ],
        "guidance": "",
        "mappings": {
            "NIST": [
                "PR.IP-1",
                "PR.IP-2",
                "PR.IP-3",
                "PR.DS-4",
                "PR.DS-6",
                "PR.DS-7"
            ]
        }
    },
    {
        "title": "Systems Development Lifecycle",
        "id": "SCS-SYSDEV-2.4.3",
        "description": "New or existing Nationwide IT Systems under development, or those undergoing material change, must be designed to adhere to security architecture artefacts and be interoperable with other Nationwide IT Systems.",
        "groups": "Group 1",
        "rationale": "",
        "roleResponsible": [
            "Technical Lead",
            "Change Squads"
        ],
        "guidance": "",
        "mappings": {
            "NIST": [
                "PR.IP-1",
                "PR.IP-2",
                "PR.IP-3",
                "PR.DS-4",
                "PR.DS-6",
                "PR.DS-7"
            ]
        }
    },
    {
        "title": "Systems Development Lifecycle",
        "id": "SCS-SYSDEV-2.4.4",
        "description": "The design phase of new or existing Nationwide IT Systems under development, or those undergoing material change, must include:\na) \tdefining a support model, including required skills;\nb) \tintegration with technical security infrastructure and enterprise security architecture.",
        "groups": "Group 1",
        "rationale": "",
        "roleResponsible": [
            "Technical Lead",
            "Change Squads"
        ],
        "guidance": "",
        "mappings": {
            "NIST": [
                "PR.IP-1",
                "PR.IP-2",
                "PR.IP-3",
                "PR.DS-4",
                "PR.DS-6",
                "PR.DS-7"
            ]
        }
    },
    {
        "title": "Systems Development Lifecycle",
        "id": "SCS-SYSDEV-2.4.5",
        "description": "During the design phase of new or existing Tier 1 and Tier 2 Nationwide IT Systems under development, or those undergoing change, Threat Modelling must be undertaken, which includes:\na) \tidentified significant threats from the organisational threat profile;\nb) \tcategorisation of threat events common to most development projects that must be defended against (including, but not limited to, OWASP Top 10 Most Critical Web Application Security Risks and SANS Top 25 Most Dangerous Software Errors);\nc) \tidentified technical vulnerabilities that must be prevented (e.g. by using lists such as NVD CVE, OWASP Top 10 and SANS Top 25);\nd) \tthe priority of threat events in terms of the risk they pose;\ne) \tappropriate measures to protect, detect, respond, and recover from identified threats and vulnerabilities.",
        "groups": "Group 1",
        "rationale": "",
        "roleResponsible": [
            "Security & Resilience",
            "Security Architecture"
        ],
        "guidance": "",
        "mappings": {
            "NIST": [
                "PR.IP-1",
                "PR.IP-2",
                "PR.IP-3",
                "PR.DS-4",
                "PR.DS-6",
                "PR.DS-7"
            ]
        }
    },
    {
        "title": "Systems Development Lifecycle",
        "id": "SCS-SYSDEV-2.5.1",
        "description": "Secure development environments must be established and used for development of Nationwide IT Systems covering the entire Systems Development Lifecycle. Development environments must be protected through:\na) \tdocumentation of processes and procedures to protect source code and development environments;\nb) \trestriction of access on a least privilege basis in accordance with Identity and Access Management;\nc) \tprotection of backups in accordance with Backup Management; \nd) \tmonitoring of changes to the environments and code stored therein;\ne) \tcontrol of the movement of data from and to the environment.",
        "groups": "Group 1",
        "rationale": "",
        "roleResponsible": [
            "Engineering"
        ],
        "guidance": "",
        "mappings": {
            "NIST": [
                "PR.IP-1",
                "PR.IP-2",
                "PR.IP-3",
                "PR.DS-4",
                "PR.DS-6",
                "PR.DS-7"
            ]
        }
    },
    {
        "title": "Systems Development Lifecycle",
        "id": "SCS-SYSDEV-2.5.2",
        "description": "Application source code for Nationwide IT Systems in development environments must be protected by:\na) \tremoving unnecessary information, notes or annotations prior to production deployment;\nb) \tpreventing individuals undertaking development from making unauthorised changes to live environments;\nc) \tapplying strict version control over development software;\nd) \temploying anti-malware in accordance with Anti-Malware;\ne) \tpreventing malicious code (including Javascript, Active X and macros) from being downloaded into development environments.",
        "groups": "Group 1",
        "rationale": "",
        "roleResponsible": [
            "Engineering"
        ],
        "guidance": "",
        "mappings": {
            "NIST": [
                "PR.IP-1",
                "PR.IP-2",
                "PR.IP-3",
                "PR.DS-4",
                "PR.DS-6",
                "PR.DS-7"
            ]
        }
    },
    {
        "title": "Systems Development Lifecycle",
        "id": "SCS-SYSDEV-2.5.3",
        "description": "Source code and source code libraries for Nationwide IT Systems, including systems under development, must:\na) \tbe stored in an approved software code library;\nb) \trestrict access based on the principle of least privilege and in accordance with Identity and Access Management;\nc) \tcontinuously validate the integrity of the software code libraries;\nd) \tbe removed from all target systems wherever possible;\ne) \tbe supported by documented procedures;\nf) \tonly permit authorised updates;\ng) \tmaintain an audit log of access to and activities within program source libraries;\nh) \timplement change management procedures for the maintenance and copying of program source libraries in accordance with Change Management. ",
        "groups": "Group 1",
        "rationale": "",
        "roleResponsible": [
            "Engineering"
        ],
        "guidance": "",
        "mappings": {
            "NIST": [
                "PR.IP-1",
                "PR.IP-2",
                "PR.IP-3",
                "PR.DS-4",
                "PR.DS-6",
                "PR.DS-7"
            ]
        }
    },
    {
        "title": "Systems Development Lifecycle",
        "id": "SCS-SYSDEV-2.5.4",
        "description": "Routes to promote source code into production environments must validate the integrity of promoted code.",
        "groups": "Group 1",
        "rationale": "",
        "roleResponsible": [
            "Engineering"
        ],
        "guidance": "",
        "mappings": {
            "NIST": [
                "PR.IP-3",
                "PR.DS-6"
            ]
        }
    },
    {
        "title": "Systems Development Lifecycle",
        "id": "SCS-SYSDEV-2.6.1",
        "description": "New or existing Nationwide IT Systems under development, or those undergoing material change, must be securely built and ensure that:\na) \tEngineering and Security approved processes for building Nationwide IT Systems are followed;\nb) \tNationwide IT Systems comply with good practice for system build;\nc) \tany legal, regulatory and contractual requirements are met.",
        "groups": "Group 1",
        "rationale": "",
        "roleResponsible": [
            "Engineering",
            "Security & Resilience"
        ],
        "guidance": "",
        "mappings": {
            "NIST": [
                "PR.IP-1",
                "PR.IP-2",
                "PR.IP-3",
                "PR.DS-4",
                "PR.DS-6",
                "PR.DS-7"
            ]
        }
    },
    {
        "title": "Systems Development Lifecycle",
        "id": "SCS-SYSDEV-2.6.2",
        "description": "When building Nationwide IT Systems:\na) \tdevelopment and production software must be physically and/or logically segregated; \nb) \tdevelopers must use approved secure programming techniques, such as pair programming, refactoring, peer review, security iterations, and test-driven development;\nc) \tdevelopers must use approved programming languages;\nd) \tdevelopment and testing tools, such as Integrated Development Environments (IDE) and infrastructure as code, must be configured to support and enforce the creation of secure code;\ne) \tonly use approved plugins where relevant;\nf) \tensure that sections of code incorporated into the application must be maintainable, tracked and originate from proven, reputable sources and prevent unapproved and potentially malicious code from being introduced into environment;\ng) \tsegregation of duties must be designed and enforced through access controls or automated integration tooling to prevent unauthorised changes through development, testing and production environments in accordance with Systems Development Lifecycle;\nh) \tprovisioned infrastructure, including container images, operating systems and platform, must be hardened.",
        "groups": "Group 1",
        "rationale": "",
        "roleResponsible": [
            "Engineering"
        ],
        "guidance": "",
        "mappings": {
            "NIST": [
                "PR.IP-1",
                "PR.IP-2",
                "PR.IP-3",
                "PR.DS-4",
                "PR.DS-6",
                "PR.DS-7"
            ]
        }
    },
    {
        "title": "Systems Development Lifecycle",
        "id": "SCS-SYSDEV-2.6.3",
        "description": "Nationwide IT System build activities must be reviewed by a Technical Lead within the appropriate Change Squad to ensure that the Nationwide IT System:\na) \tfunctions as intended;\nb) \tconforms with designs and is configured in accordance with Build Standards;\nc) \tdoes not introduce any security weaknesses.",
        "groups": "Group 1",
        "rationale": "",
        "roleResponsible": [
            "Engineering"
        ],
        "guidance": "",
        "mappings": {
            "NIST": [
                "PR.IP-1",
                "PR.IP-2",
                "PR.IP-3",
                "PR.DS-4",
                "PR.DS-6",
                "PR.DS-7"
            ]
        }
    },
    {
        "title": "Systems Development Lifecycle",
        "id": "SCS-SYSDEV-3.1.1",
        "description": "New or existing Nationwide IT Systems under development, or those undergoing material change, must be tested in accordance with predefined, documented test plans, which must be cross-referenced to the system design/specification to ensure complete coverage. Product Owner representatives must be involved in planning tests, providing test data and reviewing test results.",
        "groups": "Group 1",
        "rationale": "",
        "roleResponsible": [
            "Information Asset Owner",
            "Technical Lead"
        ],
        "guidance": "",
        "mappings": {
            "NIST": [
                "PR.IP-1",
                "PR.IP-2",
                "PR.IP-3",
                "PR.DS-4",
                "PR.DS-6",
                "PR.DS-7"
            ]
        }
    },
    {
        "title": "Systems Development Lifecycle",
        "id": "SCS-SYSDEV-3.1.2",
        "description": "Testing for each new or existing Nationwide IT System under development, or those undergoing material change, must include:\na) \tsystem testing undertaken in an environment commensurate to production; \nb) \tperformance of system testing;\nc) \texpected conditions, such as:\ni.\tfull integration testing;\nii.\tfunctional testing;\niii.\tperformance testing when handling planned volumes of work;\niv.\tstress testing/volume testing;\nv.\tstate of the system boundary;\nd) \tunexpected conditions, such as:\ni.\tinstallation/uninstallation testing;\nii.\tapplication failure testing;\niii.\trecovery testing;\niv.\ttesting of roll-back arrangements or other contingency procedures;\ne) \tuser acceptance testing;\nf) \tcommunicating using different technologies;\ng) \tdefined security requirements being met;\nh) \tapproval of testing results by the Technical Lead prior to going live.",
        "groups": "Group 1",
        "rationale": "",
        "roleResponsible": [
            "Information Asset Owner",
            "Technical Lead"
        ],
        "guidance": "",
        "mappings": {
            "NIST": [
                "PR.IP-1",
                "PR.IP-2",
                "PR.IP-3",
                "PR.DS-4",
                "PR.DS-6",
                "PR.DS-7",
                "DE.CM-4",
                "DE.CM-7",
                "DE.CM-8",
                "DE.CM-1"
            ]
        }
    },
    {
        "title": "Systems Development Lifecycle",
        "id": "SCS-SYSDEV-3.1.3",
        "description": "Changes to production Nationwide IT Systems and applications must be tested in a testing or staging environment prior to being applied to production Nationwide IT Systems in accordance with Change Management.",
        "groups": "Group 1",
        "rationale": "",
        "roleResponsible": [
            "Information Asset Owner",
            "Technical Lead"
        ],
        "guidance": "",
        "mappings": {
            "NIST": [
                "PR.IP-1",
                "PR.IP-2",
                "PR.IP-3",
                "PR.DS-4",
                "PR.DS-6",
                "PR.DS-7"
            ]
        }
    },
    {
        "title": "Systems Development Lifecycle",
        "id": "SCS-SYSDEV-3.1.4",
        "description": "Access to Nationwide Information in the testing environment must be restricted in accordance with Identity and Access Management.",
        "groups": "Group 1",
        "rationale": "",
        "roleResponsible": [
            "Information Asset Owner",
            "Technical Lead"
        ],
        "guidance": "",
        "mappings": {
            "NIST": [
                "PR.AC-1",
                "PR.AC-4"
            ]
        }
    },
    {
        "title": "Systems Development Lifecycle",
        "id": "SCS-SYSDEV-3.1.5",
        "description": "Production data used in test environments must avoided where possible. Where this cannot be avoided for technical reasons, production data must be controlled to ensure that:\na) \tproduction data containing Nationwide Information must only be used for testing if artificial data cannot adequately achieve the same validation requirement;\nb) \tauthorisation and approval is received from the Information Asset Owner and Technology Lead within the appropriate Change Squad prior to using live Nationwide Information in a test environment;\nc) \tthe copying and use of production Nationwide Information into the testing environment must be logged to provide an audit trail;\nd) \tthe use of Personally Identifiable Information (PII), Sensitive Personal Information (SPI) and Personal Account Numbers (PANs) in the testing process is prohibited;\ne) \ttesting of Nationwide IT Systems processing production Nationwide Information must:\ni.\tmodify and obfuscate data through data masking when verifying functionality;\nii.\tapply equivalent controls and access control procedures that apply to Nationwide IT Systems in the production environment;\nf) \tNationwide Information used in test environments is securely removed immediately after completion of testing.",
        "groups": "Group 1",
        "rationale": "",
        "roleResponsible": [
            "Information Asset Owner",
            "Technical Lead"
        ],
        "guidance": "",
        "mappings": {
            "NIST": [
                "PR.DS-7",
                "PR.DS-5"
            ]
        }
    },
    {
        "title": "Systems Development Lifecycle",
        "id": "SCS-SYSDEV-3.1.6",
        "description": "Test accounts and test data must be removed prior to promotion into production environments.",
        "groups": "Group 1",
        "rationale": "",
        "roleResponsible": [
            "Information Asset Owner",
            "Technical Lead"
        ],
        "guidance": "",
        "mappings": {
            "NIST": [
                "PR.DS-5",
                "PR.AC-4",
                "PR.AC-1"
            ]
        }
    },
    {
        "title": "Systems Development Lifecycle",
        "id": "SCS-SYSDEV-3.1.7",
        "description": "Test results must be documented, checked against expected results, approved by users and signed off by the Technical Lead within the appropriate Change Squad.",
        "groups": "Group 1",
        "rationale": "",
        "roleResponsible": [
            "Information Asset Owner",
            "Technical Lead"
        ],
        "guidance": "",
        "mappings": {
            "NIST": [
                "PR.IP-2",
                "PR.IP-3"
            ]
        }
    },
    {
        "title": "Systems Development Lifecycle",
        "id": "SCS-SYSDEV-3.2.1",
        "description": "A testing plan must be defined which must, as a minimum:\na) \tdetermine the presence and effectiveness of security controls;\nb) \tprovide the scope of the change and the types of security testing that are required;\nc) \tbe approved by the Technical Lead;\nd) \tbe executed with activities documented;\ne) \trespond to results obtained, including actioning any remediation activities or accepting and approving the risk.",
        "groups": "Group 1",
        "rationale": "",
        "roleResponsible": [
            "Information Asset Owner",
            "Technical Lead"
        ],
        "guidance": "",
        "mappings": {
            "NIST": [
                "PR.IP-2",
                "PR.IP-3",
                "DE.CM-4",
                "DE.CM-7",
                "DE.CM-8",
                "DE.CM-1"
            ]
        }
    },
    {
        "title": "Systems Development Lifecycle",
        "id": "SCS-SYSDEV-3.2.2",
        "description": "Defined security requirements, threat events and common attack patterns identified during Threat Modelling for new or existing Nationwide IT Systems under development, or those undergoing material change, must be tested to determine the effectiveness of security controls, which include as a minimum:\na) \tperforming independent checks of the application code;\nb) \tauthentication, access control and session management testing;\nc) \tsigning off the results of code review by a Technical Lead within the appropriate Change Squad;\nd) \tperforming any testing of specific attacks customised for the application;\ne) \tusing test data for security testing;\nf) \tresolving flaws and security weaknesses identified during code review and testing;\ng) \tbuilding on lessons learned.",
        "groups": "Group 1",
        "rationale": "",
        "roleResponsible": [
            "Technical Lead",
            "Engineering"
        ],
        "guidance": "",
        "mappings": {
            "NIST": [
                "PR.IP-1",
                "PR.IP-2",
                "PR.IP-3",
                "PR.DS-4",
                "PR.DS-6",
                "PR.DS-7",
                "DE.CM-4",
                "DE.CM-7",
                "DE.CM-8",
                "DE.CM-1"
            ]
        }
    },
    {
        "title": "Systems Development Lifecycle",
        "id": "SCS-SYSDEV-3.2.3",
        "description": "New or existing Nationwide IT Systems under development, or those undergoing material change, must be security tested in accordance with the security test plan prior to promotion to production, including completion of the following and the below table:\na) \tperforming static and dynamic code analysis in accordance with Technical Vulnerability Management;\nb) \tmanual code review in accordance with Technical Vulnerability Management;\nc) \tonboarding web applications and/or APIs into web application vulnerability scanning in accordance with Technical Vulnerability Management.\n - Tier 1: Static & dynamic code analysis, Authenticated vulnerability scanning, Manual penetration testing post build and afteer every material change. Manual penetration testing is required post build and after every change if static & dynamic code analysis and authenticated vulnerability management are not performed. \n - Tier 2: Static & dynamic code analysis, Authenticated vulnerability scanning, Manual penetration testing is optional, but is required post build and after every material change if static & dynamic code analysis and authenticated vulnerability management are not performed.\n - Tier 3: Static & dynamic code analysis\n - Tier 4: Static & dynamic code analysis\n\n - ALL Tiers: manual code inspection must be performed as a compensating control if static and dynamic testing cannot be performed.",
        "groups": "Group 1",
        "rationale": "",
        "roleResponsible": [
            "Technical Lead",
            "Engineering"
        ],
        "guidance": "",
        "mappings": {
            "NIST": [
                "DE.CM-4",
                "DE.CM-7",
                "DE.CM-8",
                "DE.CM-1"
            ]
        }
    },
    {
        "title": "Systems Development Lifecycle",
        "id": "SCS-SYSDEV-3.2.4",
        "description": "New or existing Nationwide IT Systems under development, or those undergoing material change, must be assessed on the basis of the outputs of the security test plan and may be required to undergo additional security testing, including completion of the following and the below table:\na) \tscanning for technical vulnerabilities and software composition analysis in accordance with Technical Vulnerability Management;\nb) \tvalidating build compliance and configuration in accordance with Secure Configuration;\nc) \tpenetration testing in accordance with Technical Vulnerability Management;\nd) \tauthentication, access control and session management testing;\ne) \tintegration with any continuous automated security regression testing;\nf) \tspecific attack tests customised for the application identified during Threat Modelling.\n - Tier 1: Vulnerability scanning (authenticated), authenticated continuous build compliance & configuration scanning and manual penetration testing post build and after every material change. Manual penetration testing is required post build and after every change if vulnerability scanning (authenticated), authenticated continuous build compliance & configuration scanning are not performed. \n - Tier 2: Vulnerability scanning (authenticated), authenticated continuous build compliance & configuration scanning and manual penetration testing post build and after every material change. Manual penetration testing is optional, but is required post build and after every material change if vulnerability scanning (authenticated) and authenticated continuous build compliance & configuration scanning are not performed. \n - Tier 3: Vulnerability scanning (authenticated) \n - Tier 4: Vulnerability scanning (authenticated) \n\n - ALL Tiers: unauthenticated vulnerability scanning must be performed as a compensating control if authenticated scanning cannot be technically achieved.",
        "groups": "Group 1",
        "rationale": "",
        "roleResponsible": [
            "Technical Lead",
            "Engineering"
        ],
        "guidance": "",
        "mappings": {
            "NIST": [
                "PR.IP-1",
                "PR.IP-2",
                "PR.IP-3",
                "PR.DS-4",
                "PR.DS-6",
                "PR.DS-7"
            ]
        }
    },
    {
        "title": "Systems Development Lifecycle",
        "id": "SCS-SYSDEV-3.2.5",
        "description": "Checks of the application code must be performed on new or existing Nationwide IT Systems under development, or those undergoing material change, that are classified as Tier 1 or Tier 2, are internet facing (or any untrusted network) or have supplier connectivity to ensure:\na) \talignment with Secure Coding Standards;\nb) \tadherence to Security Control Directives and Security Control Standards;\nc) \tsecurity and design requirements have been met;\nd) \tprogramming features have not been used insecurely;\ne) \tunnecessary Nationwide Information has been removed from the application code.",
        "groups": "Group 1",
        "rationale": "",
        "roleResponsible": [
            "Technical Lead",
            "Engineering"
        ],
        "guidance": "",
        "mappings": {
            "NIST": [
                "PR.IP-1",
                "PR.IP-2",
                "PR.IP-3",
                "PR.DS-4",
                "PR.DS-6",
                "PR.DS-7"
            ]
        }
    },
    {
        "title": "Systems Development Lifecycle",
        "id": "SCS-SYSDEV-3.2.6",
        "description": "Security deficiencies identified during the security testing process, including technical vulnerabilities found during penetration testing, must be subject to risk response:\na) \tby implementing actions to address all critical, high and medium vulnerabilities and tracking remediation activities prior to promoting the Nationwide IT System into the production environment in accordance with Operational Security;\nb) \tby repeating tests of the systems following corrective actions to verify the corrections;\nc) \twhere if no remediation activity is undertaken, the risk must be accepted and approved by the Information Asset Owner prior to promoting the Nationwide IT System into the production environment, utilising the Operational Risk Appetite;\nd) \tby recording residual risks accepted within the information security risk register.",
        "groups": "Group 1",
        "rationale": "",
        "roleResponsible": [
            "Technical Lead",
            "Engineering"
        ],
        "guidance": "",
        "mappings": {
            "NIST": [
                "PR.IP-1",
                "PR.IP-2",
                "PR.IP-3",
                "PR.DS-4",
                "PR.DS-6",
                "PR.DS-7"
            ]
        }
    },
    {
        "title": "Systems Development Lifecycle",
        "id": "SCS-SYSDEV-3.2.7",
        "description": "New or existing Tier 1 or Tier 2 Nationwide IT Systems under development, or those undergoing material change, must:\na) \treview existing cyber response playbooks to validate that existing scenarios cover the scope of the change;\nb) \tupdate or create new cyber response playbooks as required prior to implementation into production if existing scenarios do not sufficiently cover the scope of change.",
        "groups": "Group 1",
        "rationale": "",
        "roleResponsible": [
            "Technical Lead",
            "Change Squads",
            "Security & Resilience"
        ],
        "guidance": "",
        "mappings": {
            "NIST": [
                "PR.IP-1",
                "PR.IP-2",
                "PR.IP-3",
                "PR.DS-4",
                "PR.DS-6",
                "PR.DS-7"
            ]
        }
    },
    {
        "title": "Systems Development Lifecycle",
        "id": "SCS-SYSDEV-4.1.1",
        "description": "All new or existing Nationwide IT Systems under development, or those undergoing material change, must:\na) \tdevelop an implementation plan; \nb) \tobtain approval for the implementation plan by the Product Owner and Change Squad/Change Management Board;\nc) \tconfirm that security controls are implemented, operational and effective as intended;\nd) \tconfirm that security issues have been subject to risk response or tolerance within operational risk appetite;\ne) \tfollow an agreed change management process in accordance with Change Management.",
        "groups": "Group 1",
        "rationale": "",
        "roleResponsible": [
            "Information Asset Owner",
            "Technical Lead"
        ],
        "guidance": "",
        "mappings": {
            "NIST": [
                "PR.IP-1",
                "PR.IP-2",
                "PR.IP-3",
                "PR.DS-4",
                "PR.DS-6",
                "PR.DS-7"
            ]
        }
    },
    {
        "title": "Systems Development Lifecycle",
        "id": "SCS-SYSDEV-4.1.2",
        "description": "Implementation plans must:\na) \tadd and maintain the Nationwide IT System to the Information Asset Inventory (i.e. the Configuration Management Database [CMDB]) in accordance with Information Security Risk Assessment;\nb) \tensure all identified development problems have been resolved successfully;\nc) \tensure the application code (or equivalent) has been digitally signed and validated during implementation to protect its integrity;\nd) \tintegrate with existing technical security infrastructure, with no adverse effects on existing production Nationwide IT Systems;\ne) \tvalidate the load or conversion of data and removal of test data and test accounts;\nf) \tensure all privileged accounts are configured in accordance with Privileged Access Management;\ng) \tensure performance and capacity requirements can be met in accordance with Capacity Management;\nh) \tbe supported by sufficient testing and evidence to:\ni.\tvalidate system functionality;\nii.\tconfirm that the system is operating as expected in the production environment;\niii.\tverify that security controls present and functioning as designed and limitations on security controls have been documented;\niv.\tconfirm error recovery, restart procedures and roll-back arrangements will work if needed;\ni) \tensure all components of the Nationwide IT System are tested and approved prior to promotion into the production environment;\nj) \tupdate operating procedures and documentation;\nk) \tensure all system components and software have the most up-to-date and tested vendor-supplied security patches in accordance with Patch Management;\nl) \tdetail procedures for roll-back in the event of system failure within a documented roll-back plan;\nm) \trecord installation activity, highlighting details about unexpected conditions, ad-hoc changes to the system and security issues;\nn) \tarchive previous versions of software and configurations;\no) \tensure users are aware of their responsibilities for using new Nationwide IT Systems post-development, or Nationwide IT Systems that have undergone a material change, correctly and securely, applying security controls effectively in accordance with the Training and Awareness;\np) \tbe supported by arrangements for providing ongoing technical and security related support, such as Service Level Agreements (SLAs);\nq) \tbe approved and signed off by the Product Owner, detail responsibilities handed over to individuals running the production environment and be formally accepted into service;\nr) \tensure use cases for Security Event Logging of new Nationwide IT Systems or existing Nationwide IT Systems undergoing material change are defined, implemented and accepted into service.",
        "groups": "Group 1",
        "rationale": "",
        "roleResponsible": [
            "Information Asset Owner",
            "Technical Lead"
        ],
        "guidance": "",
        "mappings": {
            "NIST": [
                "PR.IP-1",
                "PR.IP-2",
                "PR.IP-3",
                "PR.DS-4",
                "PR.DS-6",
                "PR.DS-7"
            ]
        }
    },
    {
        "title": "Systems Development Lifecycle",
        "id": "SCS-SYSDEV-4.2.1",
        "description": "Changes to existing Nationwide IT Systems initiated from the system development lifecycle must be controlled using formal change control procedures in accordance with Change Management.",
        "groups": "Group 1",
        "rationale": "",
        "roleResponsible": [
            "Change Squads"
        ],
        "guidance": "",
        "mappings": {
            "NIST": [
                "PR.IP-1",
                "PR.IP-2",
                "PR.IP-3",
                "PR.DS-4",
                "PR.DS-6",
                "PR.DS-7"
            ]
        }
    },
    {
        "title": "Systems Development Lifecycle",
        "id": "SCS-SYSDEV-4.2.2",
        "description": "Upon completion of a material change on all new or existing Nationwide IT Systems and Nationwide IT Networks, all relevant Payment Card Industry Data Security Standard (PCI-DSS) requirements must be implemented and documentation updated as applicable.",
        "groups": "Group 1",
        "rationale": "",
        "roleResponsible": [
            "Change Squads"
        ],
        "guidance": "",
        "mappings": {
            "NIST": [
                "PR.IP-1",
                "PR.IP-2",
                "PR.IP-3",
                "PR.DS-4",
                "PR.DS-6",
                "PR.DS-7"
            ]
        }
    },
    {
        "title": "Systems Development Lifecycle",
        "id": "SCS-SYSDEV-4.3.1",
        "description": "Post-implementation reviews must be conducted for all new Nationwide IT Systems post-development or Nationwide IT Systems that have undergone a material change to validate that:\na) \tsecurity requirements have been addressed;\nb) \tselected security controls have been reviewed, built into new or amended Nationwide IT Systems and are operating as expected;\nc) \tany relevant outstanding security issues or vulnerabilities have been prioritised for assessment and reassessed or are being addressed.",
        "groups": "Group 1",
        "rationale": "",
        "roleResponsible": [
            "Change Squads"
        ],
        "guidance": "",
        "mappings": {
            "NIST": [
                "PR.IP-1",
                "PR.IP-2",
                "PR.IP-3",
                "PR.DS-4",
                "PR.DS-6",
                "PR.DS-7"
            ]
        }
    },
    {
        "title": "Systems Development Lifecycle",
        "id": "SCS-SYSDEV-4.3.2",
        "description": "The findings of post-implementation reviews must be approved by the Product Owner, Technical Lead within the appropriate Change Squad and the Security Function, with any identified issues or improvements tracked through remediation.",
        "groups": "Group 1",
        "rationale": "",
        "roleResponsible": [
            "Change Squads"
        ],
        "guidance": "",
        "mappings": {
            "NIST": [
                "PR.IP-1",
                "PR.IP-2",
                "PR.IP-3",
                "PR.DS-4",
                "PR.DS-6",
                "PR.DS-7"
            ]
        }
    },
    {
        "title": "Systems Development Lifecycle",
        "id": "SCS-SYSDEV-5.1.1",
        "description": "Nationwide IT Systems that are no longer required must be identified for decommissioning. Decommissioning procedures must:\na) \tassure that any impact on business processes and dependent systems is managed;\nb) \tidentify the type, classification and location of all Nationwide Information, software, services, Hardware and equipment for the Nationwide IT System;\nc) \tmigrate, archive or destroy Nationwide Information no longer required;\nd) \tuninstall and or remove software and services;\ne) \tupdate licensing records;\nf) \tsecurely sanitise and dispose of Hardware in accordance with Equipment Management;\ng) \tupdate information, hardware, and software asset inventories to confirm decommissioning",
        "groups": "Group 1",
        "rationale": "",
        "roleResponsible": [
            "Information Asset Owner",
            "Change Squads"
        ],
        "guidance": "",
        "mappings": {
            "NIST": [
                "PR.IP-1",
                "PR.IP-2",
                "PR.IP-3",
                "PR.DS-4",
                "PR.DS-6",
                "PR.DS-7"
            ]
        }
    },
    {
        "title": "Systems Development Lifecycle",
        "id": "SCS-SYSDEV-5.1.2",
        "description": "A review must be undertaken to ensure all aspects of the decommissioning process have been satisfactorily completed.",
        "groups": "Group 1",
        "rationale": "",
        "roleResponsible": [
            "Information Asset Owner",
            "Change Squads"
        ],
        "guidance": "",
        "mappings": {
            "NIST": [
                "PR.IP-1",
                "PR.IP-2",
                "PR.IP-3",
                "PR.DS-4",
                "PR.DS-6",
                "PR.DS-7"
            ]
        }
    },
    {
        "title": "Systems Development Lifecycle",
        "id": "SCS-SYSDEV-5.2.1",
        "description": "Architecture must notify security and the Information Asset Owner where an End Of Service Life (EOSL) component is identified as going out of vendor support and provide reference architecture diagrams of affected Nationwide IT Systems and business processes.",
        "groups": "Group 1",
        "rationale": "",
        "roleResponsible": [
            "Architecture"
        ],
        "guidance": "",
        "mappings": {
            "NIST": [
                "PR.IP-1",
                "PR.IP-2",
                "PR.IP-3",
                "PR.DS-4",
                "PR.DS-6",
                "PR.DS-7"
            ]
        }
    },
    {
        "title": "Systems Development Lifecycle",
        "id": "SCS-SYSDEV-5.2.2",
        "description": "Nationwide IT Systems with existing EOSL components and/or architectural roadmaps that will not decommission components before EOSL must be evaluated using an Information Security Risk Assessment that considers: \na) \tthe criticality of impacted Nationwide Information Assets in accordance with Asset Classification and Information Classification; \nb) \tsecurity controls and management practices that can no longer be applied;\nc) \toperational business impact;\nd) \trecommended mitigations and risk response plans from the software or hardware supplier;\ne) \tmanagement and mitigation practices for existing and new technical vulnerabilities (where patches are no longer available);\nf) \tnon-compliance with legal, regulatory or contractual obligations.",
        "groups": "Group 1",
        "rationale": "",
        "roleResponsible": [
            "Architecture",
            "Security & Resilience"
        ],
        "guidance": "",
        "mappings": {
            "NIST": [
                "PR.IP-1",
                "PR.IP-2",
                "PR.IP-3",
                "PR.DS-4",
                "PR.DS-6",
                "PR.DS-7"
            ]
        }
    },
    {
        "title": "Systems Development Lifecycle",
        "id": "SCS-SYSDEV-5.2.3",
        "description": "Risk response plans to address identified information security risks for EOSL hardware and software must be agreed in accordance with the Information Security Risk Assessment.",
        "groups": "Group 1",
        "rationale": "",
        "roleResponsible": [
            "Information Asset Owner",
            "Change Squads"
        ],
        "guidance": "",
        "mappings": {
            "NIST": [
                "PR.IP-1",
                "PR.IP-2",
                "PR.IP-3",
                "PR.DS-4",
                "PR.DS-6",
                "PR.DS-7"
            ]
        }
    },
    {
        "title": "Systems Development Lifecycle",
        "id": "SCS-SYSDEV-6.1",
        "description": "Processes and technologies for configuration management and continuous delivery workflows as part of DevSecOps operating models must:\na) \tundertake a Threat Model of the continuous delivery pipeline in accordance with Information Security Risk Assessment;\nb) \tprotect the integrity of Continuous Integration and Delivery Servers and Configuration Management Tools through the implementation of Build Standards;\nc) \timplement access control to Continuous Integration and Delivery Servers and Configuration Management Tools to use Public Key Infrastructures (PKI) or Multi-Factor Authentication (MFA) in accordance with Cryptography and Identity and Access Management;\nd) \tprevent anonymous access or shared accounts to source code repositories, to the integration server, or confirmation manager or any other tools;\ne) \tencrypt transmission of Continuous Integration network traffic (including between consoles, configuration management servers and clients, and restrict ports) in accordance with Network Management;\nf) \tprevent Denial of Service (DoS) attacks (e.g. against management consoles);\ng) \tassess Continuous Integration and Configuration Management Tools for technical vulnerabilities in accordance with Technical Vulnerability Management;\nh) \tmaintain Continuous Integration and Configuration Management Tools in accordance with Patch Management;\ni) \trestrict access to Continuous Integration and Configuration Management Tools in accordance with Privileged Access Management;\nj) \tutilise an approved Shared Secrets Manager to protect keys, credentials and other secrets, and provide an audit trail of shared secret usage in accordance with Cryptography;\nk) \tprevent and detect the storage of secrets within scripts, source code and plain-text files;\nl) \trestrict access to source and binary repositories in accordance with Identity and Access Management;\nm) \tprovide an audit trail of all access to source and binary repositories in accordance with Logging and Monitoring;\nn) \tdigitally sign binaries and other build artefacts utilised in the continuous delivery pipeline to prevent tampering;\no) \tperiodically review the logs to ensure that they are complete and changes can be traced from start to finish in accordance with Change Management;\np) \tprotect logs from tampering and provide these to Security Information and Event Management (SIEM) toolsets in accordance with Logging and Monitoring;\nq) \timplement security monitoring procedures and use cases for all toolsets and systems that are commensurate with a production environment.",
        "groups": "",
        "rationale": "",
        "roleResponsible": [
            "Change Squads",
            "Engineering"
        ],
        "guidance": "",
        "mappings": {
            "NIST": [
                "PR.IP-1",
                "PR.IP-2",
                "PR.IP-3",
                "PR.DS-4",
                "PR.DS-6",
                "PR.DS-7"
            ]
        }
    },
    {
        "title": "Systems Development Lifecycle",
        "id": "SCS-SYSDEV-6.2",
        "description": "Developers within Change Squads must receive role-specific training in accordance with Training and Awareness, which covers the following areas:\na) \tmisuse case modelling;\nb) \tattack surface management;\nc) \tdefensive coding techniques;\nd) \tsecurity testing.",
        "groups": "",
        "rationale": "",
        "roleResponsible": [
            "Change Squads",
            "Security & Resilience"
        ],
        "guidance": "",
        "mappings": {
            "NIST": [
                "PR.IP-1",
                "PR.IP-2",
                "PR.IP-3",
                "PR.DS-4",
                "PR.DS-6",
                "PR.DS-7"
            ]
        }
    },
    {
        "title": "Systems Development Lifecycle",
        "id": "SCS-SYSDEV-7.3.2",
        "description": "Virtual or augmented reality software and devices that are deployed and operated to process, store or transmit Nationwide Information must:\na) \tenrol and de-enrol users in accordance with Identity and Access Management;\nb) \trestrict privileged access in accordance with Privileged Access Management;\nc) \tbe maintained in accordance with Patch Management;\nd) \tbe assessed for technical vulnerabilities in accordance with Technical Vulnerability Management; \ne) \tbe protected against DoS attacks;\nf) \tbe protected against malicious tampering;\ng) \tbe handled in accordance with Information Handling and Management;\nh) \tbe supported by procedures to securely decommission devices used within virtual reality environments.",
        "groups": "Group 1",
        "rationale": "",
        "roleResponsible": [
            "Information Asset Owner"
        ],
        "guidance": "",
        "mappings": {
            "NIST": [
                "PR.IP-1",
                "PR.IP-2",
                "PR.IP-3",
                "PR.DS-4",
                "PR.DS-6",
                "PR.DS-7"
            ]
        }
    },
    {
        "title": "Systems Development Lifecycle",
        "id": "SCS-SYSDEV-7.4.1.1",
        "description": "The consumption of new Cloud Service Providers within Nationwide or addition of workloads into existing Cloud Services must:\na) \tbe reviewed with consideration for jurisdiction, portability and vendor lock-in;\nb) \thave all decisions documented;\nc) \tbe recommended by the Cloud Centre of Excellence (CCoE); \nd) \thave approval from the Security Function, Senior Relationship Owner and Information Asset Owner.",
        "groups": "Group 1",
        "rationale": "",
        "roleResponsible": [
            "Cloud CoE"
        ],
        "guidance": "",
        "mappings": {
            "NIST": [
                "PR.IP-1",
                "PR.IP-2",
                "PR.IP-3",
                "PR.DS-4",
                "PR.DS-6",
                "PR.DS-7"
            ]
        }
    },
    {
        "title": "Systems Development Lifecycle",
        "id": "SCS-SYSDEV-7.4.1.2",
        "description": "An inventory of Cloud Service Providers and Nationwide IT Systems and/or Nationwide Information hosted within Cloud Service Providers must be maintained. The inventory must include:\na) \tthe classification of the Cloud Service Provider, \nb) \tthe Service Model;\nc) \tthe Deployment Model;\nd) \tscope of Cloud Service consumption;\ne) \tdata jurisdiction and residency for the Cloud Service;\nf) \tthe agreed Shared Responsibility Model for the Cloud Service Provider and the appointed Nationwide IT Custodian based on contractual requirements.",
        "groups": "Group 1",
        "rationale": "",
        "roleResponsible": [
            "Cloud CoE"
        ],
        "guidance": "",
        "mappings": {
            "NIST": [
                "PR.IP-1",
                "PR.IP-2",
                "PR.IP-3",
                "PR.DS-4",
                "PR.DS-6",
                "PR.DS-7"
            ]
        }
    },
    {
        "title": "Systems Development Lifecycle",
        "id": "SCS-SYSDEV-7.4.1.3",
        "description": "When available, monitoring must be undertaken for use of unauthorised Cloud Services and unauthorised use or misuse of legitimate Cloud Services. The monitoring process must:\na) \tdetect and alert for unauthorised usage and/or the use of services outside of risk appetite;\nb) \tinvestigate usage and stop use of the Cloud Service immediately or constrain usage with an understanding of the business impacts;\nc) \tperform root cause analysis;\nd) \tinitiate any formal management processes in accordance with Employee Lifecycle.",
        "groups": "Group 1",
        "rationale": "",
        "roleResponsible": [
            "Cloud CoE"
        ],
        "guidance": "",
        "mappings": {
            "NIST": [
                "DE.CM-4",
                "DE.CM-7",
                "DE.CM-8",
                "DE.CM-1"
            ]
        }
    },
    {
        "title": "Systems Development Lifecycle",
        "id": "SCS-SYSDEV-7.4.1.4",
        "description": "When available, blocking for unauthorised utilisation of Cloud Service Providers through a Cloud Services Access Broker (CASB) for the hosting of Nationwide IT Systems and Nationwide Information must be performed.",
        "groups": "Group 1",
        "rationale": "",
        "roleResponsible": [
            "Cloud CoE"
        ],
        "guidance": "",
        "mappings": {
            "NIST": [
                "PR.IP-1",
                "PR.IP-2",
                "PR.IP-3",
                "PR.DS-4",
                "PR.DS-6",
                "PR.DS-7"
            ]
        }
    },
    {
        "title": "Systems Development Lifecycle",
        "id": "SCS-SYSDEV-7.4.2.1",
        "description": "The Security Senior Leadership Team (SLT) and Cloud Centre of Excellence (CCoE) must conduct horizon scanning on at least a 6-monthly basis to identify systemic threats likely to cause adverse impacts to Cloud Services in use by Nationwide. This analysis must be documented, and any adverse threats must be escalated to the Nationwide Board.\n\nExamples of threats to be monitored must include as a minimum:\n•\tcryptographic compromise or advances;\n•\tvirtualisation and isolation failures;\n•\ttechnical vulnerabilities and industry misconfiguration incidents;\n•\tlegal, regulatory or privacy changes;\n•\tsupplier stability and concentration risks for Nationwide cloud utilisation and the industry sector. ",
        "groups": "Group 1",
        "rationale": "",
        "roleResponsible": [
            "Security & Resilience",
            "Cloud CoE"
        ],
        "guidance": "Project to ensure CCoE are aware of any new service, so it can be considered in any future review of this nature.",
        "mappings": {
            "NIST": [
                "DE.CM-4",
                "DE.CM-7",
                "DE.CM-8",
                "DE.CM-1"
            ]
        }
    },
    {
        "title": "Cryptography",
        "id": "SCS-CRYPTO-1.1",
        "description": "Nationwide Information must be subject to an Information Security Risk Assessment, which must assess and consider the following:\na) \tthe type of information (such as Personally Identifiable Information [PII] and cardholder data);\nb) \tany legal, regulatory and contractual requirements;\nc) \tsecurity requirements to protect the confidentiality, integrity and availability of Nationwide Information, such as encryption, data masking and obfuscation;\nd) \trisks associated with unauthorised disclosure of Nationwide Information;\ne) \trisks and security controls mitigated through the application of data protection techniques.",
        "groups": "",
        "rationale": "The output of the Information Security Risk Assessment, should provide clear information as to whether the information assessed (or information within the system assessed) requires cryptography to be applied.",
        "roleResponsible": [
            "Technical Lead",
            "Change Squads"
        ],
        "guidance": "",
        "mappings": {
            "NIST": [
                "ID.AM-2",
                "ID.RA-5",
                "ID.RA-6",
                "PR.DS-1",
                "PR.DS-2",
                "PR.DS-5"
            ]
        }
    },
    {
        "title": "Cryptography",
        "id": "SCS-CRYPTO-1.2",
        "description": "Nationwide must protect the information in its custody and apply security controls in accordance with Information Classification and Information Handling and Management.",
        "groups": "",
        "rationale": "This is to ensure that the information within this solution is protected appropriately.",
        "roleResponsible": [
            "Technical Lead",
            "Change Squads"
        ],
        "guidance": "",
        "mappings": {
            "NIST": [
                "PR.DS-3"
            ]
        }
    },
    {
        "title": "Cryptography",
        "id": "SCS-CRYPTO-1.3",
        "description": "Wherever card data is processed, after authorisation, Nationwide IT Systems must not store, even if encrypted, the following data captured during the authorisation process:\na) \tcard verification code (CVC);\nb) \tPersonal Identification Number (PIN);\nc) \tfull contents of any track.",
        "groups": "",
        "rationale": "To comply with PCI-DSS these types of PCI data are not permitted to be stored, even if encrypted.",
        "roleResponsible": [
            "Technical Lead",
            "Change Squads"
        ],
        "guidance": "",
        "mappings": {
            "NIST": [
                "PR.DS-3",
                "PR.DS-5"
            ]
        }
    },
    {
        "title": "Cryptography",
        "id": "SCS-CRYPTO-2.1.1",
        "description": "The Security Function and Security Architecture must provide architectural artefacts, Cryptographic Solutions and Cryptographic Key Algorithms and Attributes Standards that consider:\na) \tthe appropriateness of Cryptographic Solutions, key algorithms and attributes for the attainment of security objectives relating to confidentiality, integrity, non-repudiation and authentication;\nb) \tuse cases for the suitability of Cryptographic Solutions employed (including cryptographic key lengths and the cryptographic strength of both symmetric and asymmetric algorithms);\nc) \trestrictions on the export/use of Cryptographic Solutions;\nd) \tindustry best practice;\ne) \tdefinition of approved cryptographic key algorithms and attributes;\nf) \trequirements for Nationwide IT Systems implementing Cryptographic Solutions;\ng) \tcompliance with all applicable legal, regulatory and contractual requirements and obligations, including the Payment Card Industry Data Security Standard (PCI-DSS) .",
        "groups": "",
        "rationale": "These artefacts must be provided so that the organisation is able to and instructed to only use appropriate cryptography solutions and that they are used in the most appropriate way.",
        "roleResponsible": [
            "Security & Resilience",
            "Security Architecture"
        ],
        "guidance": "",
        "mappings": {
            "NIST": [
                "PR.DS-1",
                "PR.DS-2",
                "PR.DS-5",
                "PR.IP-1",
                "PR.IP-2"
            ]
        }
    },
    {
        "title": "Cryptography",
        "id": "SCS-CRYPTO-2.1.3",
        "description": "Cryptographic Solutions must be protected and managed by:\na) \tselecting Cryptographic Solutions, Key Algorithms and Attributes according to industry best practice;\nb) \tadhering to the architectural artefacts, management processes and Cryptographic Key Algorithms and Attributes Standards that identify the required level of protection (including the type, strength and quality of the encryption algorithm required) in order to achieve confidentiality, integrity, non-repudiation and authentication;\nc) \tdefining approaches to key management, including methods to deal with the protection of cryptographic keys and the recovery of encrypted information in the case of lost, compromised or damaged keys;\nd) \tassigning competent individuals for the management of encryption keys; \ne) \tdesigning procedures for the revocation of cryptographic keys in the event of compromise (actual or suspected), which is managed as a Security Incident;\nf) \timplementing procedures for the disclosure of cryptographic keys if required in the event of a forensic investigation;\ng) \tlogically protecting any software used to generate, store and archive cryptographic keys, inclusive of applying the principle of least privilege;\nh) \tphysically protecting any dedicated Hardware (e.g. Hardware Security Module [HSM]) used to generate, store and archive cryptographic keys;\ni) \tprocuring and managing Cryptographic Solutions throughout their lifecycle in accordance with Supply Chain Management;\nj) \tensuring contracts with external suppliers of cryptographic services include liability, reliability of services and response times for the provision of services; \nk) \tgaining approval of new Cryptographic Solutions from the Security Function.",
        "groups": "",
        "rationale": "Maintaining and protecting the integrity of cryptographic solutions is essential to ensure that it is still able to securely and robustly provide the protection it needs to.",
        "roleResponsible": [
            "IT Custodian",
            "Change Squads",
            "Security & Resilience"
        ],
        "guidance": "",
        "mappings": {
            "NIST": [
                "PR.DS-1",
                "PR.DS-2",
                "PR.DS-5",
                "PR.IP-1",
                "PR.IP-2",
                "PR.IP-6"
            ]
        }
    },
    {
        "title": "Cryptography",
        "id": "SCS-CRYPTO-2.1.4",
        "description": "IT Custodians must undertake an impact assessment of their existing Cryptographic Solutions for risk response following any material change to the Cryptographic Key Algorithms and Attributes Standards.",
        "groups": "",
        "rationale": "Risk response is the process of controlling identified risks (avoid, mitigate, transfer, accept). At times of material change this needs to be reviewed to ensure it's still appropriate.",
        "roleResponsible": [
            "IT Custodian",
            "Security & Resilience"
        ],
        "guidance": "Project to check existing cryptographic solutions are still compliant.",
        "mappings": {
            "NIST": [
                "ID.RA-5",
                "ID.RA-3",
                "ID.RA-6"
            ]
        }
    },
    {
        "title": "Cryptography",
        "id": "SCS-CRYPTO-2.1.5",
        "description": "The selection of Cryptographic Solutions must comply with all relevant agreements, legislation and regulations through:\na) \tidentification of regulations and national restrictions that apply to the use of cryptographic techniques in different parts of the world and any issues with the flow of encrypted Nationwide Information across geographical borders;\nb) \tidentification of restrictions that apply to the import and export of Hardware and software for technologies that:\ni.\tperform cryptographic functions;\nii.\tare designed to have cryptographic functions added to them; \nc) \tthe use of mandatory or discretionary methods of access by any relevant geographical territory/country’s authorities to Nationwide Information that is encrypted by Hardware or software;\nd) \tlegal advice on the use of cryptography with relevance to jurisdictional laws.",
        "groups": "",
        "rationale": "To ensure the cryptographic solution is appropriate for Nationwide and complies with laws, contractual agreements and regulations that Nationwide are bound by or has set out to comply with.",
        "roleResponsible": [
            "Information Asset Owner"
        ],
        "guidance": "",
        "mappings": {
            "NIST": [
                "PR.DS-1",
                "PR.DS-2",
                "PR.DS-5",
                "PR.IP-1",
                "PR.IP-2",
                "PR.IP-6"
            ]
        }
    },
    {
        "title": "Cryptography",
        "id": "SCS-CRYPTO-2.1.6",
        "description": "Nationwide, or third-party, owned and approved Cryptographic Solutions used for the protection of Nationwide Information and Nationwide IT Systems must be maintained in inventories that:\na) \tspecify the intended use of the Cryptography Solution within Nationwide;\nb) \tdetail the locations (including jurisdictions) where Cryptographic Solutions are applied;\nc) \tcontain information relating to the licensing requirements for using Cryptographic Solutions in accordance with Systems Development Lifecycle;\nd) \tare made available to Engineering, Security Architecture, Change Squads, the Security Function and authorised external parties;\ne) \tare maintained through reviews at least annually or earlier in the event of material change (such as the receipt of relevant Cyber Threat Intelligence or any industry changes) or a Security Incident related to cryptography;\nf) \tsupport the review of existing Cryptographic Solutions.",
        "groups": "",
        "rationale": "This provides Nationwide with a clear understanding of what cryptographic solutions are in use across Nationwide, what they are used for and that they are reviewed.",
        "roleResponsible": [
            "Security & Resilience",
            "Security Architecture"
        ],
        "guidance": "",
        "mappings": {
            "NIST": [
                "PR.DS-1",
                "PR.DS-2",
                "PR.DS-5",
                "PR.IP-1",
                "PR.IP-2",
                "PR.IP-6"
            ]
        }
    },
    {
        "title": "Cryptography",
        "id": "SCS-CRYPTO-2.2.1",
        "description": "Cryptographic keys must have a defined lifetime to ensure that they can only be used for the allowed period.",
        "groups": "",
        "rationale": "This is required to ensure that Cryptographic keys are not used outside of their proscribed period.",
        "roleResponsible": [
            "Change Squads",
            "Security Architecture"
        ],
        "guidance": "",
        "mappings": {
            "NIST": [
                "ID.RA-5",
                "ID.RA-3",
                "ID.RA-6"
            ]
        }
    },
    {
        "title": "Cryptography",
        "id": "SCS-CRYPTO-2.2.2",
        "description": " All symmetric/secret cryptographic keys must be stored as one of the following:\na) \tinside the protected memory of a tamper-resistant security module;\nb) \tcipher text outside the protected memory of a tamper-resistant security module;\nc) \tcipher text encrypted by a key-encrypting key that is at least as strong as the data-encrypting key and stored separately from the data-encrypting key;\nd) \tat least two or more full-length key components or key shares either in clear text or cipher text, managed in accordance with an industry-accepted method, such as using dual control with split knowledge.",
        "groups": "",
        "rationale": "This ensures the strongest protection possible for this sort of highly sensitive data.",
        "roleResponsible": [
            "Change Squads",
            "Security Architecture"
        ],
        "guidance": "",
        "mappings": {
            "NIST": [
                "PR.DS-1",
                "PR.DS-2",
                "PR.DS-5",
                "PR.IP-1",
                "PR.IP-2",
                "PR.IP-6"
            ]
        }
    },
    {
        "title": "Cryptography",
        "id": "SCS-CRYPTO-2.2.3",
        "description": "All asymmetric/private cryptographic keys must be stored as one of the following:\na) \tinside the protected memory of a tamper-resistant security module;\nb) \tcipher text outside the protected memory of a tamper-resistant security module;\nc) \tcipher text within a password protected key container in accordance with Identity and Access Management; \nd) \tcipher text within an access-controlled operating system key store. ",
        "groups": "",
        "rationale": "This ensures the strongest protection possible for this sort of highly sensitive data.",
        "roleResponsible": [
            "Change Squads",
            "Security Architecture"
        ],
        "guidance": "",
        "mappings": {
            "NIST": [
                "PR.DS-1",
                "PR.DS-2",
                "PR.DS-5",
                "PR.IP-1",
                "PR.IP-2",
                "PR.IP-6"
            ]
        }
    },
    {
        "title": "Cryptography",
        "id": "SCS-CRYPTO-2.2.4",
        "description": "All symmetric/secret and asymmetric/private cryptographic keys that are associated with Transactional Processing Systems must be maintained in compliant Hardware Security Modules (HSM) .",
        "groups": "",
        "rationale": "Hardware Security Modules provide extra security for sensitive data that is used for critical functions.",
        "roleResponsible": [
            "Change Squads",
            "Security Architecture"
        ],
        "guidance": "Compliance typically means a Fips140-2 lvl 3 device. NBS has currently two approved devices for onprem.",
        "mappings": {
            "NIST": [
                "PR.DS-1",
                "PR.DS-2",
                "PR.DS-5",
                "PR.IP-1",
                "PR.IP-2",
                "PR.IP-6"
            ]
        }
    },
    {
        "title": "Cryptography",
        "id": "SCS-CRYPTO-2.3.1",
        "description": "Cryptographic Solutions must be used to ensure confidentiality where technically and practically possible by:\na) \tprotecting Nationwide Information classified as SECRET and CONFIDENTIAL that is processed, transmitted or stored within Nationwide;\nb) \tprotecting authentication and authorisation information (e.g. passwords/passphrases, Personal Identification Numbers [PINs], tokens) used in Nationwide IT Systems and processes for Members, intermediaries, employees, contingent workers and suppliers;\nc) \tprotecting Nationwide Information that includes Personally Identifiable Information (PII) and Sensitive Personal Information (SPI) processed, transmitted or stored (i.e. field level encryption);\nd) \tprotecting the confidentiality and integrity of backups and backup media when in transport and storage;\ne) \tprotecting all Nationwide Information processed, transmitted or stored within Cloud Service Provider infrastructure and environments.",
        "groups": "",
        "rationale": "This helps to protect Nationwide's most sensitive information. If your data is listed in 2.3.1 then cryptography is required.",
        "roleResponsible": [
            "Information Asset Owner",
            "IT Custodian"
        ],
        "guidance": "",
        "mappings": {
            "NIST": [
                "PR.DS-1",
                "PR.DS-2",
                "PR.DS-5",
                "PR.IP-1",
                "PR.IP-2",
                "PR.IP-6"
            ]
        }
    },
    {
        "title": "Cryptography",
        "id": "SCS-CRYPTO-2.3.2",
        "description": "The design phase of Cryptographic Solutions must include an Information Security Risk Assessment to assess the appropriateness of the solution to:\na) \tprotect the integrity of processed, transmitted or stored Nationwide Information in and outside of Nationwide (e.g. digital signatures or message authentication codes);\nb) \tprovide non-repudiation to support evidence of the occurrence or non-occurrence of an event or action.",
        "groups": "",
        "rationale": "Design of cryptography solutions must ensure that the integrity of the information is maintained at all stages of its lifecycle and that changes/actions cannot be denied (non-repudiation)",
        "roleResponsible": [
            "Information Asset Owner",
            "IT Custodian"
        ],
        "guidance": "",
        "mappings": {
            "NIST": [
                "PR.DS-1",
                "PR.DS-2",
                "PR.DS-5",
                "PR.IP-1",
                "PR.IP-2",
                "PR.IP-6"
            ]
        }
    },
    {
        "title": "Cryptography",
        "id": "SCS-CRYPTO-2.3.3",
        "description": "Where Cryptographic Solutions and techniques are unable to be deployed due to legal, regulatory, contractual or technical constraints, mitigating controls must be identified through the performance of an Information Security Risk Assessment.",
        "groups": "",
        "rationale": "Controls that provide alternative forms of protection must be considered where there is a requirement for encryption but it's not possible to implement it.",
        "roleResponsible": [
            "IT Custodian",
            "Change Squads",
            "Security & Resilience"
        ],
        "guidance": "",
        "mappings": {
            "NIST": [
                "PR.DS-1",
                "PR.DS-2",
                "PR.DS-5",
                "PR.IP-1",
                "PR.IP-2",
                "PR.IP-6"
            ]
        }
    },
    {
        "title": "Cryptography",
        "id": "SCS-CRYPTO-2.3.4",
        "description": "The design of Cryptographic Solutions must include assessing the impact of using encryption and Cryptographic Solutions on security and privacy controls that rely upon content inspection through an Information Security Risk Assessment.",
        "groups": "",
        "rationale": "To ensure that the use of Cryptography doesn't bypass or reduce the effectiveness of other security controls.",
        "roleResponsible": [
            "IT Custodian",
            "Change Squads",
            "Security & Resilience"
        ],
        "guidance": "",
        "mappings": {
            "NIST": [
                "PR.DS-1",
                "PR.DS-2",
                "PR.DS-5",
                "PR.IP-1",
                "PR.IP-2",
                "PR.IP-6"
            ]
        }
    },
    {
        "title": "Cryptography",
        "id": "SCS-CRYPTO-3.1.1",
        "description": "Governance structures and procedures must be defined and implemented for cryptographic keys used with nationwide-approved Cryptographic Solutions, including:\na) \tgenerating cryptographic keys for different cryptographic systems and different applications;\nb) \trestricting access to cryptographic keys to authorised Key Custodians;\nc) \tstoring cryptographic keys, including how authorised users obtain access to them;\nd) \tbacking up or archiving cryptographic keys;\ne) \tretrieving cryptographic keys;\nf) \tdistributing cryptographic keys; \ng) \tissuing and obtaining public key certificates, and using public key certificates to assess the authenticity of public cryptographic keys;\nh) \trecovering cryptographic keys that are lost or corrupted;\ni) \trevoking cryptographic keys including how they must be withdrawn or deactivated;\nj) \trenewing, replacing or updating cryptographic keys including rules on when they must be changed and how this will be done;\nk) \tidentifying and defining deployment and expiry dates for cryptographic keys;\nl) \tdestroying cryptographic keys;\nm) \tmanaging cryptographic keys that may have been compromised;\nn) \tmandatory key disclosure;\no) \tlogging and auditing of cryptographic key management related activities;\np) \tensuring cryptographic keys are only used for one purpose (i.e. a key which has the primary function of signing to protect integrity will not also be used for the purpose of encrypting data to also maintain confidentiality) .",
        "groups": "",
        "rationale": "Governance of cryptographic keys is essential to ensure that the keys remain confidential, available when required and that their integrity is maintained.",
        "roleResponsible": [
            "IT Custodian",
            "Change Squads",
            "Security & Resilience"
        ],
        "guidance": "",
        "mappings": {
            "NIST": [
                "PR.DS-1",
                "PR.DS-2",
                "PR.DS-5",
                "PR.IP-1",
                "PR.IP-2",
                "PR.IP-6"
            ]
        }
    },
    {
        "title": "Cryptography",
        "id": "SCS-CRYPTO-3.1.2",
        "description": "Cryptographic Key Management procedures must enforce segregation of duties between those overseeing the Cryptographic Solution and the operational use of keys.",
        "groups": "",
        "rationale": "This ensures that no single individual has authority or ownership of two conflicting duties - These are two distinct roles so must be segregated e.g. the owner of the system should not be able to use the keys to access information they are not entitled to see.",
        "roleResponsible": [
            "IT Custodian",
            "Change Squads",
            "Security & Resilience"
        ],
        "guidance": "",
        "mappings": {
            "NIST": [
                "PR.DS-1",
                "PR.DS-2",
                "PR.DS-5",
                "PR.IP-1",
                "PR.IP-2",
                "PR.IP-6"
            ]
        }
    },
    {
        "title": "Cryptography",
        "id": "SCS-CRYPTO-3.1.3",
        "description": "All cryptographic keys must be assigned a Deputy Key Custodian and Technical Specialist and be onboarded into Cryptographic Key Asset Registers, which must be maintained through reviews at least annually or earlier in the event of material change or a Security Incident related to cryptography. \n\nAs a minimum, the following attributes must be recorded in Cryptographic Key Asset Registers:\na) \tassigned Deputy Key Custodian;\nb) \tlifecycle state (e.g. new/active, expired);\nc) \tkey length;\nd) \tkey type;\ne) \tNationwide IT System used on;\nf) \tcryptographic algorithm;\ng) \texpiry date.",
        "groups": "",
        "rationale": "There are responsibilities that are required to be carried out by the Deputy Key Custodian and the Technical specialist to ensure the information about the key is maintained.",
        "roleResponsible": [
            "Technical Lead"
        ],
        "guidance": "Intranet Content avaialble to support this:- http://www.nationwideintranet.co.uk/My-Nationwide/Life-at-Nationwide/Security-at-Nationwide/Security-advice/Pages/Certificate-and-Key-Management.aspx",
        "mappings": {
            "NIST": [
                "PR.DS-1",
                "PR.DS-2",
                "PR.DS-5",
                "PR.IP-1",
                "PR.IP-2",
                "PR.IP-6"
            ]
        }
    },
    {
        "title": "Cryptography",
        "id": "SCS-CRYPTO-3.1.4",
        "description": "Key Custodians must: \na) \tbe educated of their responsibilities for using and protecting keys (and where necessary disclosing keys);\nb) \tconfirm they clearly understand their responsibilities for using and protecting cryptographic keys;\nc) \tbe approved for the role by their Line Manager.",
        "groups": "",
        "rationale": "To ensure successful and secure operation and maintenance of the cryptographic keys they are responsible for.",
        "roleResponsible": [
            "Key Custodian",
            "Line Managers",
            "Security & Resilience"
        ],
        "guidance": "Intranet Content available to support this:- http://www.nationwideintranet.co.uk/My-Nationwide/Life-at-Nationwide/Security-at-Nationwide/Security-advice/Pages/Certificate-and-Key-Management.aspx",
        "mappings": {
            "NIST": [
                "PR.DS-1",
                "PR.DS-2",
                "PR.DS-5",
                "PR.IP-1",
                "PR.IP-2",
                "PR.IP-6"
            ]
        }
    },
    {
        "title": "Cryptography",
        "id": "SCS-CRYPTO-3.1.6",
        "description": "Procedures for mandatory cryptographic key disclosure in the event of a Security Incident must be established and inclusive of:\na) \tmanaging cryptographic keys centrally and at an enterprise-wide level;\nb) \testablishing a cryptographic key escrow scheme;\nc) \tproviding individuals, who may cross international borders with End User Devices, with advice on disclosing cryptographic keys to the authorities;\nd) \tmaintenance of procedures for responding to e-discovery orders that relate to encrypted Nationwide Information.",
        "groups": "",
        "rationale": "These procedures may be critical should a security incident take place that impacts the keys or the data they are used to access.",
        "roleResponsible": [
            "Relationship Manager/Owner",
            "IT Support",
            "Security & Resilience",
            "Legal"
        ],
        "guidance": "",
        "mappings": {
            "NIST": [
                "PR.DS-1",
                "PR.DS-2",
                "PR.DS-5",
                "PR.IP-1",
                "PR.IP-2",
                "PR.IP-6"
            ]
        }
    },
    {
        "title": "Cryptography",
        "id": "SCS-CRYPTO-3.2.1",
        "description": "Access to Cryptographic Solutions for key distribution must be restricted to Key Custodians only, and further limited using the principle of least privilege. ",
        "groups": "",
        "rationale": "This is to make sure minimal access is provided to help ensure the keys are at the least risk of discovery or misuse as is possible.",
        "roleResponsible": [
            "Key Custodian"
        ],
        "guidance": "",
        "mappings": {
            "NIST": [
                "PR.DS-1",
                "PR.DS-2",
                "PR.DS-5",
                "PR.IP-1",
                "PR.IP-2",
                "PR.IP-6"
            ]
        }
    },
    {
        "title": "Cryptography",
        "id": "SCS-CRYPTO-3.2.2",
        "description": "Symmetric/Secret keys distributed in component form must be managed using at least dual control with split knowledge and then distributed using secure methods that will prevent unauthorised disclosure and detect modification. ",
        "groups": "",
        "rationale": "To ensure the keys can only be used according to the procedures agreed.",
        "roleResponsible": [
            "Key Custodian"
        ],
        "guidance": "",
        "mappings": {
            "NIST": [
                "PR.DS-1",
                "PR.DS-2",
                "PR.DS-5",
                "PR.IP-1",
                "PR.IP-2",
                "PR.IP-6"
            ]
        }
    },
    {
        "title": "Cryptography",
        "id": "SCS-CRYPTO-3.2.3",
        "description": "Cryptographic Solutions must prevent unauthorised substitution of cryptographic keys.",
        "groups": "",
        "rationale": "To provide protection against the use of unauthorised keys.",
        "roleResponsible": [
            "Key Custodian"
        ],
        "guidance": "",
        "mappings": {
            "NIST": [
                "PR.DS-1",
                "PR.DS-2",
                "PR.DS-5",
                "PR.IP-1",
                "PR.IP-2",
                "PR.IP-6"
            ]
        }
    },
    {
        "title": "Cryptography",
        "id": "SCS-CRYPTO-3.2.6",
        "description": "Cryptographic keys must be securely backed up, held in escrow or archived as necessary for the recovery of Nationwide Information. ",
        "groups": "",
        "rationale": "This is to ensure that if an operational key is lost/unavailable a secure back-up copy can be accessed and used.",
        "roleResponsible": [
            "Key Custodian"
        ],
        "guidance": "",
        "mappings": {
            "NIST": [
                "PR.DS-1",
                "PR.DS-2",
                "PR.DS-5",
                "PR.IP-1",
                "PR.IP-2",
                "PR.IP-6"
            ]
        }
    },
    {
        "title": "Cryptography",
        "id": "SCS-CRYPTO-3.2.8",
        "description": "The response and recovery playbook must be invoked in the event of a suspected or confirmed compromise of cryptographic keys and must include the following:\na) \traising a Security Incident (if not already raised) in accordance with Security Incident Management;\nb) \tidentifying all compromised keys and any keys they are encrypting;\nc) \treplacing all compromised keys in operational storage/use with new keys;\nd) \tmaintaining accurate records;\ne) \trevoking/removing the old keys as soon as practicably possible.",
        "groups": "",
        "rationale": "The steps laid out in 3.2.8 must be incorporated into the playbook to ensure the response and recovery to key loss or compromise is appropriately managed.",
        "roleResponsible": [
            "Key Custodian"
        ],
        "guidance": "",
        "mappings": {
            "NIST": [
                "PR.DS-1",
                "PR.DS-2",
                "PR.DS-5",
                "PR.IP-1",
                "PR.IP-2",
                "PR.IP-6"
            ]
        }
    },
    {
        "title": "Cryptography",
        "id": "SCS-CRYPTO-3.2.9",
        "description": "Each Deputy Key Custodian must inform the Enterprise Key Custodian when a cryptographic key is required to be decommissioned.",
        "groups": "",
        "rationale": "This prevents a key that is no longer required from being used.",
        "roleResponsible": [
            "Key Custodian"
        ],
        "guidance": "",
        "mappings": {
            "NIST": [
                "PR.DS-1",
                "PR.DS-2",
                "PR.DS-5",
                "PR.IP-1",
                "PR.IP-2",
                "PR.IP-6"
            ]
        }
    },
    {
        "title": "Cryptography",
        "id": "SCS-CRYPTO-3.2.10",
        "description": "Cryptographic keys must be retired or replaced and removed from operational use when:\na) \tthe defined period of use has expired;\nb) \tthe integrity of the key is weakened;\nc) \tcompromise is suspected. ",
        "groups": "",
        "rationale": "These steps help to ensure Nationwide continues to only use properly secure keys.",
        "roleResponsible": [
            "Key Custodian"
        ],
        "guidance": "",
        "mappings": {
            "NIST": [
                "PR.DS-1",
                "PR.DS-2",
                "PR.DS-5",
                "PR.IP-1",
                "PR.IP-2",
                "PR.IP-6"
            ]
        }
    },
    {
        "title": "Cryptography",
        "id": "SCS-CRYPTO-3.2.11",
        "description": "Cryptographic keys removed from operational use must:\na) \tbe published in a directory for future validation by reliant Nationwide IT Systems;\nb) \tremain secure and available to access archived data.",
        "groups": "",
        "rationale": "There may be occasions where the key is not required for operational use but may still be required to access archived information.",
        "roleResponsible": [
            "Information Asset Owner"
        ],
        "guidance": "",
        "mappings": {
            "NIST": [
                "PR.DS-1",
                "PR.DS-2",
                "PR.DS-5",
                "PR.IP-1",
                "PR.IP-2",
                "PR.IP-6"
            ]
        }
    },
    {
        "title": "Cryptography",
        "id": "SCS-CRYPTO-3.2.12",
        "description": "Cryptographic keys or components must be securely destroyed (e.g. shredded) when they are no longer required. ",
        "groups": "",
        "rationale": "This is to ensure the key can no longer be used, either accidentally or by a threat actor.",
        "roleResponsible": [
            "Key Custodian"
        ],
        "guidance": "",
        "mappings": {
            "NIST": [
                "PR.DS-1",
                "PR.DS-2",
                "PR.DS-5",
                "PR.IP-1",
                "PR.IP-2",
                "PR.IP-6"
            ]
        }
    },
    {
        "title": "Cryptography",
        "id": "SCS-CRYPTO-4.1",
        "description": "Cryptographic Solutions, including Shared Secret Managers, and Key Management processes used within Cloud Service Provider environments storing, processing or transmitting Nationwide Information, must:\na) \tensure private cryptographic keys are never stored in the same Cloud Service Provider instance;\nb) \tbe stored and maintained by Nationwide in an on-premise key vault or in escrow with an approved key management provider;\nc) \tnot be stored with the cipher text or within any construct that is accessible with the same credentials by either the customer or the Cloud Service Provider;\nd) \timplement procedures for the secure destruction (i.e. crypto shredding) of keys as part of the exit arrangements for the Cloud Service Provider;\ne) \tbe supported by procedures to inform Nationwide (the tenant) of material changes within any cryptosystem protecting Nationwide Information in accordance with Supply Chain Management;\nf) \tbe supported by documented and exercised playbooks detailing the response and recovery plans for the compromise of the Cryptographic Solution and/or keys.",
        "groups": "",
        "rationale": "This provides segregation of keys/systems and confidentiality, integrity and availability controls for cryptographic keys.",
        "roleResponsible": [
            "Change Squads",
            "Engineering"
        ],
        "guidance": "",
        "mappings": {
            "NIST": [
                "PR.DS-1",
                "PR.DS-2",
                "PR.DS-5",
                "PR.IP-1",
                "PR.IP-2",
                "PR.IP-6"
            ]
        }
    },
    {
        "title": "Cryptography",
        "id": "SCS-CRYPTO-4.2",
        "description": "Shared Secret Managers storing, processing or transmitting Nationwide Information must:\na) \tbe installed and hardened in accordance with Systems Configuration;\nb) \tencrypt all traffic between the secret manager and consuming systems;\nc) \trestrict network traffic in accordance with Network Management;\nd) \tnot retain credentials or Hardware Security Module (HSM) pins in clear text;\ne) \thave default privileged accounts revoked in accordance with the Privileged Account types defined within Privileged Access Management;\nf) \timplement logging in accordance with Logging and Monitoring;\ng) \trestrict access to storage and audit trails to authorised users in accordance with Privileged Access Management;\nh) \tbe regularly maintained along with supporting applications and infrastructure in accordance with Systems Maintenance.",
        "groups": "",
        "rationale": "These steps are required to provide the shared secret manager solution with the best security possible, as required by Nationwide.",
        "roleResponsible": [
            "Engineering",
            "Security Architecture"
        ],
        "guidance": "",
        "mappings": {
            "NIST": [
                "PR.DS-1",
                "PR.DS-2",
                "PR.DS-5",
                "PR.IP-1",
                "PR.IP-2",
                "PR.IP-6"
            ]
        }
    },
    {
        "title": "Cryptography",
        "id": "SCS-CRYPTO-4.3",
        "description": "Response and Recovery playbooks for the compromise of Shared Secret Managers must be developed, included in the Cyber Playbook, and exercised at least annually in accordance with Business Continuity and Disaster Recovery processes and Security Incident Management.",
        "groups": "",
        "rationale": "These procedures may be critical should a security incident take place that impacts the shared secret manager or the data within it.",
        "roleResponsible": [
            "Security & Resilience"
        ],
        "guidance": "",
        "mappings": {
            "NIST": [
                "PR.DS-1",
                "PR.DS-2",
                "PR.DS-5",
                "PR.IP-1",
                "PR.IP-2",
                "PR.IP-6"
            ]
        }
    },
    {
        "title": "Cryptography",
        "id": "SCS-CRYPTO-5.1",
        "description": "Public Key Infrastructure (PKI) procedures, deployment and operation must:\na) \tbe authorised by Security;\nb) \tbe supported by establishing a root Certificate Authority (CA);\nc) \tuse a consistent, trusted date and time source to ensure the Certificate Authority (CA) provides accurate timestamps;\nd) \tdesign fall-back and contingency procedures for the loss of availability of PKI;\ne) \tdevelop and test response and recovery procedures for the compromise or suspected compromise of the PKI as part of a Security Incident.",
        "groups": "",
        "rationale": "As a PKI infrastructure is an integral part of certain processes it requires full coverage of Confidentiality, Integrity and Availability controls.",
        "roleResponsible": [
            "Information Asset Owner",
            "Security & Resilience"
        ],
        "guidance": "Follow intranet content for approved PKIs http://www.nationwideintranet.co.uk/My-Nationwide/Life-at-Nationwide/Security-at-Nationwide/Security-advice/Pages/Certificate-and-Key-Management.aspx",
        "mappings": {
            "NIST": [
                "PR.DS-1",
                "PR.DS-2",
                "PR.DS-5",
                "PR.IP-1",
                "PR.IP-2",
                "PR.IP-6"
            ]
        }
    },
    {
        "title": "Cryptography",
        "id": "SCS-CRYPTO-5.2",
        "description": "Certificate Authorities (CA) (and related sub-Certificate Authorities) must:\na) \tuse a Certification Practice Statement (CPS) that defines the practices employed by the CA in issuing digital certificates;\nb) \tuse Certificate Policies (CP) for each type of digital certificate issued by the CA, which indicate the applicability of the certificates issued (e.g. for secure email or e-commerce transactions);\nc) \tensure certificate templates are set-up and suitable for single purpose use (i.e. encryption or digital signing);\nd) \tgenerate public key certificates (digital certificates);\ne) \trevoke public key certificates and publish revocation status;\nf) \tpublish public key certificates and Certificate Revocation Lists (CRLs) in directories;\ng) \tarchive public key certificates and CRLs in an archive database;\nh) \trestrict access to the least number of individuals in accordance with Privileged Access Management;\ni) \tbe device and appliance hardened as part of a Build Standard;\nj) \tprotect private keys by storage on approved Hardware and sharing them across two of more authorised individuals to avoid misuse of the certification authority.",
        "groups": "",
        "rationale": "As a Certificate Authority is an integral part of certain processes it requires full coverage of Confidentiality, Integrity and Availability controls.",
        "roleResponsible": [
            "IT Custodian",
            "IT Support",
            "Security & Resilience"
        ],
        "guidance": "Follow intranet content for approved PKIs http://www.nationwideintranet.co.uk/My-Nationwide/Life-at-Nationwide/Security-at-Nationwide/Security-advice/Pages/Certificate-and-Key-Management.aspx",
        "mappings": {
            "NIST": [
                "PR.DS-1",
                "PR.DS-2",
                "PR.DS-5",
                "PR.IP-1",
                "PR.IP-2",
                "PR.IP-6"
            ]
        }
    },
    {
        "title": "Cryptography",
        "id": "SCS-CRYPTO-5.3",
        "description": "The Registration Authority (RA) must:\na) \tverify the identity of individuals requiring the use of the PKI;\nb) \tissue authentication mechanisms where used as part of the PKI;\nc) \tmaintain oversight of cryptographic key generation;\nd) \tgenerate and submit requests for the issuance of PKI (root and issuing CA) certificates.",
        "groups": "",
        "rationale": "This provides levels of assurance and oversight in relation to PKI access and use.",
        "roleResponsible": [
            "IT Custodian",
            "IT Support",
            "Security & Resilience"
        ],
        "guidance": "Follow intranet content for approved PKIs http://www.nationwideintranet.co.uk/My-Nationwide/Life-at-Nationwide/Security-at-Nationwide/Security-advice/Pages/Certificate-and-Key-Management.aspx",
        "mappings": {
            "NIST": [
                "PR.DS-1",
                "PR.DS-2",
                "PR.DS-5",
                "PR.IP-1",
                "PR.IP-2",
                "PR.IP-6"
            ]
        }
    },
    {
        "title": "Cryptography",
        "id": "SCS-CRYPTO-5.4",
        "description": "Users of the Public Key Infrastructure (PKI) must be made aware of:\na) \tthe purpose and function of the PKI;\nb) \ttheir responsibilities;\nc) \thow to use the PKI.",
        "groups": "",
        "rationale": "This helps ensure the PKI is used in an appropriate and secure way.",
        "roleResponsible": [
            "IT Custodian",
            "IT Support",
            "Security & Resilience"
        ],
        "guidance": "Follow intranet content for approved PKIs http://www.nationwideintranet.co.uk/My-Nationwide/Life-at-Nationwide/Security-at-Nationwide/Security-advice/Pages/Certificate-and-Key-Management.aspx",
        "mappings": {
            "NIST": [
                "PR.DS-1",
                "PR.DS-2",
                "PR.DS-5",
                "PR.IP-1",
                "PR.IP-2",
                "PR.IP-6"
            ]
        }
    },
    {
        "title": "Cryptography",
        "id": "SCS-CRYPTO-6.2.1",
        "description": "Nationwide Information, inclusive of cardholder data (such as Primary Account Numbers [PANs]), must be subject to an Information Security Risk Assessment to evaluate if the information must be protected using tokenization.",
        "groups": "",
        "rationale": "Completing an Information Security Risk Assessment will identify other controls or lack of controls of the system/process that will help identify whether tokenisation is beneficial/necessary or not.",
        "roleResponsible": [
            "Information Asset Owner"
        ],
        "guidance": "",
        "mappings": {
            "NIST": [
                "PR.DS-1",
                "PR.DS-2",
                "PR.DS-5",
                "PR.IP-1",
                "PR.IP-2",
                "PR.IP-6"
            ]
        }
    },
    {
        "title": "Cryptography",
        "id": "SCS-CRYPTO-6.2.2",
        "description": "Tokenization solutions that are owned, developed or utilised by Nationwide for the processing, storage or transmission of Nationwide Information must:\na) \tbe supported by a developed and maintained Threat Model in accordance with Information Security Risk Assessment;\nb) \tbe acquired and approved in accordance with Supply Chain Management and Systems Development Lifecycle;\nc) \tbe assessed for technical vulnerabilities in accordance with Technical Vulnerability Management; \nd) \tmanage privileged access to control planes in accordance with Privileged Access Management;\ne) \tvalidate the integrity of the tokenization system on a continuous basis;\nf) \tprovide audit trails of all tokenization system activities in accordance with Logging and Monitoring;\ng) \timplement key management processes for encrypting data within any data vault in accordance with Cryptography;\nh) \tensure compliance with all applicable legal, regulatory and contractual requirements and obligations, including the Payment Card Industry Data Security Standard (PCI-DSS);\ni) \tbe supported by documented and tested remediation and tokenization system isolation strategies for key compromise;\nj) \tdevelop backup and contingency plans for the recovery of any data vault, which implement the same security controls as the primary system;\nk) \tengage the Security Function for consultation on the proposed solution.",
        "groups": "",
        "rationale": "The requirements in 6.2.2. are required due to the sensitivity and potential targeting of a system of this type, and the data stored or processed by it.",
        "roleResponsible": [
            "Information Asset Owner",
            "Change Squads"
        ],
        "guidance": "",
        "mappings": {
            "NIST": [
                "PR.DS-1",
                "PR.DS-2",
                "PR.DS-5",
                "PR.IP-1",
                "PR.IP-2",
                "PR.IP-6"
            ]
        }
    },
    {
        "title": "Systems Maintenance",
        "id": "SCS-SYSMAINT-1.1",
        "description": "Capacity and demand management plans must be developed for Platinum and Gold Nationwide IT Systems and Nationwide IT Networks to project future capacity requirements for new business and system requirements and identify current and projected trends in processing capabilities in accordance with Operational Resilience.",
        "groups": "",
        "rationale": "",
        "roleResponsible": [
            "Information Asset Owner",
            "IT Support",
            "Change Squads"
        ],
        "guidance": "",
        "mappings": {
            "NIST": [
                "PR.DS-3",
                "PR.DS-4"
            ]
        }
    },
    {
        "title": "Systems Maintenance",
        "id": "SCS-SYSMAINT-1.2",
        "description": "Capacity monitoring and tuning of Nationwide IT Systems and Nationwide IT Networks must be performed to:\na) \tensure effective capacity management to determine baseline current and future capacity requirements; \nb) \treview current utilisation at normal and peak periods and develop response plans;\nc) \tensure the availability of security logs in accordance with Logging and Monitoring;\nd) \tdetect trends in usage related to business applications or information systems management tools.",
        "groups": "",
        "rationale": "",
        "roleResponsible": [
            "Information Asset Owner",
            "IT Support",
            "Change Squads"
        ],
        "guidance": "",
        "mappings": {
            "NIST": [
                "PR.DS-3",
                "PR.DS-4",
                "PR.IP-4"
            ]
        }
    },
    {
        "title": "Systems Maintenance",
        "id": "SCS-SYSMAINT-2.1",
        "description": "Backups of Nationwide Information and Nationwide IT Systems must be performed based on the needs of the Information Asset Owner and related Business Service Lines to meet Recovery Point Objectives, Recovery Time Objectives, retention and protection requirements defined within the Business Impact Assessment (HARM) . ",
        "groups": "",
        "rationale": "",
        "roleResponsible": [
            "IT Custodian",
            "IT Support"
        ],
        "guidance": "",
        "mappings": {
            "NIST": [
                "PR.IP-4",
                "ID.RA-4"
            ]
        }
    },
    {
        "title": "Systems Maintenance",
        "id": "SCS-SYSMAINT-2.2",
        "description": "Backups must: \na) \tbe supported by documented procedures detailing:\ni.\tthe method, location, security requirements, and frequency of backups;\nii.\tthe steps to be taken to restore backups;\nb) \tenable accurate and complete backups to be produced;\nc) \tbe physically or logically segregated from the production or non-production environment; \nd) \tbe stored and transported with an equivalent level of physical and environmental protection as applied at the primary site in accordance with Information Handling and Management;\ne) \tbe encrypted in transit and at rest in accordance with Cryptography;\nf) \tmeet all relevant legal, regulatory and contractual requirements including Data Retention schedules.",
        "groups": "",
        "rationale": "",
        "roleResponsible": [
            "IT Custodian",
            "IT Support"
        ],
        "guidance": "",
        "mappings": {
            "NIST": [
                "PR.IP-4",
                "ID.RA-4",
                "PR.DS-1",
                "PR.DS-2",
                "PR.DS-3",
                "PR.DS-4"
            ]
        }
    },
    {
        "title": "Systems Maintenance",
        "id": "SCS-SYSMAINT-2.3",
        "description": "Backup procedures must: \na) \tutilise backup management software for job control and scheduling;\nb) \tverify the completeness and integrity of backup jobs;\nc) \tprotect backups from accidental overwriting;\nd) \trestrict physical and logical access to backups and scheduling tooling in accordance with Privileged Access Management inclusive of applying the principle of least privilege; \ne) \tonly enable changes to backup schedules in accordance with Change Management;\nf) \tclearly and accurately label and inventory backups and/or backup media as applicable in accordance with Information Classification and Information Asset Inventory;\ng) \tmonitor the execution of backups, address failures of scheduled backups and take action where necessary to ensure completeness of backups;\nh) \tprovide a protected audit trail that cannot be modified of backups performed to a centralised log server or to media that is difficult to alter",
        "groups": "",
        "rationale": "",
        "roleResponsible": [
            "IT Custodian",
            "IT Support"
        ],
        "guidance": "",
        "mappings": {
            "NIST": [
                "PR.DS-5",
                "PR.DS-6",
                "PR.PT-1",
                "ID.AM-1",
                "ID.AM-2",
                "PR.IP-4"
            ]
        }
    },
    {
        "title": "Systems Maintenance",
        "id": "SCS-SYSMAINT-2.4",
        "description": "Backup restoration must be tested at least annually for all services supporting Platinum Business Service Lines, Tier 1 and Tier 2 Nationwide IT Systems or earlier in the event of material change or incident on dedicated test media/environments to validate these meet restoration times in accordance with Business Continuity and Disaster Recovery processes.",
        "groups": "",
        "rationale": "",
        "roleResponsible": [
            "IT Custodian",
            "IT Support"
        ],
        "guidance": "",
        "mappings": {
            "NIST": [
                "PR.DS-5",
                "PR.DS-6",
                "PR.IP-4"
            ]
        }
    },
    {
        "title": "Systems Maintenance",
        "id": "SCS-SYSMAINT-2.5",
        "description": "Backup restoration planning, scheduling, testing and response and recovery playbooks must include consideration for the recovery from cyber-attacks inclusive of ransomware and a loss of data integrity.",
        "groups": "",
        "rationale": "",
        "roleResponsible": [
            "IT Custodian",
            "IT Support"
        ],
        "guidance": "",
        "mappings": {
            "NIST": [
                "PR.DS-5",
                "PR.DS-6",
                "PR.IP-4",
                "PR.IP-9",
                "PR.IP-10"
            ]
        }
    },
    {
        "title": "Systems Maintenance",
        "id": "SCS-SYSMAINT-2.6",
        "description": "Backups of Nationwide Information must be securely deleted in accordance with Information Handling & Management.",
        "groups": "",
        "rationale": "",
        "roleResponsible": [
            "IT Custodian",
            "IT Support"
        ],
        "guidance": "",
        "mappings": {
            "NIST": [
                "PR.DS-5",
                "PR.DS-6",
                "PR.IP-4"
            ]
        }
    },
    {
        "title": "Systems Maintenance",
        "id": "SCS-SYSMAINT-3.1",
        "description": "Change management procedures for Nationwide IT Systems must be documented and include requirements to:\na) \tdocument all change requests;\nb) \tauthorise all changes by the change approver or change management board;\nc) \ttest changes prior to release;\nd) \tassess potential business, technical and security impacts; \ne) \tupdate operating documentation and user procedures;\nf) \tvalidate that security controls are not compromised by the change; \ng) \tconfirm that technical vulnerabilities are remediated, or risks accepted by the Information Asset Owner;\nh) \tconfirm that only authorised changes have been performed;\ni) \tcommunicate change details to all relevant and/or affected individuals; \nj) \tdefine a roll-back strategy and procedures prior to implementing any changes in the event that changes are unsuccessful and recovery is required;\nk) \tmaintain version control for all software updates;\nl) \tmaintain and retain an audit log of all relevant information; \nm) \tminimise operational and business impacts;\nn) \tapply implementation checks to validate compliance with Build Standards in accordance with Security Configuration Management;\no) \testablish procedures for providing an emergency fix for controlled implementation of changes needed to resolve a security incident in accordance with Emergency Fixes.",
        "groups": "Group 2",
        "rationale": "",
        "roleResponsible": [
            "IT Support",
            "Change Squads"
        ],
        "guidance": "Project to ensure they are following the corporate Change Management solution else they will need to evidence full compliance.",
        "mappings": {
            "NIST": [
                "PR.DS-5",
                "PR.DS-6",
                "PR.IP-4",
                "PR.IP-9",
                "PR.IP-10",
                "PR.IP-3"
            ]
        }
    },
    {
        "title": "Systems Maintenance",
        "id": "SCS-SYSMAINT-3.2",
        "description": "Changes performed on Nationwide IT Systems and Nationwide IT Networks must be:\na) \trecorded and logged;\nb) \tonly accepted from authorised individuals;\nc) \tassessed for potential business impacts;\nd) \tperformed by authorised and competent individuals;\ne) \tverified to ensure that they meet existing compliance and regulatory requirements;\nf) \ttested to ensure new technical vulnerabilities have not been introduced; \ng) \tsubject to version control;\nh) \tcompleted within the approved change duration;\ni) \tsupported by a change record detailing what was changed, when and by whom;\nj) \tcommunicated to relevant individuals;\nk) \tchecked to confirm that only the intended change has been made;\nl) \treviewed to assess any impact on the classification of Nationwide Information and Nationwide IT Systems; \nm) \tsupported by roll-back procedures;\nn) \tapproved by the change approver or change approval board.",
        "groups": "Group 2",
        "rationale": "",
        "roleResponsible": [
            "Change Squads",
            "Security Operations Centre"
        ],
        "guidance": "",
        "mappings": {
            "NIST": [
                "PR.DS-5",
                "PR.DS-6",
                "PR.IP-4",
                "PR.IP-9",
                "PR.IP-10",
                "PR.IP-3"
            ]
        }
    },
    {
        "title": "Systems Maintenance",
        "id": "SCS-SYSMAINT-3.3",
        "description": "There must be procedures for the application of emergency security changes which must follow the overall Change Management procedures.",
        "groups": "Group 2",
        "rationale": "",
        "roleResponsible": [
            "Change Squads",
            "Security Operations Centre"
        ],
        "guidance": "Project to ensure they are following the corporate Change Management solution else they will need to evidence full compliance.",
        "mappings": {
            "NIST": [
                "PR.IP-3"
            ]
        }
    },
    {
        "title": "Systems Maintenance",
        "id": "SCS-SYSMAINT-3.4",
        "description": "Physical or logical access must only be provided for suppliers to undertake maintenance for the approved duration of the change in accordance with Network Management and Privileged Access Management.",
        "groups": "Group 2",
        "rationale": "",
        "roleResponsible": [
            "Change Squads",
            "Security Operations Centre"
        ],
        "guidance": "",
        "mappings": {
            "NIST": [
                "ID.AM-6",
                "PR.AT-3"
            ]
        }
    },
    {
        "title": "Systems Maintenance",
        "id": "SCS-SYSMAINT-3.5",
        "description": "Information Asset Owner and Business Service Line Owners must maintain use cases where a logging requirement is identified as part of a change request and ensure any revised use cases are provided to the SOC.",
        "groups": "Group 2",
        "rationale": "",
        "roleResponsible": [
            "Information Asset Owner",
            "Business Service Lines Owner"
        ],
        "guidance": "",
        "mappings": {
            "NIST": [
                "PR.AT-3",
                "PR.IP-3"
            ]
        }
    },
    {
        "title": "Systems Maintenance",
        "id": "SCS-SYSMAINT-4.2",
        "description": "Patches must be installed in accordance with the agreed and documented patch management process for the technology platform and software. ",
        "groups": "",
        "rationale": "",
        "roleResponsible": [
            "IT Support",
            "Change Squads",
            "End User Services"
        ],
        "guidance": "",
        "mappings": {
            "NIST": [
                "PR.MA-1",
                "PR.MA-2"
            ]
        }
    },
    {
        "title": "Systems Maintenance",
        "id": "SCS-SYSMAINT-4.3",
        "description": "Patches that cannot be deployed within the agreed and documented patch management process must be escalated to the Threat and Vulnerability Authority (TVA) for the performance of a technical vulnerability assessment and to identify compensating controls in accordance with Technical Vulnerability Management.",
        "groups": "",
        "rationale": "",
        "roleResponsible": [
            "IT Support",
            "Change Squads",
            "End User Services"
        ],
        "guidance": "",
        "mappings": {
            "NIST": [
                "PR.MA-1",
                "PR.MA-2",
                "PR.IP-12"
            ]
        }
    },
    {
        "title": "Systems Maintenance",
        "id": "SCS-SYSMAINT-5.1",
        "description": "Operating procedures for Nationwide IT Systems, inclusive of those within Cloud Service Provider tenancies with Nationwide responsibility, must be developed and maintained in accordance with Acceptance into Service procedures. Operating procedures must:\na) \tbe documented and maintained in accordance with Change Management; \nb) \tbe made available to all users who need them and must specify the operational instructions;\nc) \tensure the secure installation and configuration of Nationwide IT Systems in accordance with Systems Configuration;\nd) \tensure the secure processing and handling of Nationwide Information, both automated and manual;\ne) \tinclude roles and responsibilities for backup management, jobs scheduling, dependency management, output handling, system restart and recovery;\nf) \tprovide audit-trails and Nationwide IT System log information;\ng) \tspecify monitoring procedures and reporting requirements;\nh) \tinclude instructions for handling errors or other exceptional conditions;\ni) \tsupport and escalate contacts including external support contacts in the event of unexpected operational or technical difficulties.",
        "groups": "",
        "rationale": "",
        "roleResponsible": [
            "IT Custodian",
            "IT Support",
            "Engineering",
            "Security & Resilience"
        ],
        "guidance": "",
        "mappings": {
            "NIST": [
                "PR.DS-5",
                "PR.DS-6",
                "PR.PT-1",
                "ID.AM-1",
                "ID.AM-2",
                "PR.IP-4"
            ]
        }
    },
    {
        "title": "Systems Maintenance",
        "id": "SCS-SYSMAINT-5.2",
        "description": "Nationwide IT Systems must be managed consistently using the same procedures, tools and utilities where appropriate.",
        "groups": "",
        "rationale": "",
        "roleResponsible": [
            "IT Custodian",
            "IT Support",
            "Engineering",
            "Security & Resilience"
        ],
        "guidance": "",
        "mappings": {
            "NIST": [
                "PR.DS-5",
                "PR.DS-6",
                "PR.PT-1",
                "ID.AM-1",
                "ID.AM-2",
                "PR.IP-4"
            ]
        }
    },
    {
        "title": "Systems Maintenance",
        "id": "SCS-SYSMAINT-6.1",
        "description": "Software licensing requirements must be met by:\na) \tobtaining adequate licenses for planned use such that the maximum number of users permitted within the license is not exceeded;\nb) \tobtaining and maintaining proof of ownership of software.",
        "groups": "Group 2",
        "rationale": "",
        "roleResponsible": [
            "IT Support"
        ],
        "guidance": "",
        "mappings": {
            "NIST": [
                "ID.AM-2"
            ]
        }
    },
    {
        "title": "Systems Maintenance",
        "id": "SCS-SYSMAINT-6.2",
        "description": "A software licensing process must be operated across all Nationwide IT Systems and Nationwide IT Networks, inclusive of those hosted within Cloud Service Provider environments and Mobile Computing environments, to ensure the completeness and accuracy of the software asset inventory, utilising automated scanning where possible. ",
        "groups": "Group 2",
        "rationale": "",
        "roleResponsible": [
            "IT Support"
        ],
        "guidance": "",
        "mappings": {
            "NIST": [
                "ID.AM-2"
            ]
        }
    },
    {
        "title": "Systems Maintenance",
        "id": "SCS-SYSMAINT-6.3",
        "description": "The Software Asset Inventory process must:\na) \tupdate the Asset Management Database [AMDB], or equivalent, with information on the software type, vendor and version;\nb) \tremove any entries for software decommissioned;\nc) \treconcile approved licenses with current licencing, patch status/version and alert on any discrepancies.",
        "groups": "Group 2",
        "rationale": "",
        "roleResponsible": [
            "IT Support"
        ],
        "guidance": "",
        "mappings": {
            "NIST": [
                "ID.AM-2"
            ]
        }
    },
    {
        "title": "Systems Maintenance",
        "id": "SCS-SYSMAINT-6.4",
        "description": "Any unlicensed or unapproved software that is identified must be investigated and removed immediately, or required licences purchased. The rectification process must:\na) \tperform root cause analysis to identify the software installation process;\nb) \tcorrect any identified control weaknesses to prevent installation of unlicensed software;\nc) \tinitiate any applicable disciplinary process in accordance with Employee Lifecycle.",
        "groups": "Group 2",
        "rationale": "",
        "roleResponsible": [
            "IT Support"
        ],
        "guidance": "",
        "mappings": {
            "NIST": [
                "ID.AM-2"
            ]
        }
    }
];
