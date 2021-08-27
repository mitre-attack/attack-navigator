export let nist = [
  {
    "secFunction": "IDENTIFY (ID)",
    "category": {
      "id": "Asset Management (ID.AM)",
      "description": "The data, personnel, devices, systems, and facilities that enable the organization to achieve business purposes are identified and managed consistent with their relative importance to organizational objectives and the organization’s risk strategy."
    },
    "subcategory": {
      "id": "ID.AM-1",
      "description": "Physical devices and systems within the organization are inventoried"
    },
    "mappings": {
      "CIS CSC": [
        "1"
      ],
      "COBIT 5": [
        "BAI09.01",
        "BAI09.02"
      ],
      "ISA 62443-2-1:2009": [
        "4.2.3.4"
      ],
      "ISA 62443-3-3:2013": [
        "SR 7.8"
      ],
      "ISO/IEC 27001:2013": [
        "A.8.1.1",
        "A.8.1.2"
      ],
      "NIST SP 800-53 Rev. 4": [
        "CM-8",
        "PM-5"
      ]
    }
  },
  {
    "secFunction": "IDENTIFY (ID)",
    "category": {
      "id": "Asset Management (ID.AM)",
      "description": "The data, personnel, devices, systems, and facilities that enable the organization to achieve business purposes are identified and managed consistent with their relative importance to organizational objectives and the organization’s risk strategy."
    },
    "subcategory": {
      "id": "ID.AM-2",
      "description": "Software platforms and applications within the organization are inventoried"
    },
    "mappings": {
      "CIS CSC": [
        "2"
      ],
      "COBIT 5": [
        "BAI09.01",
        "BAI09.02",
        "BAI09.05"
      ],
      "ISA 62443-2-1:2009": [
        "4.2.3.4"
      ],
      "ISA 62443-3-3:2013": [
        "SR 7.8"
      ],
      "ISO/IEC 27001:2013": [
        "A.8.1.1",
        "A.8.1.2",
        "A.12.5.1"
      ],
      "NIST SP 800-53 Rev. 4": [
        "CM-8",
        "PM-5"
      ]
    }
  },
  {
    "secFunction": "IDENTIFY (ID)",
    "category": {
      "id": "Asset Management (ID.AM)",
      "description": "The data, personnel, devices, systems, and facilities that enable the organization to achieve business purposes are identified and managed consistent with their relative importance to organizational objectives and the organization’s risk strategy."
    },
    "subcategory": {
      "id": "ID.AM-3",
      "description": "Organizational communication and data flows are mapped"
    },
    "mappings": {
      "CIS CSC": [
        "12"
      ],
      "COBIT 5": [
        "DSS05.02"
      ],
      "ISA 62443-2-1:2009": [
        "4.2.3.4"
      ],
      "ISO/IEC 27001:2013": [
        "A.13.2.1",
        "A.13.2.2"
      ],
      "NIST SP 800-53 Rev. 4": [
        "AC-4",
        "CA-3",
        "CA-9",
        "PL-8"
      ]
    }
  },
  {
    "secFunction": "IDENTIFY (ID)",
    "category": {
      "id": "Asset Management (ID.AM)",
      "description": "The data, personnel, devices, systems, and facilities that enable the organization to achieve business purposes are identified and managed consistent with their relative importance to organizational objectives and the organization’s risk strategy."
    },
    "subcategory": {
      "id": "ID.AM-4",
      "description": "External information systems are catalogued"
    },
    "mappings": {
      "CIS CSC": [
        "12"
      ],
      "COBIT 5": [
        "APO02.02",
        "APO10.04",
        "DSS01.02"
      ],
      "ISO/IEC 27001:2013": [
        "A.11.2.6"
      ],
      "NIST SP 800-53 Rev. 4": [
        "AC-20",
        "SA-9"
      ]
    }
  },
  {
    "secFunction": "IDENTIFY (ID)",
    "category": {
      "id": "Asset Management (ID.AM)",
      "description": "The data, personnel, devices, systems, and facilities that enable the organization to achieve business purposes are identified and managed consistent with their relative importance to organizational objectives and the organization’s risk strategy."
    },
    "subcategory": {
      "id": "ID.AM-5",
      "description": "Resources (e.g., hardware, devices, data, time, personnel, and software) are prioritized based on their classification, criticality, and business value"
    },
    "mappings": {
      "CIS CSC": [
        "13",
        "14"
      ],
      "COBIT 5": [
        "APO03.03",
        "APO03.04",
        "APO12.01",
        "BAI04.02",
        "BAI09.02"
      ],
      "ISA 62443-2-1:2009": [
        "4.2.3.6"
      ],
      "ISO/IEC 27001:2013": [
        "A.8.2.1"
      ],
      "NIST SP 800-53 Rev. 4": [
        "CP-2",
        "RA-2",
        "SA-14",
        "SC-6"
      ]
    }
  },
  {
    "secFunction": "IDENTIFY (ID)",
    "category": {
      "id": "Asset Management (ID.AM)",
      "description": "The data, personnel, devices, systems, and facilities that enable the organization to achieve business purposes are identified and managed consistent with their relative importance to organizational objectives and the organization’s risk strategy."
    },
    "subcategory": {
      "id": "ID.AM-6",
      "description": "Cybersecurity roles and responsibilities for the entire workforce and third-party stakeholders (e.g., suppliers, customers, partners) are established"
    },
    "mappings": {
      "CIS CSC": [
        "17",
        "19"
      ],
      "COBIT 5": [
        "APO01.02",
        "APO07.06",
        "APO13.01",
        "DSS06.03"
      ],
      "ISA 62443-2-1:2009": [
        "4.3.2.3.3"
      ],
      "ISO/IEC 27001:2013": [
        "A.6.1.1"
      ],
      "NIST SP 800-53 Rev. 4": [
        "CP-2",
        "PS-7",
        "PM-11"
      ]
    }
  },
  {
    "secFunction": "IDENTIFY (ID)",
    "category": {
      "id": "Business Environment (ID.BE)",
      "description": "The organization’s mission, objectives, stakeholders, and activities are understood and prioritized; this information is used to inform cybersecurity roles, responsibilities, and risk management decisions."
    },
    "subcategory": {
      "id": "ID.BE-1",
      "description": "The organization’s role in the supply chain is identified and communicated"
    },
    "mappings": {
      "COBIT 5": [
        "APO08.01",
        "APO08.04",
        "APO08.05",
        "APO10.03",
        "APO10.04",
        "APO10.05"
      ],
      "ISO/IEC 27001:2013": [
        "A.15.1.1",
        "A.15.1.2",
        "A.15.1.3",
        "A.15.2.1",
        "A.15.2.2"
      ],
      "NIST SP 800-53 Rev. 4": [
        "CP-2",
        "SA-12"
      ]
    }
  },
  {
    "secFunction": "IDENTIFY (ID)",
    "category": {
      "id": "Business Environment (ID.BE)",
      "description": "The organization’s mission, objectives, stakeholders, and activities are understood and prioritized; this information is used to inform cybersecurity roles, responsibilities, and risk management decisions."
    },
    "subcategory": {
      "id": "ID.BE-2",
      "description": "The organization’s place in critical infrastructure and its industry sector is identified and communicated"
    },
    "mappings": {
      "COBIT 5": [
        "APO02.06",
        "APO03.01"
      ],
      "ISO/IEC 27001:2013": [
        "Clause 4.1"
      ],
      "NIST SP 800-53 Rev. 4": [
        "PM-8"
      ]
    }
  },
  {
    "secFunction": "IDENTIFY (ID)",
    "category": {
      "id": "Business Environment (ID.BE)",
      "description": "The organization’s mission, objectives, stakeholders, and activities are understood and prioritized; this information is used to inform cybersecurity roles, responsibilities, and risk management decisions."
    },
    "subcategory": {
      "id": "ID.BE-3",
      "description": "Priorities for organizational mission, objectives, and activities are established and communicated"
    },
    "mappings": {
      "COBIT 5": [
        "APO02.01",
        "APO02.06",
        "APO03.01"
      ],
      "ISA 62443-2-1:2009": [
        "4.2.2.1",
        "4.2.3.6"
      ],
      "NIST SP 800-53 Rev. 4": [
        "PM-11",
        "SA-14"
      ]
    }
  },
  {
    "secFunction": "IDENTIFY (ID)",
    "category": {
      "id": "Business Environment (ID.BE)",
      "description": "The organization’s mission, objectives, stakeholders, and activities are understood and prioritized; this information is used to inform cybersecurity roles, responsibilities, and risk management decisions."
    },
    "subcategory": {
      "id": "ID.BE-4",
      "description": "Dependencies and critical functions for delivery of critical services are established"
    },
    "mappings": {
      "COBIT 5": [
        "APO10.01",
        "BAI04.02",
        "BAI09.02"
      ],
      "ISO/IEC 27001:2013": [
        "A.11.2.2",
        "A.11.2.3",
        "A.12.1.3"
      ],
      "NIST SP 800-53 Rev. 4": [
        "CP-8",
        "PE-9",
        "PE-11",
        "PM-8",
        "SA-14"
      ]
    }
  },
  {
    "secFunction": "IDENTIFY (ID)",
    "category": {
      "id": "Business Environment (ID.BE)",
      "description": "The organization’s mission, objectives, stakeholders, and activities are understood and prioritized; this information is used to inform cybersecurity roles, responsibilities, and risk management decisions."
    },
    "subcategory": {
      "id": "ID.BE-5",
      "description": "Resilience requirements to support delivery of critical services are established for all operating states (e.g. under duress/attack, during recovery, normal operations)"
    },
    "mappings": {
      "COBIT 5": [
        "BAI03.02",
        "DSS04.02"
      ],
      "ISO/IEC 27001:2013": [
        "A.11.1.4",
        "A.17.1.1",
        "A.17.1.2",
        "A.17.2.1"
      ],
      "NIST SP 800-53 Rev. 4": [
        "CP-2",
        "CP-11",
        "SA-13",
        "SA-14"
      ]
    }
  },
  {
    "secFunction": "IDENTIFY (ID)",
    "category": {
      "id": "Governance (ID.GV)",
      "description": "The policies, procedures, and processes to manage and monitor the organization’s regulatory, legal, risk, environmental, and operational requirements are understood and inform the management of cybersecurity risk."
    },
    "subcategory": {
      "id": "ID.GV-1",
      "description": "Organizational cybersecurity policy is established and communicated"
    },
    "mappings": {
      "CIS CSC": [
        "19"
      ],
      "COBIT 5": [
        "APO01.03",
        "APO13.01",
        "EDM01.01",
        "EDM01.02"
      ],
      "ISA 62443-2-1:2009": [
        "4.3.2.6"
      ],
      "ISO/IEC 27001:2013": [
        "A.5.1.1"
      ],
      "NIST SP 800-53 Rev. 4": [
        "-1 controls from all security control families"
      ]
    }
  },
  {
    "secFunction": "IDENTIFY (ID)",
    "category": {
      "id": "Governance (ID.GV)",
      "description": "The policies, procedures, and processes to manage and monitor the organization’s regulatory, legal, risk, environmental, and operational requirements are understood and inform the management of cybersecurity risk."
    },
    "subcategory": {
      "id": "ID.GV-2",
      "description": "Cybersecurity roles and responsibilities are coordinated and aligned with internal roles and external partners"
    },
    "mappings": {
      "CIS CSC": [
        "19"
      ],
      "COBIT 5": [
        "APO01.02",
        "APO10.03",
        "APO13.02",
        "DSS05.04"
      ],
      "ISA 62443-2-1:2009": [
        "4.3.2.3.3"
      ],
      "ISO/IEC 27001:2013": [
        "A.6.1.1",
        "A.7.2.1",
        "A.15.1.1"
      ],
      "NIST SP 800-53 Rev. 4": [
        "PS-7",
        "PM-1",
        "PM-2"
      ]
    }
  },
  {
    "secFunction": "IDENTIFY (ID)",
    "category": {
      "id": "Governance (ID.GV)",
      "description": "The policies, procedures, and processes to manage and monitor the organization’s regulatory, legal, risk, environmental, and operational requirements are understood and inform the management of cybersecurity risk."
    },
    "subcategory": {
      "id": "ID.GV-3",
      "description": "Legal and regulatory requirements regarding cybersecurity, including privacy and civil liberties obligations, are understood and managed"
    },
    "mappings": {
      "CIS CSC": [
        "19"
      ],
      "COBIT 5": [
        "BAI02.01",
        "MEA03.01",
        "MEA03.04"
      ],
      "ISA 62443-2-1:2009": [
        "4.4.3.7"
      ],
      "ISO/IEC 27001:2013": [
        "A.18.1.1",
        "A.18.1.2",
        "A.18.1.3",
        "A.18.1.4",
        "A.18.1.5"
      ],
      "NIST SP 800-53 Rev. 4": [
        "-1 controls from all security control families"
      ]
    }
  },
  {
    "secFunction": "IDENTIFY (ID)",
    "category": {
      "id": "Governance (ID.GV)",
      "description": "The policies, procedures, and processes to manage and monitor the organization’s regulatory, legal, risk, environmental, and operational requirements are understood and inform the management of cybersecurity risk."
    },
    "subcategory": {
      "id": "ID.GV-4",
      "description": "Governance and risk management processes address cybersecurity risks"
    },
    "mappings": {
      "COBIT 5": [
        "EDM03.02",
        "APO12.02",
        "APO12.05",
        "DSS04.02"
      ],
      "ISA 62443-2-1:2009": [
        "4.2.3.1",
        "4.2.3.3",
        "4.2.3.8",
        "4.2.3.9",
        "4.2.3.11",
        "4.3.2.4.3",
        "4.3.2.6.3"
      ],
      "ISO/IEC 27001:2013": [
        "Clause 6"
      ],
      "NIST SP 800-53 Rev. 4": [
        "SA-2",
        "PM-3",
        "PM-7",
        "PM-9",
        "PM-10",
        "PM-11"
      ]
    }
  },
  {
    "secFunction": "IDENTIFY (ID)",
    "category": {
      "id": "Risk Assessment (ID.RA)",
      "description": "The organization understands the cybersecurity risk to organizational operations (including mission, functions, image, or reputation), organizational assets, and individuals."
    },
    "subcategory": {
      "id": "ID.RA-1",
      "description": "Asset vulnerabilities are identified and documented"
    },
    "mappings": {
      "CIS CSC": [
        "4"
      ],
      "COBIT 5": [
        "APO12.01",
        "APO12.02",
        "APO12.03",
        "APO12.04",
        "DSS05.01",
        "DSS05.02"
      ],
      "ISA 62443-2-1:2009": [
        "4.2.3",
        "4.2.3.7",
        "4.2.3.9",
        "4.2.3.12"
      ],
      "ISO/IEC 27001:2013": [
        "A.12.6.1",
        "A.18.2.3"
      ],
      "NIST SP 800-53 Rev. 4": [
        "CA-2",
        "CA-7",
        "CA-8",
        "RA-3",
        "RA-5",
        "SA-5",
        "SA-11",
        "SI-2",
        "SI-4",
        "SI-5"
      ]
    }
  },
  {
    "secFunction": "IDENTIFY (ID)",
    "category": {
      "id": "Risk Assessment (ID.RA)",
      "description": "The organization understands the cybersecurity risk to organizational operations (including mission, functions, image, or reputation), organizational assets, and individuals."
    },
    "subcategory": {
      "id": "ID.RA-2",
      "description": "Cyber threat intelligence is received from information sharing forums and sources"
    },
    "mappings": {
      "CIS CSC": [
        "4"
      ],
      "COBIT 5": [
        "BAI08.01"
      ],
      "ISA 62443-2-1:2009": [
        "4.2.3",
        "4.2.3.9",
        "4.2.3.12"
      ],
      "ISO/IEC 27001:2013": [
        "A.6.1.4"
      ],
      "NIST SP 800-53 Rev. 4": [
        "SI-5",
        "PM-15",
        "PM-16"
      ]
    }
  },
  {
    "secFunction": "IDENTIFY (ID)",
    "category": {
      "id": "Risk Assessment (ID.RA)",
      "description": "The organization understands the cybersecurity risk to organizational operations (including mission, functions, image, or reputation), organizational assets, and individuals."
    },
    "subcategory": {
      "id": "ID.RA-3",
      "description": "Threats, both internal and external, are identified and documented"
    },
    "mappings": {
      "CIS CSC": [
        "4"
      ],
      "COBIT 5": [
        "APO12.01",
        "APO12.02",
        "APO12.03",
        "APO12.04"
      ],
      "ISA 62443-2-1:2009": [
        "4.2.3",
        "4.2.3.9",
        "4.2.3.12"
      ],
      "ISO/IEC 27001:2013": [
        "Clause 6.1.2"
      ],
      "NIST SP 800-53 Rev. 4": [
        "RA-3",
        "SI-5",
        "PM-12",
        "PM-16"
      ]
    }
  },
  {
    "secFunction": "IDENTIFY (ID)",
    "category": {
      "id": "Risk Assessment (ID.RA)",
      "description": "The organization understands the cybersecurity risk to organizational operations (including mission, functions, image, or reputation), organizational assets, and individuals."
    },
    "subcategory": {
      "id": "ID.RA-4",
      "description": "Potential business impacts and likelihoods are identified"
    },
    "mappings": {
      "CIS CSC": [
        "4"
      ],
      "COBIT 5": [
        "DSS04.02"
      ],
      "ISA 62443-2-1:2009": [
        "4.2.3",
        "4.2.3.9",
        "4.2.3.12"
      ],
      "ISO/IEC 27001:2013": [
        "A.16.1.6",
        "Clause 6.1.2"
      ],
      "NIST SP 800-53 Rev. 4": [
        "RA-2",
        "RA-3",
        "SA-14",
        "PM-9",
        "PM-11"
      ]
    }
  },
  {
    "secFunction": "IDENTIFY (ID)",
    "category": {
      "id": "Risk Assessment (ID.RA)",
      "description": "The organization understands the cybersecurity risk to organizational operations (including mission, functions, image, or reputation), organizational assets, and individuals."
    },
    "subcategory": {
      "id": "ID.RA-5",
      "description": "Threats, vulnerabilities, likelihoods, and impacts are used to determine risk"
    },
    "mappings": {
      "CIS CSC": [
        "4"
      ],
      "COBIT 5": [
        "APO12.02"
      ],
      "ISO/IEC 27001:2013": [
        "A.12.6.1"
      ],
      "NIST SP 800-53 Rev. 4": [
        "RA-2",
        "RA-3",
        "PM-16"
      ]
    }
  },
  {
    "secFunction": "IDENTIFY (ID)",
    "category": {
      "id": "Risk Assessment (ID.RA)",
      "description": "The organization understands the cybersecurity risk to organizational operations (including mission, functions, image, or reputation), organizational assets, and individuals."
    },
    "subcategory": {
      "id": "ID.RA-6",
      "description": "Risk responses are identified and prioritized"
    },
    "mappings": {
      "CIS CSC": [
        "4"
      ],
      "COBIT 5": [
        "APO12.05",
        "APO13.02"
      ],
      "ISO/IEC 27001:2013": [
        "Clause 6.1.3"
      ],
      "NIST SP 800-53 Rev. 4": [
        "PM-4",
        "PM-9"
      ]
    }
  },
  {
    "secFunction": "IDENTIFY (ID)",
    "category": {
      "id": "Risk Management Strategy (ID.RM)",
      "description": "The organization’s priorities, constraints, risk tolerances, and assumptions are established and used to support operational risk decisions."
    },
    "subcategory": {
      "id": "ID.RM-1",
      "description": "Risk management processes are established, managed, and agreed to by organizational stakeholders"
    },
    "mappings": {
      "CIS CSC": [
        "4"
      ],
      "COBIT 5": [
        "APO12.04",
        "APO12.05",
        "APO13.02",
        "BAI02.03",
        "BAI04.02"
      ],
      "ISA 62443-2-1:2009": [
        "4.3.4.2"
      ],
      "ISO/IEC 27001:2013": [
        "Clause 6.1.3",
        "Clause 8.3",
        "Clause 9.3"
      ],
      "NIST SP 800-53 Rev. 4": [
        "PM-9"
      ]
    }
  },
  {
    "secFunction": "IDENTIFY (ID)",
    "category": {
      "id": "Risk Management Strategy (ID.RM)",
      "description": "The organization’s priorities, constraints, risk tolerances, and assumptions are established and used to support operational risk decisions."
    },
    "subcategory": {
      "id": "ID.RM-2",
      "description": "Organizational risk tolerance is determined and clearly expressed"
    },
    "mappings": {
      "COBIT 5": [
        "APO12.06"
      ],
      "ISA 62443-2-1:2009": [
        "4.3.2.6.5"
      ],
      "ISO/IEC 27001:2013": [
        "Clause 6.1.3",
        "Clause 8.3"
      ],
      "NIST SP 800-53 Rev. 4": [
        "PM-9"
      ]
    }
  },
  {
    "secFunction": "IDENTIFY (ID)",
    "category": {
      "id": "Risk Management Strategy (ID.RM)",
      "description": "The organization’s priorities, constraints, risk tolerances, and assumptions are established and used to support operational risk decisions."
    },
    "subcategory": {
      "id": "ID.RM-3",
      "description": "The organization’s determination of risk tolerance is informed by its role in critical infrastructure and sector specific risk analysis"
    },
    "mappings": {
      "COBIT 5": [
        "APO12.02"
      ],
      "ISO/IEC 27001:2013": [
        "Clause 6.1.3",
        "Clause 8.3"
      ],
      "NIST SP 800-53 Rev. 4": [
        "SA-14",
        "PM-8",
        "PM-9",
        "PM-11"
      ]
    }
  },
  {
    "secFunction": "IDENTIFY (ID)",
    "category": {
      "id": "Supply Chain Risk Management (ID.SC)",
      "description": "The organization’s priorities, constraints, risk tolerances, and assumptions are established and used to support risk decisions associated with managing supply chain risk. The organization has established and implemented the processes to identify, assess and manage supply chain risks."
    },
    "subcategory": {
      "id": "ID.SC-1",
      "description": "Cyber supply chain risk management processes are identified, established, assessed, managed, and agreed to by organizational stakeholders"
    },
    "mappings": {
      "CIS CSC": [
        "4"
      ],
      "COBIT 5": [
        "APO10.01",
        "APO10.04",
        "APO12.04",
        "APO12.05",
        "APO13.02",
        "BAI01.03",
        "BAI02.03",
        "BAI04.02"
      ],
      "ISA 62443-2-1:2009": [
        "4.3.4.2"
      ],
      "ISO/IEC 27001:2013": [
        "A.15.1.1",
        "A.15.1.2",
        "A.15.1.3",
        "A.15.2.1",
        "A.15.2.2"
      ],
      "NIST SP 800-53 Rev. 4": [
        "SA-9",
        "SA-12",
        "PM-9"
      ]
    }
  },
  {
    "secFunction": "IDENTIFY (ID)",
    "category": {
      "id": "Supply Chain Risk Management (ID.SC)",
      "description": "The organization’s priorities, constraints, risk tolerances, and assumptions are established and used to support risk decisions associated with managing supply chain risk. The organization has established and implemented the processes to identify, assess and manage supply chain risks."
    },
    "subcategory": {
      "id": "ID.SC-2",
      "description": "Suppliers and third party partners of information systems, components, and services are identified, prioritized, and assessed using a cyber supply chain risk assessment process"
    },
    "mappings": {
      "COBIT 5": [
        "APO10.01",
        "APO10.02",
        "APO10.04",
        "APO10.05",
        "APO12.01",
        "APO12.02",
        "APO12.03",
        "APO12.04",
        "APO12.05",
        "APO12.06",
        "APO13.02",
        "BAI02.03"
      ],
      "ISA 62443-2-1:2009": [
        "4.2.3.1",
        "4.2.3.2",
        "4.2.3.3",
        "4.2.3.4",
        "4.2.3.6",
        "4.2.3.8",
        "4.2.3.9",
        "4.2.3.10",
        "4.2.3.12",
        "4.2.3.13",
        "4.2.3.14"
      ],
      "ISO/IEC 27001:2013": [
        "A.15.2.1",
        "A.15.2.2"
      ],
      "NIST SP 800-53 Rev. 4": [
        "RA-2",
        "RA-3",
        "SA-12",
        "SA-14",
        "SA-15",
        "PM-9"
      ]
    }
  },
  {
    "secFunction": "IDENTIFY (ID)",
    "category": {
      "id": "Supply Chain Risk Management (ID.SC)",
      "description": "The organization’s priorities, constraints, risk tolerances, and assumptions are established and used to support risk decisions associated with managing supply chain risk. The organization has established and implemented the processes to identify, assess and manage supply chain risks."
    },
    "subcategory": {
      "id": "ID.SC-3",
      "description": "Contracts with suppliers and third-party partners are used to implement appropriate measures designed to meet the objectives of an organization’s cybersecurity program and Cyber Supply Chain Risk Management Plan."
    },
    "mappings": {
      "COBIT 5": [
        "APO10.01",
        "APO10.02",
        "APO10.03",
        "APO10.04",
        "APO10.05"
      ],
      "ISA 62443-2-1:2009": [
        "4.3.2.6.4",
        "4.3.2.6.7"
      ],
      "ISO/IEC 27001:2013": [
        "A.15.1.1",
        "A.15.1.2",
        "A.15.1.3"
      ],
      "NIST SP 800-53 Rev. 4": [
        "SA-9",
        "SA-11",
        "SA-12",
        "PM-9"
      ]
    }
  },
  {
    "secFunction": "IDENTIFY (ID)",
    "category": {
      "id": "Supply Chain Risk Management (ID.SC)",
      "description": "The organization’s priorities, constraints, risk tolerances, and assumptions are established and used to support risk decisions associated with managing supply chain risk. The organization has established and implemented the processes to identify, assess and manage supply chain risks."
    },
    "subcategory": {
      "id": "ID.SC-4",
      "description": "Suppliers and third-party partners are routinely assessed using audits, test results, or other forms of evaluations to confirm they are meeting their contractual obligations."
    },
    "mappings": {
      "COBIT 5": [
        "APO10.01",
        "APO10.03",
        "APO10.04",
        "APO10.05",
        "MEA01.01",
        "MEA01.02",
        "MEA01.03",
        "MEA01.04",
        "MEA01.05"
      ],
      "ISA 62443-2-1:2009": [
        "4.3.2.6.7"
      ],
      "ISA 62443-3-3:2013": [
        "SR 6.1"
      ],
      "ISO/IEC 27001:2013": [
        "A.15.2.1",
        "A.15.2.2"
      ],
      "NIST SP 800-53 Rev. 4": [
        "AU-2",
        "AU-6",
        "AU-12",
        "AU-16",
        "PS-7",
        "SA-9",
        "SA-12"
      ]
    }
  },
  {
    "secFunction": "IDENTIFY (ID)",
    "category": {
      "id": "Supply Chain Risk Management (ID.SC)",
      "description": "The organization’s priorities, constraints, risk tolerances, and assumptions are established and used to support risk decisions associated with managing supply chain risk. The organization has established and implemented the processes to identify, assess and manage supply chain risks."
    },
    "subcategory": {
      "id": "ID.SC-5",
      "description": "Response and recovery planning and testing are conducted with suppliers and third-party providers"
    },
    "mappings": {
      "CIS CSC": [
        "19",
        "20"
      ],
      "COBIT 5": [
        "DSS04.04"
      ],
      "ISA 62443-2-1:2009": [
        "4.3.2.5.7",
        "4.3.4.5.11"
      ],
      "ISA 62443-3-3:2013": [
        "SR 2.8",
        "SR 3.3",
        "SR.6.1",
        "SR 7.3",
        "SR 7.4"
      ],
      "ISO/IEC 27001:2013": [
        "A.17.1.3"
      ],
      "NIST SP 800-53 Rev. 4": [
        "CP-2",
        "CP-4",
        "IR-3",
        "IR-4",
        "IR-6",
        "IR-8",
        "IR-9"
      ]
    }
  },
  {
    "secFunction": "PROTECT (PR)",
    "category": {
      "id": "Identity Management, Authentication and Access Control (PR.AC)",
      "description": "Access to physical and logical assets and associated facilities is limited to authorized users, processes, and devices, and is managed consistent with the assessed risk of unauthorized access to authorized activities and transactions."
    },
    "subcategory": {
      "id": "PR.AC-1",
      "description": "Identities and credentials are issued, managed, verified, revoked, and audited for authorized devices, users and processes"
    },
    "mappings": {
      "CIS CSC": [
        "1",
        "5",
        "15",
        "16"
      ],
      "COBIT 5": [
        "DSS05.04",
        "DSS06.03"
      ],
      "ISA 62443-2-1:2009": [
        "4.3.3.5.1"
      ],
      "ISA 62443-3-3:2013": [
        "SR 1.1",
        "SR 1.2",
        "SR 1.3",
        "SR 1.4",
        "SR 1.5",
        "SR 1.7",
        "SR 1.8",
        "SR 1.9"
      ],
      "ISO/IEC 27001:2013": [
        "A.9.2.1",
        "A.9.2.2",
        "A.9.2.3",
        "A.9.2.4",
        "A.9.2.6",
        "A.9.3.1",
        "A.9.4.2",
        "A.9.4.3"
      ],
      "NIST SP 800-53 Rev. 4": [
        "AC-1",
        "AC-2",
        "IA-1",
        "IA-2",
        "IA-3",
        "IA-4",
        "IA-5",
        "IA-6",
        "IA-7",
        "IA-8",
        "IA-9",
        "IA-10",
        "IA-11"
      ]
    }
  },
  {
    "secFunction": "PROTECT (PR)",
    "category": {
      "id": "Identity Management, Authentication and Access Control (PR.AC)",
      "description": "Access to physical and logical assets and associated facilities is limited to authorized users, processes, and devices, and is managed consistent with the assessed risk of unauthorized access to authorized activities and transactions."
    },
    "subcategory": {
      "id": "PR.AC-2",
      "description": "Physical access to assets is managed and protected"
    },
    "mappings": {
      "COBIT 5": [
        "DSS01.04",
        "DSS05.05"
      ],
      "ISA 62443-2-1:2009": [
        "4.3.3.3.2",
        "4.3.3.3.8"
      ],
      "ISO/IEC 27001:2013": [
        "A.11.1.1",
        "A.11.1.2",
        "A.11.1.3",
        "A.11.1.4",
        "A.11.1.5",
        "A.11.1.6",
        "A.11.2.1",
        "A.11.2.3",
        "A.11.2.5",
        "A.11.2.6",
        "A.11.2.7",
        "A.11.2.8"
      ],
      "NIST SP 800-53 Rev. 4": [
        "PE-2",
        "PE-3",
        "PE-4",
        "PE-5",
        "PE-6",
        "PE-8"
      ]
    }
  },
  {
    "secFunction": "PROTECT (PR)",
    "category": {
      "id": "Identity Management, Authentication and Access Control (PR.AC)",
      "description": "Access to physical and logical assets and associated facilities is limited to authorized users, processes, and devices, and is managed consistent with the assessed risk of unauthorized access to authorized activities and transactions."
    },
    "subcategory": {
      "id": "PR.AC-3",
      "description": "Remote access is managed"
    },
    "mappings": {
      "CIS CSC": [
        "12"
      ],
      "COBIT 5": [
        "APO13.01",
        "DSS01.04",
        "DSS05.03"
      ],
      "ISA 62443-2-1:2009": [
        "4.3.3.6.6"
      ],
      "ISA 62443-3-3:2013": [
        "SR 1.13",
        "SR 2.6"
      ],
      "ISO/IEC 27001:2013": [
        "A.6.2.1",
        "A.6.2.2",
        "A.11.2.6",
        "A.13.1.1",
        "A.13.2.1"
      ],
      "NIST SP 800-53 Rev. 4": [
        "AC-1",
        "AC-17",
        "AC-19",
        "AC-20",
        "SC-15"
      ]
    }
  },
  {
    "secFunction": "PROTECT (PR)",
    "category": {
      "id": "Identity Management, Authentication and Access Control (PR.AC)",
      "description": "Access to physical and logical assets and associated facilities is limited to authorized users, processes, and devices, and is managed consistent with the assessed risk of unauthorized access to authorized activities and transactions."
    },
    "subcategory": {
      "id": "PR.AC-4",
      "description": "Access permissions and authorizations are managed, incorporating the principles of least privilege and separation of duties"
    },
    "mappings": {
      "CIS CSC": [
        "3",
        "5",
        "12",
        "14",
        "15",
        "16",
        "18"
      ],
      "COBIT 5": [
        "DSS05.04"
      ],
      "ISA 62443-2-1:2009": [
        "4.3.3.7.3"
      ],
      "ISA 62443-3-3:2013": [
        "SR 2.1"
      ],
      "ISO/IEC 27001:2013": [
        "A.6.1.2",
        "A.9.1.2",
        "A.9.2.3",
        "A.9.4.1",
        "A.9.4.4",
        "A.9.4.5"
      ],
      "NIST SP 800-53 Rev. 4": [
        "AC-1",
        "AC-2",
        "AC-3",
        "AC-5",
        "AC-6",
        "AC-14",
        "AC-16",
        "AC-24"
      ]
    }
  },
  {
    "secFunction": "PROTECT (PR)",
    "category": {
      "id": "Identity Management, Authentication and Access Control (PR.AC)",
      "description": "Access to physical and logical assets and associated facilities is limited to authorized users, processes, and devices, and is managed consistent with the assessed risk of unauthorized access to authorized activities and transactions."
    },
    "subcategory": {
      "id": "PR.AC-5",
      "description": "Network integrity is protected (e.g., network segregation, network segmentation)"
    },
    "mappings": {
      "CIS CSC": [
        "9",
        "14",
        "15",
        "18"
      ],
      "COBIT 5": [
        "DSS01.05",
        "DSS05.02"
      ],
      "ISA 62443-2-1:2009": [
        "4.3.3.4"
      ],
      "ISA 62443-3-3:2013": [
        "SR 3.1",
        "SR 3.8"
      ],
      "ISO/IEC 27001:2013": [
        "A.13.1.1",
        "A.13.1.3",
        "A.13.2.1",
        "A.14.1.2",
        "A.14.1.3"
      ],
      "NIST SP 800-53 Rev. 4": [
        "AC-4",
        "AC-10",
        "SC-7"
      ]
    }
  },
  {
    "secFunction": "PROTECT (PR)",
    "category": {
      "id": "Identity Management, Authentication and Access Control (PR.AC)",
      "description": "Access to physical and logical assets and associated facilities is limited to authorized users, processes, and devices, and is managed consistent with the assessed risk of unauthorized access to authorized activities and transactions."
    },
    "subcategory": {
      "id": "PR.AC-6",
      "description": "Identities are proofed and bound to credentials and asserted in interactions"
    },
    "mappings": {
      "CIS CSC": [
        "",
        "16"
      ],
      "COBIT 5": [
        "DSS05.04",
        "DSS05.05",
        "DSS05.07",
        "DSS06.03"
      ],
      "ISA 62443-2-1:2009": [
        "4.3.3.2.2",
        "4.3.3.5.2",
        "4.3.3.7.2",
        "4.3.3.7.4"
      ],
      "ISA 62443-3-3:2013": [
        "SR 1.1",
        "SR 1.2",
        "SR 1.4",
        "SR 1.5",
        "SR 1.9",
        "SR 2.1"
      ],
      "ISO/IEC 27001:2013": [
        "",
        "A.7.1.1",
        "A.9.2.1"
      ],
      "NIST SP 800-53 Rev. 4": [
        "AC-1",
        "AC-2",
        "AC-3",
        "AC-16",
        "AC-19",
        "AC-24",
        "IA-1",
        "IA-2",
        "IA-4",
        "IA-5",
        "IA-8",
        "PE-2",
        "PS-3"
      ]
    }
  },
  {
    "secFunction": "PROTECT (PR)",
    "category": {
      "id": "Identity Management, Authentication and Access Control (PR.AC)",
      "description": "Access to physical and logical assets and associated facilities is limited to authorized users, processes, and devices, and is managed consistent with the assessed risk of unauthorized access to authorized activities and transactions."
    },
    "subcategory": {
      "id": "PR.AC-7",
      "description": "Users, devices, and other assets are authenticated (e.g., single-factor, multi-factor) commensurate with the risk of the transaction (e.g., individuals’ security and privacy risks and other organizational risks)"
    },
    "mappings": {
      "CIS CSC": [
        "1",
        "12",
        "15",
        "16"
      ],
      "COBIT 5": [
        "DSS05.04",
        "DSS05.10",
        "DSS06.10"
      ],
      "ISA 62443-2-1:2009": [
        "4.3.3.6.1",
        "4.3.3.6.2",
        "4.3.3.6.3",
        "4.3.3.6.4",
        "4.3.3.6.5",
        "4.3.3.6.6",
        "4.3.3.6.7",
        "4.3.3.6.8",
        "4.3.3.6.9"
      ],
      "ISA 62443-3-3:2013": [
        "SR 1.1",
        "SR 1.2",
        "SR 1.5",
        "SR 1.7",
        "SR 1.8",
        "SR 1.9",
        "SR 1.10"
      ],
      "ISO/IEC 27001:2013": [
        "A.9.2.1",
        "A.9.2.4",
        "A.9.3.1",
        "A.9.4.2",
        "A.9.4.3",
        "A.18.1.4"
      ],
      "NIST SP 800-53 Rev. 4": [
        "AC-7",
        "AC-8",
        "AC-9",
        "AC-11",
        "AC-12",
        "AC-14",
        "IA-1",
        "IA-2",
        "IA-3",
        "IA-4",
        "IA-5",
        "IA-8",
        "IA-9",
        "IA-10",
        "IA-11"
      ]
    }
  },
  {
    "secFunction": "PROTECT (PR)",
    "category": {
      "id": "Awareness and Training (PR.AT)",
      "description": "The organization’s personnel and partners are provided cybersecurity awareness education and are trained to perform their cybersecurity-related duties and responsibilities consistent with related policies, procedures, and agreements."
    },
    "subcategory": {
      "id": "PR.AT-1",
      "description": "All users are informed and trained"
    },
    "mappings": {
      "CIS CSC": [
        "17",
        "18"
      ],
      "COBIT 5": [
        "APO07.03",
        "BAI05.07"
      ],
      "ISA 62443-2-1:2009": [
        "4.3.2.4.2"
      ],
      "ISO/IEC 27001:2013": [
        "A.7.2.2",
        "A.12.2.1"
      ],
      "NIST SP 800-53 Rev. 4": [
        "AT-2",
        "PM-13"
      ]
    }
  },
  {
    "secFunction": "PROTECT (PR)",
    "category": {
      "id": "Awareness and Training (PR.AT)",
      "description": "The organization’s personnel and partners are provided cybersecurity awareness education and are trained to perform their cybersecurity-related duties and responsibilities consistent with related policies, procedures, and agreements."
    },
    "subcategory": {
      "id": "PR.AT-2",
      "description": "Privileged users understand their roles and responsibilities"
    },
    "mappings": {
      "CIS CSC": [
        "5",
        "17",
        "18"
      ],
      "COBIT 5": [
        "APO07.02",
        "DSS05.04",
        "DSS06.03"
      ],
      "ISA 62443-2-1:2009": [
        "4.3.2.4.2",
        "4.3.2.4.3"
      ],
      "ISO/IEC 27001:2013": [
        "A.6.1.1",
        "A.7.2.2"
      ],
      "NIST SP 800-53 Rev. 4": [
        "AT-3",
        "PM-13"
      ]
    }
  },
  {
    "secFunction": "PROTECT (PR)",
    "category": {
      "id": "Awareness and Training (PR.AT)",
      "description": "The organization’s personnel and partners are provided cybersecurity awareness education and are trained to perform their cybersecurity-related duties and responsibilities consistent with related policies, procedures, and agreements."
    },
    "subcategory": {
      "id": "PR.AT-3",
      "description": "Third-party stakeholders (e.g., suppliers, customers, partners) understand their roles and responsibilities"
    },
    "mappings": {
      "CIS CSC": [
        "17"
      ],
      "COBIT 5": [
        "APO07.03",
        "APO07.06",
        "APO10.04",
        "APO10.05"
      ],
      "ISA 62443-2-1:2009": [
        "4.3.2.4.2"
      ],
      "ISO/IEC 27001:2013": [
        "A.6.1.1",
        "A.7.2.1",
        "A.7.2.2"
      ],
      "NIST SP 800-53 Rev. 4": [
        "PS-7",
        "SA-9",
        "SA-16"
      ]
    }
  },
  {
    "secFunction": "PROTECT (PR)",
    "category": {
      "id": "Awareness and Training (PR.AT)",
      "description": "The organization’s personnel and partners are provided cybersecurity awareness education and are trained to perform their cybersecurity-related duties and responsibilities consistent with related policies, procedures, and agreements."
    },
    "subcategory": {
      "id": "PR.AT-4",
      "description": "Senior executives understand their roles and responsibilities"
    },
    "mappings": {
      "CIS CSC": [
        "17",
        "19"
      ],
      "COBIT 5": [
        "EDM01.01",
        "APO01.02",
        "APO07.03"
      ],
      "ISA 62443-2-1:2009": [
        "4.3.2.4.2"
      ],
      "ISO/IEC 27001:2013": [
        "A.6.1.1",
        "A.7.2.2"
      ],
      "NIST SP 800-53 Rev. 4": [
        "AT-3",
        "PM-13"
      ]
    }
  },
  {
    "secFunction": "PROTECT (PR)",
    "category": {
      "id": "Awareness and Training (PR.AT)",
      "description": "The organization’s personnel and partners are provided cybersecurity awareness education and are trained to perform their cybersecurity-related duties and responsibilities consistent with related policies, procedures, and agreements."
    },
    "subcategory": {
      "id": "PR.AT-5",
      "description": "Physical and cybersecurity personnel understand their roles and responsibilities"
    },
    "mappings": {
      "CIS CSC": [
        "17"
      ],
      "COBIT 5": [
        "APO07.03"
      ],
      "ISA 62443-2-1:2009": [
        "4.3.2.4.2"
      ],
      "ISO/IEC 27001:2013": [
        "A.6.1.1",
        "A.7.2.2"
      ],
      "NIST SP 800-53 Rev. 4": [
        "AT-3",
        "IR-2",
        "PM-13"
      ]
    }
  },
  {
    "secFunction": "PROTECT (PR)",
    "category": {
      "id": "Data Security (PR.DS)",
      "description": "Information and records (data) are managed consistent with the organization’s risk strategy to protect the confidentiality, integrity, and availability of information."
    },
    "subcategory": {
      "id": "PR.DS-1",
      "description": "Data-at-rest is protected"
    },
    "mappings": {
      "CIS CSC": [
        "13",
        "14"
      ],
      "COBIT 5": [
        "APO01.06",
        "BAI02.01",
        "BAI06.01",
        "DSS04.07",
        "DSS05.03",
        "DSS06.06"
      ],
      "ISA 62443-3-3:2013": [
        "SR 3.4",
        "SR 4.1"
      ],
      "ISO/IEC 27001:2013": [
        "A.8.2.3"
      ],
      "NIST SP 800-53 Rev. 4": [
        "MP-8",
        "SC-12",
        "SC-28"
      ]
    }
  },
  {
    "secFunction": "PROTECT (PR)",
    "category": {
      "id": "Data Security (PR.DS)",
      "description": "Information and records (data) are managed consistent with the organization’s risk strategy to protect the confidentiality, integrity, and availability of information."
    },
    "subcategory": {
      "id": "PR.DS-2",
      "description": "Data-in-transit is protected"
    },
    "mappings": {
      "CIS CSC": [
        "13",
        "14"
      ],
      "COBIT 5": [
        "APO01.06",
        "DSS05.02",
        "DSS06.06"
      ],
      "ISA 62443-3-3:2013": [
        "SR 3.1",
        "SR 3.8",
        "SR 4.1",
        "SR 4.2"
      ],
      "ISO/IEC 27001:2013": [
        "A.8.2.3",
        "A.13.1.1",
        "A.13.2.1",
        "A.13.2.3",
        "A.14.1.2",
        "A.14.1.3"
      ],
      "NIST SP 800-53 Rev. 4": [
        "SC-8",
        "SC-11",
        "SC-12"
      ]
    }
  },
  {
    "secFunction": "PROTECT (PR)",
    "category": {
      "id": "Data Security (PR.DS)",
      "description": "Information and records (data) are managed consistent with the organization’s risk strategy to protect the confidentiality, integrity, and availability of information."
    },
    "subcategory": {
      "id": "PR.DS-3",
      "description": "Assets are formally managed throughout removal, transfers, and disposition"
    },
    "mappings": {
      "CIS CSC": [
        "1"
      ],
      "COBIT 5": [
        "BAI09.03"
      ],
      "ISA 62443-2-1:2009": [
        "4.3.3.3.9",
        "4.3.4.4.1"
      ],
      "ISA 62443-3-3:2013": [
        "SR 4.2"
      ],
      "ISO/IEC 27001:2013": [
        "A.8.2.3",
        "A.8.3.1",
        "A.8.3.2",
        "A.8.3.3",
        "A.11.2.5",
        "A.11.2.7"
      ],
      "NIST SP 800-53 Rev. 4": [
        "CM-8",
        "MP-6",
        "PE-16"
      ]
    }
  },
  {
    "secFunction": "PROTECT (PR)",
    "category": {
      "id": "Data Security (PR.DS)",
      "description": "Information and records (data) are managed consistent with the organization’s risk strategy to protect the confidentiality, integrity, and availability of information."
    },
    "subcategory": {
      "id": "PR.DS-4",
      "description": "Adequate capacity to ensure availability is maintained"
    },
    "mappings": {
      "CIS CSC": [
        "1",
        "2",
        "13"
      ],
      "COBIT 5": [
        "APO13.01",
        "BAI04.04"
      ],
      "ISA 62443-3-3:2013": [
        "SR 7.1",
        "SR 7.2"
      ],
      "ISO/IEC 27001:2013": [
        "A.12.1.3",
        "A.17.2.1"
      ],
      "NIST SP 800-53 Rev. 4": [
        "AU-4",
        "CP-2",
        "SC-5"
      ]
    }
  },
  {
    "secFunction": "PROTECT (PR)",
    "category": {
      "id": "Data Security (PR.DS)",
      "description": "Information and records (data) are managed consistent with the organization’s risk strategy to protect the confidentiality, integrity, and availability of information."
    },
    "subcategory": {
      "id": "PR.DS-5",
      "description": "Protections against data leaks are implemented"
    },
    "mappings": {
      "CIS CSC": [
        "13"
      ],
      "COBIT 5": [
        "APO01.06",
        "DSS05.04",
        "DSS05.07",
        "DSS06.02"
      ],
      "ISA 62443-3-3:2013": [
        "SR 5.2"
      ],
      "ISO/IEC 27001:2013": [
        "A.6.1.2",
        "A.7.1.1",
        "A.7.1.2",
        "A.7.3.1",
        "A.8.2.2",
        "A.8.2.3",
        "A.9.1.1",
        "A.9.1.2",
        "A.9.2.3",
        "A.9.4.1",
        "A.9.4.4",
        "A.9.4.5",
        "A.10.1.1",
        "A.11.1.4",
        "A.11.1.5",
        "A.11.2.1",
        "A.13.1.1",
        "A.13.1.3",
        "A.13.2.1",
        "A.13.2.3",
        "A.13.2.4",
        "A.14.1.2",
        "A.14.1.3"
      ],
      "NIST SP 800-53 Rev. 4": [
        "AC-4",
        "AC-5",
        "AC-6",
        "PE-19",
        "PS-3",
        "PS-6",
        "SC-7",
        "SC-8",
        "SC-13",
        "SC-31",
        "SI-4"
      ]
    }
  },
  {
    "secFunction": "PROTECT (PR)",
    "category": {
      "id": "Data Security (PR.DS)",
      "description": "Information and records (data) are managed consistent with the organization’s risk strategy to protect the confidentiality, integrity, and availability of information."
    },
    "subcategory": {
      "id": "PR.DS-6",
      "description": "Integrity checking mechanisms are used to verify software, firmware, and information integrity"
    },
    "mappings": {
      "CIS CSC": [
        "2",
        "3"
      ],
      "COBIT 5": [
        "APO01.06",
        "BAI06.01",
        "DSS06.02"
      ],
      "ISA 62443-3-3:2013": [
        "SR 3.1",
        "SR 3.3",
        "SR 3.4",
        "SR 3.8"
      ],
      "ISO/IEC 27001:2013": [
        "A.12.2.1",
        "A.12.5.1",
        "A.14.1.2",
        "A.14.1.3",
        "A.14.2.4"
      ],
      "NIST SP 800-53 Rev. 4": [
        "SC-16",
        "SI-7"
      ]
    }
  },
  {
    "secFunction": "PROTECT (PR)",
    "category": {
      "id": "Data Security (PR.DS)",
      "description": "Information and records (data) are managed consistent with the organization’s risk strategy to protect the confidentiality, integrity, and availability of information."
    },
    "subcategory": {
      "id": "PR.DS-7",
      "description": "The development and testing environment(s) are separate from the production environment"
    },
    "mappings": {
      "CIS CSC": [
        "18",
        "20"
      ],
      "COBIT 5": [
        "BAI03.08",
        "BAI07.04"
      ],
      "ISO/IEC 27001:2013": [
        "A.12.1.4"
      ],
      "NIST SP 800-53 Rev. 4": [
        "CM-2"
      ]
    }
  },
  {
    "secFunction": "PROTECT (PR)",
    "category": {
      "id": "Data Security (PR.DS)",
      "description": "Information and records (data) are managed consistent with the organization’s risk strategy to protect the confidentiality, integrity, and availability of information."
    },
    "subcategory": {
      "id": "PR.DS-8",
      "description": "Integrity checking mechanisms are used to verify hardware integrity"
    },
    "mappings": {
      "COBIT 5": [
        "BAI03.05"
      ],
      "ISA 62443-2-1:2009": [
        "4.3.4.4.4"
      ],
      "ISO/IEC 27001:2013": [
        "A.11.2.4"
      ],
      "NIST SP 800-53 Rev. 4": [
        "SA-10",
        "SI-7"
      ]
    }
  },
  {
    "secFunction": "PROTECT (PR)",
    "category": {
      "id": "Information Protection Processes and Procedures (PR.IP)",
      "description": "Security policies (that address purpose, scope, roles, responsibilities, management commitment, and coordination among organizational entities), processes, and procedures are maintained and used to manage protection of information systems and assets."
    },
    "subcategory": {
      "id": "PR.IP-1",
      "description": "A baseline configuration of information technology/industrial control systems is created and maintained incorporating security principles (e.g. concept of least functionality)"
    },
    "mappings": {
      "CIS CSC": [
        "3",
        "9",
        "11"
      ],
      "COBIT 5": [
        "BAI10.01",
        "BAI10.02",
        "BAI10.03",
        "BAI10.05"
      ],
      "ISA 62443-2-1:2009": [
        "4.3.4.3.2",
        "4.3.4.3.3"
      ],
      "ISA 62443-3-3:2013": [
        "SR 7.6"
      ],
      "ISO/IEC 27001:2013": [
        "A.12.1.2",
        "A.12.5.1",
        "A.12.6.2",
        "A.14.2.2",
        "A.14.2.3",
        "A.14.2.4"
      ],
      "NIST SP 800-53 Rev. 4": [
        "CM-2",
        "CM-3",
        "CM-4",
        "CM-5",
        "CM-6",
        "CM-7",
        "CM-9",
        "SA-10"
      ]
    }
  },
  {
    "secFunction": "PROTECT (PR)",
    "category": {
      "id": "Information Protection Processes and Procedures (PR.IP)",
      "description": "Security policies (that address purpose, scope, roles, responsibilities, management commitment, and coordination among organizational entities), processes, and procedures are maintained and used to manage protection of information systems and assets."
    },
    "subcategory": {
      "id": "PR.IP-2",
      "description": "A System Development Life Cycle to manage systems is implemented"
    },
    "mappings": {
      "CIS CSC": [
        "18"
      ],
      "COBIT 5": [
        "APO13.01",
        "BAI03.01",
        "BAI03.02",
        "BAI03.03"
      ],
      "ISA 62443-2-1:2009": [
        "4.3.4.3.3"
      ],
      "ISO/IEC 27001:2013": [
        "A.6.1.5",
        "A.14.1.1",
        "A.14.2.1",
        "A.14.2.5"
      ],
      "NIST SP 800-53 Rev. 4": [
        "PL-8",
        "SA-3",
        "SA-4",
        "SA-8",
        "SA-10",
        "SA-11",
        "SA-12",
        "SA-15",
        "SA-17",
        "SI-12",
        "SI-13",
        "SI-14",
        "SI-16",
        "SI-17"
      ]
    }
  },
  {
    "secFunction": "PROTECT (PR)",
    "category": {
      "id": "Information Protection Processes and Procedures (PR.IP)",
      "description": "Security policies (that address purpose, scope, roles, responsibilities, management commitment, and coordination among organizational entities), processes, and procedures are maintained and used to manage protection of information systems and assets."
    },
    "subcategory": {
      "id": "PR.IP-3",
      "description": "Configuration change control processes are in place"
    },
    "mappings": {
      "CIS CSC": [
        "3",
        "11"
      ],
      "COBIT 5": [
        "BAI01.06",
        "BAI06.01"
      ],
      "ISA 62443-2-1:2009": [
        "4.3.4.3.2",
        "4.3.4.3.3"
      ],
      "ISA 62443-3-3:2013": [
        "SR 7.6"
      ],
      "ISO/IEC 27001:2013": [
        "A.12.1.2",
        "A.12.5.1",
        "A.12.6.2",
        "A.14.2.2",
        "A.14.2.3",
        "A.14.2.4"
      ],
      "NIST SP 800-53 Rev. 4": [
        "CM-3",
        "CM-4",
        "SA-10"
      ]
    }
  },
  {
    "secFunction": "PROTECT (PR)",
    "category": {
      "id": "Information Protection Processes and Procedures (PR.IP)",
      "description": "Security policies (that address purpose, scope, roles, responsibilities, management commitment, and coordination among organizational entities), processes, and procedures are maintained and used to manage protection of information systems and assets."
    },
    "subcategory": {
      "id": "PR.IP-4",
      "description": "Backups of information are conducted, maintained, and tested"
    },
    "mappings": {
      "CIS CSC": [
        "10"
      ],
      "COBIT 5": [
        "APO13.01",
        "DSS01.01",
        "DSS04.07"
      ],
      "ISA 62443-2-1:2009": [
        "4.3.4.3.9"
      ],
      "ISA 62443-3-3:2013": [
        "SR 7.3",
        "SR 7.4"
      ],
      "ISO/IEC 27001:2013": [
        "A.12.3.1",
        "A.17.1.2",
        "A.17.1.3",
        "A.18.1.3"
      ],
      "NIST SP 800-53 Rev. 4": [
        "CP-4",
        "CP-6",
        "CP-9"
      ]
    }
  },
  {
    "secFunction": "PROTECT (PR)",
    "category": {
      "id": "Information Protection Processes and Procedures (PR.IP)",
      "description": "Security policies (that address purpose, scope, roles, responsibilities, management commitment, and coordination among organizational entities), processes, and procedures are maintained and used to manage protection of information systems and assets."
    },
    "subcategory": {
      "id": "PR.IP-5",
      "description": "Policy and regulations regarding the physical operating environment for organizational assets are met"
    },
    "mappings": {
      "COBIT 5": [
        "DSS01.04",
        "DSS05.05"
      ],
      "ISA 62443-2-1:2009": [
        "4.3.3.3.1 4.3.3.3.2",
        "4.3.3.3.3",
        "4.3.3.3.5",
        "4.3.3.3.6"
      ],
      "ISO/IEC 27001:2013": [
        "A.11.1.4",
        "A.11.2.1",
        "A.11.2.2",
        "A.11.2.3"
      ],
      "NIST SP 800-53 Rev. 4": [
        "PE-10",
        "PE-12",
        "PE-13",
        "PE-14",
        "PE-15",
        "PE-18"
      ]
    }
  },
  {
    "secFunction": "PROTECT (PR)",
    "category": {
      "id": "Information Protection Processes and Procedures (PR.IP)",
      "description": "Security policies (that address purpose, scope, roles, responsibilities, management commitment, and coordination among organizational entities), processes, and procedures are maintained and used to manage protection of information systems and assets."
    },
    "subcategory": {
      "id": "PR.IP-6",
      "description": "Data is destroyed according to policy"
    },
    "mappings": {
      "COBIT 5": [
        "BAI09.03",
        "DSS05.06"
      ],
      "ISA 62443-2-1:2009": [
        "4.3.4.4.4"
      ],
      "ISA 62443-3-3:2013": [
        "SR 4.2"
      ],
      "ISO/IEC 27001:2013": [
        "A.8.2.3",
        "A.8.3.1",
        "A.8.3.2",
        "A.11.2.7"
      ],
      "NIST SP 800-53 Rev. 4": [
        "MP-6"
      ]
    }
  },
  {
    "secFunction": "PROTECT (PR)",
    "category": {
      "id": "Information Protection Processes and Procedures (PR.IP)",
      "description": "Security policies (that address purpose, scope, roles, responsibilities, management commitment, and coordination among organizational entities), processes, and procedures are maintained and used to manage protection of information systems and assets."
    },
    "subcategory": {
      "id": "PR.IP-7",
      "description": "Protection processes are improved"
    },
    "mappings": {
      "COBIT 5": [
        "APO11.06",
        "APO12.06",
        "DSS04.05"
      ],
      "ISA 62443-2-1:2009": [
        "4.4.3.1",
        "4.4.3.2",
        "4.4.3.3",
        "4.4.3.4",
        "4.4.3.5",
        "4.4.3.6",
        "4.4.3.7",
        "4.4.3.8"
      ],
      "ISO/IEC 27001:2013": [
        "A.16.1.6",
        "Clause 9",
        "Clause 10"
      ],
      "NIST SP 800-53 Rev. 4": [
        "CA-2",
        "CA-7",
        "CP-2",
        "IR-8",
        "PL-2",
        "PM-6"
      ]
    }
  },
  {
    "secFunction": "PROTECT (PR)",
    "category": {
      "id": "Information Protection Processes and Procedures (PR.IP)",
      "description": "Security policies (that address purpose, scope, roles, responsibilities, management commitment, and coordination among organizational entities), processes, and procedures are maintained and used to manage protection of information systems and assets."
    },
    "subcategory": {
      "id": "PR.IP-8",
      "description": "Effectiveness of protection technologies is shared"
    },
    "mappings": {
      "COBIT 5": [
        "BAI08.04",
        "DSS03.04"
      ],
      "ISO/IEC 27001:2013": [
        "A.16.1.6"
      ],
      "NIST SP 800-53 Rev. 4": [
        "AC-21",
        "CA-7",
        "SI-4"
      ]
    }
  },
  {
    "secFunction": "PROTECT (PR)",
    "category": {
      "id": "Information Protection Processes and Procedures (PR.IP)",
      "description": "Security policies (that address purpose, scope, roles, responsibilities, management commitment, and coordination among organizational entities), processes, and procedures are maintained and used to manage protection of information systems and assets."
    },
    "subcategory": {
      "id": "PR.IP-9",
      "description": "Response plans (Incident Response and Business Continuity) and recovery plans (Incident Recovery and Disaster Recovery) are in place and managed"
    },
    "mappings": {
      "CIS CSC": [
        "19"
      ],
      "COBIT 5": [
        "APO12.06",
        "DSS04.03"
      ],
      "ISA 62443-2-1:2009": [
        "4.3.2.5.3",
        "4.3.4.5.1"
      ],
      "ISO/IEC 27001:2013": [
        "A.16.1.1",
        "A.17.1.1",
        "A.17.1.2",
        "A.17.1.3"
      ],
      "NIST SP 800-53 Rev. 4": [
        "CP-2",
        "CP-7",
        "CP-12",
        "CP-13",
        "IR-7",
        "IR-8",
        "IR-9",
        "PE-17"
      ]
    }
  },
  {
    "secFunction": "PROTECT (PR)",
    "category": {
      "id": "Information Protection Processes and Procedures (PR.IP)",
      "description": "Security policies (that address purpose, scope, roles, responsibilities, management commitment, and coordination among organizational entities), processes, and procedures are maintained and used to manage protection of information systems and assets."
    },
    "subcategory": {
      "id": "PR.IP-10",
      "description": "Response and recovery plans are tested"
    },
    "mappings": {
      "CIS CSC": [
        "19",
        "20"
      ],
      "COBIT 5": [
        "DSS04.04"
      ],
      "ISA 62443-2-1:2009": [
        "4.3.2.5.7",
        "4.3.4.5.11"
      ],
      "ISA 62443-3-3:2013": [
        "SR 3.3"
      ],
      "ISO/IEC 27001:2013": [
        "A.17.1.3"
      ],
      "NIST SP 800-53 Rev. 4": [
        "CP-4",
        "IR-3",
        "PM-14"
      ]
    }
  },
  {
    "secFunction": "PROTECT (PR)",
    "category": {
      "id": "Information Protection Processes and Procedures (PR.IP)",
      "description": "Security policies (that address purpose, scope, roles, responsibilities, management commitment, and coordination among organizational entities), processes, and procedures are maintained and used to manage protection of information systems and assets."
    },
    "subcategory": {
      "id": "PR.IP-11",
      "description": "Cybersecurity is included in human resources practices (e.g., deprovisioning, personnel screening)"
    },
    "mappings": {
      "CIS CSC": [
        "5",
        "16"
      ],
      "COBIT 5": [
        "APO07.01",
        "APO07.02",
        "APO07.03",
        "APO07.04",
        "APO07.05"
      ],
      "ISA 62443-2-1:2009": [
        "4.3.3.2.1",
        "4.3.3.2.2",
        "4.3.3.2.3"
      ],
      "ISO/IEC 27001:2013": [
        "A.7.1.1",
        "A.7.1.2",
        "A.7.2.1",
        "A.7.2.2",
        "A.7.2.3",
        "A.7.3.1",
        "A.8.1.4"
      ],
      "NIST SP 800-53 Rev. 4": [
        "PS-1",
        "PS-2",
        "PS-3",
        "PS-4",
        "PS-5",
        "PS-6",
        "PS-7",
        "PS-8",
        "SA-21"
      ]
    }
  },
  {
    "secFunction": "PROTECT (PR)",
    "category": {
      "id": "Information Protection Processes and Procedures (PR.IP)",
      "description": "Security policies (that address purpose, scope, roles, responsibilities, management commitment, and coordination among organizational entities), processes, and procedures are maintained and used to manage protection of information systems and assets."
    },
    "subcategory": {
      "id": "PR.IP-12",
      "description": "A   vulnerability management plan is developed and implemented"
    },
    "mappings": {
      "CIS CSC": [
        "4",
        "18",
        "20"
      ],
      "COBIT 5": [
        "BAI03.10",
        "DSS05.01",
        "DSS05.02"
      ],
      "ISO/IEC 27001:2013": [
        "A.12.6.1",
        "A.14.2.3",
        "A.16.1.3",
        "A.18.2.2",
        "A.18.2.3"
      ],
      "NIST SP 800-53 Rev. 4": [
        "RA-3",
        "RA-5",
        "SI-2"
      ]
    }
  },
  {
    "secFunction": "PROTECT (PR)",
    "category": {
      "id": "Maintenance (PR.MA)",
      "description": "Maintenance and repairs of industrial control and information system components are performed consistent with policies and procedures."
    },
    "subcategory": {
      "id": "PR.MA-1",
      "description": "Maintenance and repair of organizational assets are performed and logged, with approved and controlled tools"
    },
    "mappings": {
      "COBIT 5": [
        "BAI03.10",
        "BAI09.02",
        "BAI09.03",
        "DSS01.05"
      ],
      "ISA 62443-2-1:2009": [
        "4.3.3.3.7"
      ],
      "ISO/IEC 27001:2013": [
        "A.11.1.2",
        "A.11.2.4",
        "A.11.2.5",
        "A.11.2.6"
      ],
      "NIST SP 800-53 Rev. 4": [
        "MA-2",
        "MA-3",
        "MA-5",
        "MA-6"
      ]
    }
  },
  {
    "secFunction": "PROTECT (PR)",
    "category": {
      "id": "Maintenance (PR.MA)",
      "description": "Maintenance and repairs of industrial control and information system components are performed consistent with policies and procedures."
    },
    "subcategory": {
      "id": "PR.MA-2",
      "description": "Remote maintenance of organizational assets is approved, logged, and performed in a manner that prevents unauthorized access"
    },
    "mappings": {
      "CIS CSC": [
        "3",
        "5"
      ],
      "COBIT 5": [
        "DSS05.04"
      ],
      "ISA 62443-2-1:2009": [
        "4.3.3.6.5",
        "4.3.3.6.6",
        "4.3.3.6.7",
        "4.3.3.6.8"
      ],
      "ISO/IEC 27001:2013": [
        "A.11.2.4",
        "A.15.1.1",
        "A.15.2.1"
      ],
      "NIST SP 800-53 Rev. 4": [
        "MA-4"
      ]
    }
  },
  {
    "secFunction": "PROTECT (PR)",
    "category": {
      "id": "Protective Technology (PR.PT)",
      "description": "Technical security solutions are managed to ensure the security and resilience of systems and assets, consistent with related policies, procedures, and agreements."
    },
    "subcategory": {
      "id": "PR.PT-1",
      "description": "Audit/log records are determined, documented, implemented, and reviewed in accordance with policy"
    },
    "mappings": {
      "CIS CSC": [
        "1",
        "3",
        "5",
        "6",
        "14",
        "15",
        "16"
      ],
      "COBIT 5": [
        "APO11.04",
        "BAI03.05",
        "DSS05.04",
        "DSS05.07",
        "MEA02.01"
      ],
      "ISA 62443-2-1:2009": [
        "4.3.3.3.9",
        "4.3.3.5.8",
        "4.3.4.4.7",
        "4.4.2.1",
        "4.4.2.2",
        "4.4.2.4"
      ],
      "ISA 62443-3-3:2013": [
        "SR 2.8",
        "SR 2.9",
        "SR 2.10",
        "SR 2.11",
        "SR 2.12"
      ],
      "ISO/IEC 27001:2013": [
        "A.12.4.1",
        "A.12.4.2",
        "A.12.4.3",
        "A.12.4.4",
        "A.12.7.1"
      ],
      "NIST SP 800-53 Rev. 4": [
        "AU Family"
      ]
    }
  },
  {
    "secFunction": "PROTECT (PR)",
    "category": {
      "id": "Protective Technology (PR.PT)",
      "description": "Technical security solutions are managed to ensure the security and resilience of systems and assets, consistent with related policies, procedures, and agreements."
    },
    "subcategory": {
      "id": "PR.PT-2",
      "description": "Removable media is protected and its use restricted according to policy"
    },
    "mappings": {
      "CIS CSC": [
        "8",
        "13"
      ],
      "COBIT 5": [
        "APO13.01",
        "DSS05.02",
        "DSS05.06"
      ],
      "ISA 62443-3-3:2013": [
        "SR 2.3"
      ],
      "ISO/IEC 27001:2013": [
        "A.8.2.1",
        "A.8.2.2",
        "A.8.2.3",
        "A.8.3.1",
        "A.8.3.3",
        "A.11.2.9"
      ],
      "NIST SP 800-53 Rev. 4": [
        "MP-2",
        "MP-3",
        "MP-4",
        "MP-5",
        "MP-7",
        "MP-8"
      ]
    }
  },
  {
    "secFunction": "PROTECT (PR)",
    "category": {
      "id": "Protective Technology (PR.PT)",
      "description": "Technical security solutions are managed to ensure the security and resilience of systems and assets, consistent with related policies, procedures, and agreements."
    },
    "subcategory": {
      "id": "PR.PT-3",
      "description": "The principle of least functionality is incorporated by configuring systems to provide only essential capabilities"
    },
    "mappings": {
      "CIS CSC": [
        "3",
        "11",
        "14"
      ],
      "COBIT 5": [
        "DSS05.02",
        "DSS05.05",
        "DSS06.06"
      ],
      "ISA 62443-2-1:2009": [
        "4.3.3.5.1",
        "4.3.3.5.2",
        "4.3.3.5.3",
        "4.3.3.5.4",
        "4.3.3.5.5",
        "4.3.3.5.6",
        "4.3.3.5.7",
        "4.3.3.5.8",
        "4.3.3.6.1",
        "4.3.3.6.2",
        "4.3.3.6.3",
        "4.3.3.6.4",
        "4.3.3.6.5",
        "4.3.3.6.6",
        "4.3.3.6.7",
        "4.3.3.6.8",
        "4.3.3.6.9",
        "4.3.3.7.1",
        "4.3.3.7.2",
        "4.3.3.7.3",
        "4.3.3.7.4"
      ],
      "ISA 62443-3-3:2013": [
        "SR 1.1",
        "SR 1.2",
        "SR 1.3",
        "SR 1.4",
        "SR 1.5",
        "SR 1.6",
        "SR 1.7",
        "SR 1.8",
        "SR 1.9",
        "SR 1.10",
        "SR 1.11",
        "SR 1.12",
        "SR 1.13",
        "SR 2.1",
        "SR 2.2",
        "SR 2.3",
        "SR 2.4",
        "SR 2.5",
        "SR 2.6",
        "SR 2.7"
      ],
      "ISO/IEC 27001:2013": [
        "A.9.1.2"
      ],
      "NIST SP 800-53 Rev. 4": [
        "AC-3",
        "CM-7"
      ]
    }
  },
  {
    "secFunction": "PROTECT (PR)",
    "category": {
      "id": "Protective Technology (PR.PT)",
      "description": "Technical security solutions are managed to ensure the security and resilience of systems and assets, consistent with related policies, procedures, and agreements."
    },
    "subcategory": {
      "id": "PR.PT-4",
      "description": "Communications and control networks are protected"
    },
    "mappings": {
      "CIS CSC": [
        "8",
        "12",
        "15"
      ],
      "COBIT 5": [
        "DSS05.02",
        "APO13.01"
      ],
      "ISA 62443-3-3:2013": [
        "SR 3.1",
        "SR 3.5",
        "SR 3.8",
        "SR 4.1",
        "SR 4.3",
        "SR 5.1",
        "SR 5.2",
        "SR 5.3",
        "SR 7.1",
        "SR 7.6"
      ],
      "ISO/IEC 27001:2013": [
        "A.13.1.1",
        "A.13.2.1",
        "A.14.1.3"
      ],
      "NIST SP 800-53 Rev. 4": [
        "AC-4",
        "AC-17",
        "AC-18",
        "CP-8",
        "SC-7",
        "SC-19",
        "SC-20",
        "SC-21",
        "SC-22",
        "SC-23",
        "SC-24",
        "SC-25",
        "SC-29",
        "SC-32",
        "SC-36",
        "SC-37",
        "SC-38",
        "SC-39",
        "SC-40",
        "SC-41",
        "SC-43"
      ]
    }
  },
  {
    "secFunction": "PROTECT (PR)",
    "category": {
      "id": "Protective Technology (PR.PT)",
      "description": "Technical security solutions are managed to ensure the security and resilience of systems and assets, consistent with related policies, procedures, and agreements."
    },
    "subcategory": {
      "id": "PR.PT-5",
      "description": "Mechanisms (e.g., failsafe, load balancing, hot swap) are implemented to achieve resilience requirements in normal and adverse situations"
    },
    "mappings": {
      "COBIT 5": [
        "BAI04.01",
        "BAI04.02",
        "BAI04.03",
        "BAI04.04",
        "BAI04.05",
        "DSS01.05"
      ],
      "ISA 62443-2-1:2009": [
        "4.3.2.5.2"
      ],
      "ISA 62443-3-3:2013": [
        "SR 7.1",
        "SR 7.2"
      ],
      "ISO/IEC 27001:2013": [
        "A.17.1.2",
        "A.17.2.1"
      ],
      "NIST SP 800-53 Rev. 4": [
        "CP-7",
        "CP-8",
        "CP-11",
        "CP-13",
        "PL-8",
        "SA-14",
        "SC-6"
      ]
    }
  },
  {
    "secFunction": "DETECT (DE)",
    "category": {
      "id": "Anomalies and Events (DE.AE)",
      "description": "Anomalous activity is detected and the potential impact of events is understood."
    },
    "subcategory": {
      "id": "DE.AE-1",
      "description": "A baseline of network operations and expected data flows for users and systems is established and managed"
    },
    "mappings": {
      "CIS CSC": [
        "1",
        "4",
        "6",
        "12",
        "13",
        "15",
        "16"
      ],
      "COBIT 5": [
        "DSS03.01"
      ],
      "ISA 62443-2-1:2009": [
        "4.4.3.3"
      ],
      "ISO/IEC 27001:2013": [
        "A.12.1.1",
        "A.12.1.2",
        "A.13.1.1",
        "A.13.1.2"
      ],
      "NIST SP 800-53 Rev. 4": [
        "AC-4",
        "CA-3",
        "CM-2",
        "SI-4"
      ]
    }
  },
  {
    "secFunction": "DETECT (DE)",
    "category": {
      "id": "Anomalies and Events (DE.AE)",
      "description": "Anomalous activity is detected and the potential impact of events is understood."
    },
    "subcategory": {
      "id": "DE.AE-2",
      "description": "Detected events are analyzed to understand attack targets and methods"
    },
    "mappings": {
      "CIS CSC": [
        "3",
        "6",
        "13",
        "15"
      ],
      "COBIT 5": [
        "DSS05.07"
      ],
      "ISA 62443-2-1:2009": [
        "4.3.4.5.6",
        "4.3.4.5.7",
        "4.3.4.5.8"
      ],
      "ISA 62443-3-3:2013": [
        "SR 2.8",
        "SR 2.9",
        "SR 2.10",
        "SR 2.11",
        "SR 2.12",
        "SR 3.9",
        "SR 6.1",
        "SR 6.2"
      ],
      "ISO/IEC 27001:2013": [
        "A.12.4.1",
        "A.16.1.1",
        "A.16.1.4"
      ],
      "NIST SP 800-53 Rev. 4": [
        "AU-6",
        "CA-7",
        "IR-4",
        "SI-4"
      ]
    }
  },
  {
    "secFunction": "DETECT (DE)",
    "category": {
      "id": "Anomalies and Events (DE.AE)",
      "description": "Anomalous activity is detected and the potential impact of events is understood."
    },
    "subcategory": {
      "id": "DE.AE-3",
      "description": "Event data are collected and correlated from multiple sources and sensors"
    },
    "mappings": {
      "CIS CSC": [
        "1",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "11",
        "12",
        "13",
        "14",
        "15",
        "16"
      ],
      "COBIT 5": [
        "BAI08.02"
      ],
      "ISA 62443-3-3:2013": [
        "SR 6.1"
      ],
      "ISO/IEC 27001:2013": [
        "A.12.4.1",
        "A.16.1.7"
      ],
      "NIST SP 800-53 Rev. 4": [
        "AU-6",
        "CA-7",
        "IR-4",
        "IR-5",
        "IR-8",
        "SI-4"
      ]
    }
  },
  {
    "secFunction": "DETECT (DE)",
    "category": {
      "id": "Anomalies and Events (DE.AE)",
      "description": "Anomalous activity is detected and the potential impact of events is understood."
    },
    "subcategory": {
      "id": "DE.AE-4",
      "description": "Impact of events is determined"
    },
    "mappings": {
      "CIS CSC": [
        "4",
        "6"
      ],
      "COBIT 5": [
        "APO12.06",
        "DSS03.01"
      ],
      "ISO/IEC 27001:2013": [
        "A.16.1.4"
      ],
      "NIST SP 800-53 Rev. 4": [
        "CP-2",
        "IR-4",
        "RA-3",
        "SI-4"
      ]
    }
  },
  {
    "secFunction": "DETECT (DE)",
    "category": {
      "id": "Anomalies and Events (DE.AE)",
      "description": "Anomalous activity is detected and the potential impact of events is understood."
    },
    "subcategory": {
      "id": "DE.AE-5",
      "description": "Incident alert thresholds are established"
    },
    "mappings": {
      "CIS CSC": [
        "6",
        "19"
      ],
      "COBIT 5": [
        "APO12.06",
        "DSS03.01"
      ],
      "ISA 62443-2-1:2009": [
        "4.2.3.10"
      ],
      "ISO/IEC 27001:2013": [
        "A.16.1.4"
      ],
      "NIST SP 800-53 Rev. 4": [
        "IR-4",
        "IR-5",
        "IR-8"
      ]
    }
  },
  {
    "secFunction": "DETECT (DE)",
    "category": {
      "id": "Security Continuous Monitoring (DE.CM)",
      "description": "The information system and assets are monitored to identify cybersecurity events and verify the effectiveness of protective measures."
    },
    "subcategory": {
      "id": "DE.CM-1",
      "description": "The network is   monitored to detect potential cybersecurity events"
    },
    "mappings": {
      "CIS CSC": [
        "1",
        "7",
        "8",
        "12",
        "13",
        "15",
        "16"
      ],
      "COBIT 5": [
        "DSS01.03",
        "DSS03.05",
        "DSS05.07"
      ],
      "ISA 62443-3-3:2013": [
        "SR 6.2"
      ],
      "NIST SP 800-53 Rev. 4": [
        "AC-2",
        "AU-12",
        "CA-7",
        "CM-3",
        "SC-5",
        "SC-7",
        "SI-4"
      ]
    }
  },
  {
    "secFunction": "DETECT (DE)",
    "category": {
      "id": "Security Continuous Monitoring (DE.CM)",
      "description": "The information system and assets are monitored to identify cybersecurity events and verify the effectiveness of protective measures."
    },
    "subcategory": {
      "id": "DE.CM-2",
      "description": "The physical environment is monitored to detect potential cybersecurity events"
    },
    "mappings": {
      "COBIT 5": [
        "DSS01.04",
        "DSS01.05"
      ],
      "ISA 62443-2-1:2009": [
        "4.3.3.3.8"
      ],
      "ISO/IEC 27001:2013": [
        "A.11.1.1",
        "A.11.1.2"
      ],
      "NIST SP 800-53 Rev. 4": [
        "CA-7",
        "PE-3",
        "PE-6",
        "PE-20"
      ]
    }
  },
  {
    "secFunction": "DETECT (DE)",
    "category": {
      "id": "Security Continuous Monitoring (DE.CM)",
      "description": "The information system and assets are monitored to identify cybersecurity events and verify the effectiveness of protective measures."
    },
    "subcategory": {
      "id": "DE.CM-3",
      "description": "Personnel activity is monitored to detect potential cybersecurity events"
    },
    "mappings": {
      "CIS CSC": [
        "5",
        "7",
        "14",
        "16"
      ],
      "COBIT 5": [
        "DSS05.07"
      ],
      "ISA 62443-3-3:2013": [
        "SR 6.2"
      ],
      "ISO/IEC 27001:2013": [
        "A.12.4.1",
        "A.12.4.3"
      ],
      "NIST SP 800-53 Rev. 4": [
        "AC-2",
        "AU-12",
        "AU-13",
        "CA-7",
        "CM-10",
        "CM-11"
      ]
    }
  },
  {
    "secFunction": "DETECT (DE)",
    "category": {
      "id": "Security Continuous Monitoring (DE.CM)",
      "description": "The information system and assets are monitored to identify cybersecurity events and verify the effectiveness of protective measures."
    },
    "subcategory": {
      "id": "DE.CM-4",
      "description": "Malicious code is detected"
    },
    "mappings": {
      "CIS CSC": [
        "4",
        "7",
        "8",
        "12"
      ],
      "COBIT 5": [
        "DSS05.01"
      ],
      "ISA 62443-2-1:2009": [
        "4.3.4.3.8"
      ],
      "ISA 62443-3-3:2013": [
        "SR 3.2"
      ],
      "ISO/IEC 27001:2013": [
        "A.12.2.1"
      ],
      "NIST SP 800-53 Rev. 4": [
        "SI-3",
        "SI-8"
      ]
    }
  },
  {
    "secFunction": "DETECT (DE)",
    "category": {
      "id": "Security Continuous Monitoring (DE.CM)",
      "description": "The information system and assets are monitored to identify cybersecurity events and verify the effectiveness of protective measures."
    },
    "subcategory": {
      "id": "DE.CM-5",
      "description": "Unauthorized mobile code is detected"
    },
    "mappings": {
      "CIS CSC": [
        "7",
        "8"
      ],
      "COBIT 5": [
        "DSS05.01"
      ],
      "ISA 62443-3-3:2013": [
        "SR 2.4"
      ],
      "ISO/IEC 27001:2013": [
        "A.12.5.1",
        "A.12.6.2"
      ],
      "NIST SP 800-53 Rev. 4": [
        "SC-18",
        "SI-4",
        "SC-44"
      ]
    }
  },
  {
    "secFunction": "DETECT (DE)",
    "category": {
      "id": "Security Continuous Monitoring (DE.CM)",
      "description": "The information system and assets are monitored to identify cybersecurity events and verify the effectiveness of protective measures."
    },
    "subcategory": {
      "id": "DE.CM-6",
      "description": "External service provider activity is monitored to detect potential cybersecurity events"
    },
    "mappings": {
      "COBIT 5": [
        "APO07.06",
        "APO10.05"
      ],
      "ISO/IEC 27001:2013": [
        "A.14.2.7",
        "A.15.2.1"
      ],
      "NIST SP 800-53 Rev. 4": [
        "CA-7",
        "PS-7",
        "SA-4",
        "SA-9",
        "SI-4"
      ]
    }
  },
  {
    "secFunction": "DETECT (DE)",
    "category": {
      "id": "Security Continuous Monitoring (DE.CM)",
      "description": "The information system and assets are monitored to identify cybersecurity events and verify the effectiveness of protective measures."
    },
    "subcategory": {
      "id": "DE.CM-7",
      "description": "Monitoring for unauthorized personnel, connections, devices, and software is performed"
    },
    "mappings": {
      "CIS CSC": [
        "1",
        "2",
        "3",
        "5",
        "9",
        "12",
        "13",
        "15",
        "16"
      ],
      "COBIT 5": [
        "DSS05.02",
        "DSS05.05"
      ],
      "ISO/IEC 27001:2013": [
        "A.12.4.1",
        "A.14.2.7",
        "A.15.2.1"
      ],
      "NIST SP 800-53 Rev. 4": [
        "AU-12",
        "CA-7",
        "CM-3",
        "CM-8",
        "PE-3",
        "PE-6",
        "PE-20",
        "SI-4"
      ]
    }
  },
  {
    "secFunction": "DETECT (DE)",
    "category": {
      "id": "Security Continuous Monitoring (DE.CM)",
      "description": "The information system and assets are monitored to identify cybersecurity events and verify the effectiveness of protective measures."
    },
    "subcategory": {
      "id": "DE.CM-8",
      "description": "Vulnerability scans are performed"
    },
    "mappings": {
      "CIS CSC": [
        "4",
        "20"
      ],
      "COBIT 5": [
        "BAI03.10",
        "DSS05.01"
      ],
      "ISA 62443-2-1:2009": [
        "4.2.3.1",
        "4.2.3.7"
      ],
      "ISO/IEC 27001:2013": [
        "A.12.6.1"
      ],
      "NIST SP 800-53 Rev. 4": [
        "RA-5"
      ]
    }
  },
  {
    "secFunction": "DETECT (DE)",
    "category": {
      "id": "Detection Processes (DE.DP)",
      "description": "Detection processes and procedures are maintained and tested to ensure awareness of anomalous events."
    },
    "subcategory": {
      "id": "DE.DP-1",
      "description": "Roles and responsibilities for detection are well defined to ensure accountability"
    },
    "mappings": {
      "CIS CSC": [
        "19"
      ],
      "COBIT 5": [
        "APO01.02",
        "DSS05.01",
        "DSS06.03"
      ],
      "ISA 62443-2-1:2009": [
        "4.4.3.1"
      ],
      "ISO/IEC 27001:2013": [
        "A.6.1.1",
        "A.7.2.2"
      ],
      "NIST SP 800-53 Rev. 4": [
        "CA-2",
        "CA-7",
        "PM-14"
      ]
    }
  },
  {
    "secFunction": "DETECT (DE)",
    "category": {
      "id": "Detection Processes (DE.DP)",
      "description": "Detection processes and procedures are maintained and tested to ensure awareness of anomalous events."
    },
    "subcategory": {
      "id": "DE.DP-2",
      "description": "Detection activities comply with all applicable requirements"
    },
    "mappings": {
      "COBIT 5": [
        "DSS06.01",
        "MEA03.03",
        "MEA03.04"
      ],
      "ISA 62443-2-1:2009": [
        "4.4.3.2"
      ],
      "ISO/IEC 27001:2013": [
        "A.18.1.4",
        "A.18.2.2",
        "A.18.2.3"
      ],
      "NIST SP 800-53 Rev. 4": [
        "AC-25",
        "CA-2",
        "CA-7",
        "SA-18",
        "SI-4",
        "PM-14"
      ]
    }
  },
  {
    "secFunction": "DETECT (DE)",
    "category": {
      "id": "Detection Processes (DE.DP)",
      "description": "Detection processes and procedures are maintained and tested to ensure awareness of anomalous events."
    },
    "subcategory": {
      "id": "DE.DP-3",
      "description": "Detection processes are tested"
    },
    "mappings": {
      "COBIT 5": [
        "APO13.02",
        "DSS05.02"
      ],
      "ISA 62443-2-1:2009": [
        "4.4.3.2"
      ],
      "ISA 62443-3-3:2013": [
        "SR 3.3"
      ],
      "ISO/IEC 27001:2013": [
        "A.14.2.8"
      ],
      "NIST SP 800-53 Rev. 4": [
        "CA-2",
        "CA-7",
        "PE-3",
        "SI-3",
        "SI-4",
        "PM-14"
      ]
    }
  },
  {
    "secFunction": "DETECT (DE)",
    "category": {
      "id": "Detection Processes (DE.DP)",
      "description": "Detection processes and procedures are maintained and tested to ensure awareness of anomalous events."
    },
    "subcategory": {
      "id": "DE.DP-4",
      "description": "Event detection information is communicated"
    },
    "mappings": {
      "CIS CSC": [
        "19"
      ],
      "COBIT 5": [
        "APO08.04",
        "APO12.06",
        "DSS02.05"
      ],
      "ISA 62443-2-1:2009": [
        "4.3.4.5.9"
      ],
      "ISA 62443-3-3:2013": [
        "SR 6.1"
      ],
      "ISO/IEC 27001:2013": [
        "A.16.1.2",
        "A.16.1.3"
      ],
      "NIST SP 800-53 Rev. 4": [
        "AU-6",
        "CA-2",
        "CA-7",
        "RA-5",
        "SI-4"
      ]
    }
  },
  {
    "secFunction": "DETECT (DE)",
    "category": {
      "id": "Detection Processes (DE.DP)",
      "description": "Detection processes and procedures are maintained and tested to ensure awareness of anomalous events."
    },
    "subcategory": {
      "id": "DE.DP-5",
      "description": "Detection processes are continuously improved"
    },
    "mappings": {
      "COBIT 5": [
        "APO11.06",
        "APO12.06",
        "DSS04.05"
      ],
      "ISA 62443-2-1:2009": [
        "4.4.3.4"
      ],
      "ISO/IEC 27001:2013": [
        "A.16.1.6"
      ],
      "NIST SP 800-53 Rev. 4": [
        "",
        "CA-2",
        "CA-7",
        "PL-2",
        "RA-5",
        "SI-4",
        "PM-14"
      ]
    }
  },
  {
    "secFunction": "RESPOND (RS)",
    "category": {
      "id": "Response Planning (RS.RP)",
      "description": "Response processes and procedures are executed and maintained, to ensure response to detected cybersecurity incidents."
    },
    "subcategory": {
      "id": "RS.RP-1",
      "description": "Response plan is executed during or after an incident"
    },
    "mappings": {
      "CIS CSC": [
        "19"
      ],
      "COBIT 5": [
        "APO12.06",
        "BAI01.10"
      ],
      "ISA 62443-2-1:2009": [
        "4.3.4.5.1"
      ],
      "ISO/IEC 27001:2013": [
        "A.16.1.5"
      ],
      "NIST SP 800-53 Rev. 4": [
        "CP-2",
        "CP-10",
        "IR-4",
        "IR-8"
      ]
    }
  },
  {
    "secFunction": "RESPOND (RS)",
    "category": {
      "id": "Communications (RS.CO)",
      "description": "Response activities are coordinated with internal and external stakeholders (e.g. external support from law enforcement agencies)."
    },
    "subcategory": {
      "id": "RS.CO-1",
      "description": "Personnel know their roles and order of operations when a response is needed"
    },
    "mappings": {
      "CIS CSC": [
        "19"
      ],
      "COBIT 5": [
        "EDM03.02",
        "APO01.02",
        "APO12.03"
      ],
      "ISA 62443-2-1:2009": [
        "4.3.4.5.2",
        "4.3.4.5.3",
        "4.3.4.5.4"
      ],
      "ISO/IEC 27001:2013": [
        "A.6.1.1",
        "A.7.2.2",
        "A.16.1.1"
      ],
      "NIST SP 800-53 Rev. 4": [
        "CP-2",
        "CP-3",
        "IR-3",
        "IR-8"
      ]
    }
  },
  {
    "secFunction": "RESPOND (RS)",
    "category": {
      "id": "Communications (RS.CO)",
      "description": "Response activities are coordinated with internal and external stakeholders (e.g. external support from law enforcement agencies)."
    },
    "subcategory": {
      "id": "RS.CO-2",
      "description": "Incidents are reported consistent with established criteria"
    },
    "mappings": {
      "CIS CSC": [
        "19"
      ],
      "COBIT 5": [
        "DSS01.03"
      ],
      "ISA 62443-2-1:2009": [
        "4.3.4.5.5"
      ],
      "ISO/IEC 27001:2013": [
        "A.6.1.3",
        "A.16.1.2"
      ],
      "NIST SP 800-53 Rev. 4": [
        "AU-6",
        "IR-6",
        "IR-8"
      ]
    }
  },
  {
    "secFunction": "RESPOND (RS)",
    "category": {
      "id": "Communications (RS.CO)",
      "description": "Response activities are coordinated with internal and external stakeholders (e.g. external support from law enforcement agencies)."
    },
    "subcategory": {
      "id": "RS.CO-3",
      "description": "Information is shared consistent with response plans"
    },
    "mappings": {
      "CIS CSC": [
        "19"
      ],
      "COBIT 5": [
        "DSS03.04"
      ],
      "ISA 62443-2-1:2009": [
        "4.3.4.5.2"
      ],
      "ISO/IEC 27001:2013": [
        "A.16.1.2",
        "Clause 7.4",
        "Clause 16.1.2"
      ],
      "NIST SP 800-53 Rev. 4": [
        "CA-2",
        "CA-7",
        "CP-2",
        "IR-4",
        "IR-8",
        "PE-6",
        "RA-5",
        "SI-4"
      ]
    }
  },
  {
    "secFunction": "RESPOND (RS)",
    "category": {
      "id": "Communications (RS.CO)",
      "description": "Response activities are coordinated with internal and external stakeholders (e.g. external support from law enforcement agencies)."
    },
    "subcategory": {
      "id": "RS.CO-4",
      "description": "Coordination with stakeholders occurs consistent with response plans"
    },
    "mappings": {
      "CIS CSC": [
        "19"
      ],
      "COBIT 5": [
        "DSS03.04"
      ],
      "ISA 62443-2-1:2009": [
        "4.3.4.5.5"
      ],
      "ISO/IEC 27001:2013": [
        "Clause 7.4"
      ],
      "NIST SP 800-53 Rev. 4": [
        "CP-2",
        "IR-4",
        "IR-8"
      ]
    }
  },
  {
    "secFunction": "RESPOND (RS)",
    "category": {
      "id": "Communications (RS.CO)",
      "description": "Response activities are coordinated with internal and external stakeholders (e.g. external support from law enforcement agencies)."
    },
    "subcategory": {
      "id": "RS.CO-5",
      "description": "Voluntary information sharing occurs with external stakeholders to achieve broader cybersecurity situational awareness"
    },
    "mappings": {
      "CIS CSC": [
        "19"
      ],
      "COBIT 5": [
        "BAI08.04"
      ],
      "ISO/IEC 27001:2013": [
        "A.6.1.4"
      ],
      "NIST SP 800-53 Rev. 4": [
        "SI-5",
        "PM-15"
      ]
    }
  },
  {
    "secFunction": "RESPOND (RS)",
    "category": {
      "id": "Analysis (RS.AN)",
      "description": "Analysis is conducted to ensure effective response and support recovery activities."
    },
    "subcategory": {
      "id": "RS.AN-1",
      "description": "Notifications from detection systems are investigated"
    },
    "mappings": {
      "CIS CSC": [
        "4",
        "6",
        "8",
        "19"
      ],
      "COBIT 5": [
        "DSS02.04",
        "DSS02.07"
      ],
      "ISA 62443-2-1:2009": [
        "4.3.4.5.6",
        "4.3.4.5.7",
        "4.3.4.5.8"
      ],
      "ISA 62443-3-3:2013": [
        "SR 6.1"
      ],
      "ISO/IEC 27001:2013": [
        "A.12.4.1",
        "A.12.4.3",
        "A.16.1.5"
      ],
      "NIST SP 800-53 Rev. 4": [
        "AU-6",
        "CA-7",
        "IR-4",
        "IR-5",
        "PE-6",
        "SI-4"
      ]
    }
  },
  {
    "secFunction": "RESPOND (RS)",
    "category": {
      "id": "Analysis (RS.AN)",
      "description": "Analysis is conducted to ensure effective response and support recovery activities."
    },
    "subcategory": {
      "id": "RS.AN-2",
      "description": "The impact of the incident is understood"
    },
    "mappings": {
      "COBIT 5": [
        "DSS02.02"
      ],
      "ISA 62443-2-1:2009": [
        "4.3.4.5.6",
        "4.3.4.5.7",
        "4.3.4.5.8"
      ],
      "ISO/IEC 27001:2013": [
        "A.16.1.4",
        "A.16.1.6"
      ],
      "NIST SP 800-53 Rev. 4": [
        "CP-2",
        "IR-4"
      ]
    }
  },
  {
    "secFunction": "RESPOND (RS)",
    "category": {
      "id": "Analysis (RS.AN)",
      "description": "Analysis is conducted to ensure effective response and support recovery activities."
    },
    "subcategory": {
      "id": "RS.AN-3",
      "description": "Forensics are performed"
    },
    "mappings": {
      "COBIT 5": [
        "APO12.06",
        "DSS03.02",
        "DSS05.07"
      ],
      "ISA 62443-3-3:2013": [
        "SR 2.8",
        "SR 2.9",
        "SR 2.10",
        "SR 2.11",
        "SR 2.12",
        "SR 3.9",
        "SR 6.1"
      ],
      "ISO/IEC 27001:2013": [
        "A.16.1.7"
      ],
      "NIST SP 800-53 Rev. 4": [
        "AU-7",
        "IR-4"
      ]
    }
  },
  {
    "secFunction": "RESPOND (RS)",
    "category": {
      "id": "Analysis (RS.AN)",
      "description": "Analysis is conducted to ensure effective response and support recovery activities."
    },
    "subcategory": {
      "id": "RS.AN-4",
      "description": "Incidents are categorized consistent with response plans"
    },
    "mappings": {
      "CIS CSC": [
        "19"
      ],
      "COBIT 5": [
        "DSS02.02"
      ],
      "ISA 62443-2-1:2009": [
        "4.3.4.5.6"
      ],
      "ISO/IEC 27001:2013": [
        "A.16.1.4"
      ],
      "NIST SP 800-53 Rev. 4": [
        "CP-2",
        "IR-4",
        "IR-5",
        "IR-8"
      ]
    }
  },
  {
    "secFunction": "RESPOND (RS)",
    "category": {
      "id": "Analysis (RS.AN)",
      "description": "Analysis is conducted to ensure effective response and support recovery activities."
    },
    "subcategory": {
      "id": "RS.AN-5",
      "description": "Processes are established to receive, analyze and respond to vulnerabilities disclosed to the organization from internal and external sources (e.g. internal testing, security bulletins, or security researchers)"
    },
    "mappings": {
      "CIS CSC": [
        "4",
        "19"
      ],
      "COBIT 5": [
        "EDM03.02",
        "DSS05.07"
      ],
      "NIST SP 800-53 Rev. 4": [
        "SI-5",
        "PM-15"
      ]
    }
  },
  {
    "secFunction": "RESPOND (RS)",
    "category": {
      "id": "Mitigation (RS.MI)",
      "description": "Activities are performed to prevent expansion of an event, mitigate its effects, and resolve the incident."
    },
    "subcategory": {
      "id": "RS.MI-1",
      "description": "Incidents are contained"
    },
    "mappings": {
      "CIS CSC": [
        "19"
      ],
      "COBIT 5": [
        "APO12.06"
      ],
      "ISA 62443-2-1:2009": [
        "4.3.4.5.6"
      ],
      "ISA 62443-3-3:2013": [
        "SR 5.1",
        "SR 5.2",
        "SR 5.4"
      ],
      "ISO/IEC 27001:2013": [
        "A.12.2.1",
        "A.16.1.5"
      ],
      "NIST SP 800-53 Rev. 4": [
        "IR-4"
      ]
    }
  },
  {
    "secFunction": "RESPOND (RS)",
    "category": {
      "id": "Mitigation (RS.MI)",
      "description": "Activities are performed to prevent expansion of an event, mitigate its effects, and resolve the incident."
    },
    "subcategory": {
      "id": "RS.MI-2",
      "description": "Incidents are mitigated"
    },
    "mappings": {
      "CIS CSC": [
        "4",
        "19"
      ],
      "COBIT 5": [
        "APO12.06"
      ],
      "ISA 62443-2-1:2009": [
        "4.3.4.5.6",
        "4.3.4.5.10"
      ],
      "ISO/IEC 27001:2013": [
        "A.12.2.1",
        "A.16.1.5"
      ],
      "NIST SP 800-53 Rev. 4": [
        "IR-4"
      ]
    }
  },
  {
    "secFunction": "RESPOND (RS)",
    "category": {
      "id": "Mitigation (RS.MI)",
      "description": "Activities are performed to prevent expansion of an event, mitigate its effects, and resolve the incident."
    },
    "subcategory": {
      "id": "RS.MI-3",
      "description": "Newly identified vulnerabilities are mitigated or documented as accepted risks"
    },
    "mappings": {
      "CIS CSC": [
        "4"
      ],
      "COBIT 5": [
        "APO12.06"
      ],
      "ISO/IEC 27001:2013": [
        "A.12.6.1"
      ],
      "NIST SP 800-53 Rev. 4": [
        "CA-7",
        "RA-3",
        "RA-5"
      ]
    }
  },
  {
    "secFunction": "RESPOND (RS)",
    "category": {
      "id": "Improvements (RS.IM)",
      "description": "Organizational response activities are improved by incorporating lessons learned from current and previous detection/response activities."
    },
    "subcategory": {
      "id": "RS.IM-1",
      "description": "Response   plans incorporate lessons learned"
    },
    "mappings": {
      "COBIT 5": [
        "BAI01.13"
      ],
      "ISA 62443-2-1:2009": [
        "4.3.4.5.10",
        "4.4.3.4"
      ],
      "ISO/IEC 27001:2013": [
        "A.16.1.6",
        "Clause 10"
      ],
      "NIST SP 800-53 Rev. 4": [
        "CP-2",
        "IR-4",
        "IR-8"
      ]
    }
  },
  {
    "secFunction": "RESPOND (RS)",
    "category": {
      "id": "Improvements (RS.IM)",
      "description": "Organizational response activities are improved by incorporating lessons learned from current and previous detection/response activities."
    },
    "subcategory": {
      "id": "RS.IM-2",
      "description": "Response strategies are updated"
    },
    "mappings": {
      "COBIT 5": [
        "BAI01.13",
        "DSS04.08"
      ],
      "ISO/IEC 27001:2013": [
        "A.16.1.6",
        "Clause 10"
      ],
      "NIST SP 800-53 Rev. 4": [
        "CP-2",
        "IR-4",
        "IR-8"
      ]
    }
  },
  {
    "secFunction": "RECOVER (RC)",
    "category": {
      "id": "Recovery Planning (RC.RP)",
      "description": "Recovery processes and procedures are executed and maintained to ensure restoration of systems or assets affected by cybersecurity incidents."
    },
    "subcategory": {
      "id": "RC.RP-1",
      "description": "Recovery plan is executed during or after a cybersecurity incident"
    },
    "mappings": {
      "CIS CSC": [
        "10"
      ],
      "COBIT 5": [
        "APO12.06",
        "DSS02.05",
        "DSS03.04"
      ],
      "ISO/IEC 27001:2013": [
        "A.16.1.5"
      ],
      "NIST SP 800-53 Rev. 4": [
        "CP-10",
        "IR-4",
        "IR-8"
      ]
    }
  },
  {
    "secFunction": "RECOVER (RC)",
    "category": {
      "id": "Improvements (RC.IM)",
      "description": "Recovery planning and processes are improved by incorporating lessons learned into future activities."
    },
    "subcategory": {
      "id": "RC.IM-1",
      "description": "Recovery plans incorporate lessons learned"
    },
    "mappings": {
      "COBIT 5": [
        "APO12.06",
        "BAI05.07",
        "DSS04.08"
      ],
      "ISA 62443-2-1:2009": [
        "4.4.3.4"
      ],
      "ISO/IEC 27001:2013": [
        "A.16.1.6",
        "Clause 10"
      ],
      "NIST SP 800-53 Rev. 4": [
        "CP-2",
        "IR-4",
        "IR-8"
      ]
    }
  },
  {
    "secFunction": "RECOVER (RC)",
    "category": {
      "id": "Improvements (RC.IM)",
      "description": "Recovery planning and processes are improved by incorporating lessons learned into future activities."
    },
    "subcategory": {
      "id": "RC.IM-2",
      "description": "Recovery strategies are updated"
    },
    "mappings": {
      "COBIT 5": [
        "APO12.06",
        "BAI07.08"
      ],
      "ISO/IEC 27001:2013": [
        "A.16.1.6",
        "Clause 10"
      ],
      "NIST SP 800-53 Rev. 4": [
        "CP-2",
        "IR-4",
        "IR-8"
      ]
    }
  },
  {
    "secFunction": "RECOVER (RC)",
    "category": {
      "id": "Communications (RC.CO)",
      "description": "Restoration activities are coordinated with internal and external parties (e.g.  coordinating centers, Internet Service Providers, owners of attacking systems, victims, other CSIRTs, and vendors)."
    },
    "subcategory": {
      "id": "RC.CO-1",
      "description": "Public relations are managed"
    },
    "mappings": {
      "COBIT 5": [
        "EDM03.02"
      ],
      "ISO/IEC 27001:2013": [
        "A.6.1.4",
        "Clause 7.4"
      ]
    }
  },
  {
    "secFunction": "RECOVER (RC)",
    "category": {
      "id": "Communications (RC.CO)",
      "description": "Restoration activities are coordinated with internal and external parties (e.g.  coordinating centers, Internet Service Providers, owners of attacking systems, victims, other CSIRTs, and vendors)."
    },
    "subcategory": {
      "id": "RC.CO-2",
      "description": "Reputation is repaired after an incident"
    },
    "mappings": {
      "COBIT 5": [
        "MEA03.02"
      ],
      "ISO/IEC 27001:2013": [
        "Clause 7.4"
      ]
    }
  },
  {
    "secFunction": "RECOVER (RC)",
    "category": {
      "id": "Communications (RC.CO)",
      "description": "Restoration activities are coordinated with internal and external parties (e.g.  coordinating centers, Internet Service Providers, owners of attacking systems, victims, other CSIRTs, and vendors)."
    },
    "subcategory": {
      "id": "RC.CO-3",
      "description": "Recovery activities are communicated to internal and external stakeholders as well as executive and management teams"
    },
    "mappings": {
      "COBIT 5": [
        "APO12.06"
      ],
      "ISO/IEC 27001:2013": [
        "Clause 7.4"
      ],
      "NIST SP 800-53 Rev. 4": [
        "CP-2",
        "IR-4"
      ]
    }
  }
]