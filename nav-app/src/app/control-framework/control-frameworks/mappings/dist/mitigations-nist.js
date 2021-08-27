"use strict";
exports.__esModule = true;
exports.mitigationNist = void 0;
exports.mitigationNist = [
    {
        "mitigation": {
            "attackId": "M1036",
            "description": "Configure features related to account use like login attempt lockouts, specific login times, etc.",
            "url": "https://attack.mitre.org/mitigations/M1036"
        },
        "nist": [
            "PR.AC-4",
            "PR.AC-1",
            "PR.AT-2",
            "PR.AC-3",
            "PR.AC-6"
        ]
    },
    {
        "mitigation": {
            "attackId": "M1015",
            "description": "Configure Active Directory to prevent use of certain techniques; use SID Filtering, etc.",
            "url": "https://attack.mitre.org/mitigations/M1015"
        },
        "nist": [
            "PR.AC-7",
            "PR.AC-4",
            "PR.AC-1",
            "PR.AT-2",
            "ID.SC-3",
            "ID.SC-2"
        ]
    },
    {
        "mitigation": {
            "attackId": "M1049",
            "description": "Use signatures or heuristics to detect malicious software.",
            "url": "https://attack.mitre.org/mitigations/M1049"
        },
        "nist": [
            "DE.CM-1",
            "DE.CM-4",
            "RS.AN-1"
        ]
    },
    {
        "mitigation": {
            "attackId": "M1013",
            "description": "This mitigation describes any guidance or training given to developers of applications to avoid introducing security weaknesses that an adversary may be able to take advantage of.",
            "url": "https://attack.mitre.org/mitigations/M1013"
        },
        "nist": [
            "DE.CM-1",
            "PR.AC-7",
            "PR.AT-2",
            "PR.DS-5"
        ]
    },
    {
        "mitigation": {
            "attackId": "M1048",
            "description": "Restrict execution of code to a virtual environment on or in transit to an endpoint system.",
            "url": "https://attack.mitre.org/mitigations/M1048"
        },
        "nist": [
            "DE.CM-1",
            "DE.CM-4",
            "PR.MA-1",
            "PR.AC-5",
            "DE.CM-8",
            "DE.CM-7",
            "RS.AN-1"
        ]
    },
    {
        "mitigation": {
            "attackId": "M1047",
            "description": "Perform audits or scans of systems, permissions, insecure software, insecure configurations, etc. to identify potential weaknesses.",
            "url": "https://attack.mitre.org/mitigations/M1047"
        },
        "nist": [
            "DE.CM-1",
            "DE.CM-4",
            "RS.AN-1",
            "PR.AC-4",
            "DE.CM-3",
            "PR.AC-1",
            "PR.AT-2",
            "PR.PT-1"
        ]
    },
    {
        "mitigation": {
            "attackId": "M1040",
            "description": "Use capabilities to prevent suspicious behavior patterns from occurring on endpoint systems. This could include suspicious process, file, API call, etc. behavior.",
            "url": "https://attack.mitre.org/mitigations/M1040"
        },
        "nist": []
    },
    {
        "mitigation": {
            "attackId": "M1046",
            "description": "Use secure methods to boot a system and verify the integrity of the operating system and loading mechanisms.",
            "url": "https://attack.mitre.org/mitigations/M1046"
        },
        "nist": []
    },
    {
        "mitigation": {
            "attackId": "M1045",
            "description": "Enforce binary and application integrity with digital signature verification to prevent untrusted code from executing.",
            "url": "https://attack.mitre.org/mitigations/M1045"
        },
        "nist": [
            "DE.CM-1",
            "DE.CM-4",
            "RS.AN-1",
            "PR.AC-4",
            "PR.AC-1",
            "PR.AT-2"
        ]
    },
    {
        "mitigation": {
            "attackId": "M1043",
            "description": "Use capabilities to prevent successful credential access by adversaries; including blocking forms of credential dumping.",
            "url": "https://attack.mitre.org/mitigations/M1043"
        },
        "nist": [
            "PR.AC-7",
            "PR.AC-4",
            "PR.AC-1",
            "PR.AT-2"
        ]
    },
    {
        "mitigation": {
            "attackId": "M1053",
            "description": "Take and store data backups from end user systems and critical servers. Ensure backup and storage systems are hardened and kept separate from the corporate network to prevent compromise.",
            "url": "https://attack.mitre.org/mitigations/M1053"
        },
        "nist": [
            "PR.IP-4",
            "PR.DS-5"
        ]
    },
    {
        "mitigation": {
            "attackId": "M1042",
            "description": "Remove or deny access to unnecessary and potentially vulnerable software to prevent abuse by adversaries.",
            "url": "https://attack.mitre.org/mitigations/M1042"
        },
        "nist": [
            "PR.AC-7",
            "DE.CM-1",
            "PR.PT-2",
            "PR.IP-1",
            "DE.CM-7",
            "DE.CM-4",
            "RS.AN-1",
            "PR.AC-1",
            "PR.AC-3",
            "PR.AC-5"
        ]
    },
    {
        "mitigation": {
            "attackId": "M1055",
            "description": "This category is to associate techniques that mitigation might increase risk of compromise and therefore mitigation is not recommended.",
            "url": "https://attack.mitre.org/mitigations/M1055"
        },
        "nist": []
    },
    {
        "mitigation": {
            "attackId": "M1041",
            "description": "Protect sensitive information with strong encryption.",
            "url": "https://attack.mitre.org/mitigations/M1041"
        },
        "nist": [
            "DE.CM-1",
            "DE.CM-7",
            "DE.CM-4",
            "RS.AN-1",
            "PR.AC-4",
            "PR.AC-6",
            "PR.AC-5",
            "PR.DS-5",
            "PR.AC-7",
            "PR.AC-1",
            "PR.AT-2"
        ]
    },
    {
        "mitigation": {
            "attackId": "M1039",
            "description": "Prevent modification of environment variables by unauthorized users and groups.",
            "url": "https://attack.mitre.org/mitigations/M1039"
        },
        "nist": []
    },
    {
        "mitigation": {
            "attackId": "M1038",
            "description": "Block execution of code on a system through application control, and/or script blocking.",
            "url": "https://attack.mitre.org/mitigations/M1038"
        },
        "nist": [
            "DE.CM-1",
            "RS.AN-1",
            "DE.CM-7",
            "DE.CM-4"
        ]
    },
    {
        "mitigation": {
            "attackId": "M1050",
            "description": "Use capabilities to detect and block conditions that may lead to or be indicative of a software exploit occurring.",
            "url": "https://attack.mitre.org/mitigations/M1050"
        },
        "nist": [
            "DE.CM-1",
            "DE.CM-4",
            "PR.MA-1",
            "DE.CM-7",
            "RS.AN-1",
            "DE.CM-8",
            "PR.AC-5"
        ]
    },
    {
        "mitigation": {
            "attackId": "M1037",
            "description": "Use network appliances to filter ingress or egress traffic and perform protocol-based filtering. Configure software on endpoints to filter network traffic.",
            "url": "https://attack.mitre.org/mitigations/M1037"
        },
        "nist": [
            "PR.PT-4",
            "DE.CM-1",
            "DE.CM-7",
            "DE.CM-4",
            "RS.AN-1",
            "PR.DS-5",
            "PR.AC-5",
            "PR.DS-2"
        ]
    },
    {
        "mitigation": {
            "attackId": "M1035",
            "description": "Prevent access to file shares, remote access to systems, unnecessary services. Mechanisms to limit access may include use of network concentrators, RDP gateways, etc.",
            "url": "https://attack.mitre.org/mitigations/M1035"
        },
        "nist": [
            "ID.AM-1",
            "DE.CM-1",
            "PR.AC-7",
            "PR.AC-2",
            "PR.AC-1",
            "PR.AC-3",
            "PR.AC-5"
        ]
    },
    {
        "mitigation": {
            "attackId": "M1034",
            "description": "Block users or groups from installing or using unapproved hardware on systems, including USB devices.",
            "url": "https://attack.mitre.org/mitigations/M1034"
        },
        "nist": [
            "ID.AM-1",
            "DE.CM-1",
            "PR.AC-7",
            "PR.AC-2",
            "PR.PT-2",
            "PR.IP-1"
        ]
    },
    {
        "mitigation": {
            "attackId": "M1033",
            "description": "Block users or groups from installing unapproved software.",
            "url": "https://attack.mitre.org/mitigations/M1033"
        },
        "nist": [
            "PR.PT-1"
        ]
    },
    {
        "mitigation": {
            "attackId": "M1032",
            "description": "Use two or more pieces of evidence to authenticate to a system; such as username and password in addition to a token from a physical smart card or token generator.",
            "url": "https://attack.mitre.org/mitigations/M1032"
        },
        "nist": [
            "DE.CM-1",
            "DE.CM-7",
            "DE.CM-4",
            "RS.AN-1",
            "PR.AC-4",
            "PR.AC-1",
            "PR.AT-2",
            "PR.AC-3",
            "PR.AC-6",
            "PR.AC-7",
            "PR.AC-5",
            "ID.SC-3",
            "ID.SC-2"
        ]
    },
    {
        "mitigation": {
            "attackId": "M1031",
            "description": "Use intrusion detection signatures to block traffic at network boundaries.",
            "url": "https://attack.mitre.org/mitigations/M1031"
        },
        "nist": [
            "DE.CM-1",
            "DE.CM-4",
            "DE.CM-7",
            "RS.AN-1",
            "PR.DS-5",
            "PR.AC-5",
            "PR.IP-1"
        ]
    },
    {
        "mitigation": {
            "attackId": "M1030",
            "description": "Architect sections of the network to isolate critical systems, functions, or resources. Use physical and logical segmentation to prevent access to potentially sensitive systems and information. Use a DMZ to contain any internet-facing services that should not be exposed from the internal network. Configure separate virtual private cloud (VPC) instances to isolate critical cloud systems.",
            "url": "https://attack.mitre.org/mitigations/M1030"
        },
        "nist": [
            "DE.CM-1",
            "DE.CM-7",
            "DE.CM-4",
            "RS.AN-1",
            "PR.AC-7",
            "PR.AC-4",
            "PR.AT-2",
            "PR.AC-5",
            "ID.SC-3",
            "ID.SC-2",
            "PR.DS-5",
            "DE.CM-8",
            "PR.MA-1",
            "PR.AC-1",
            "PR.AC-3",
            "PR.AC-6"
        ]
    },
    {
        "mitigation": {
            "attackId": "M1028",
            "description": "Make configuration changes related to the operating system or a common feature of the operating system that result in system hardening against techniques.",
            "url": "https://attack.mitre.org/mitigations/M1028"
        },
        "nist": [
            "DE.CM-1",
            "DE.CM-7",
            "DE.CM-4",
            "RS.AN-1",
            "PR.AC-7",
            "PR.AC-4",
            "PR.AT-2",
            "PR.AC-1",
            "PR.PT-4"
        ]
    },
    {
        "mitigation": {
            "attackId": "M1027",
            "description": "Set and enforce secure password policies for accounts.",
            "url": "https://attack.mitre.org/mitigations/M1027"
        },
        "nist": [
            "PR.AC-4",
            "PR.AC-1",
            "PR.AT-2",
            "PR.AC-3",
            "PR.AC-6",
            "PR.AC-7",
            "DE.CM-1",
            "PR.DS-5",
            "DE.CM-7",
            "DE.CM-4",
            "RS.AN-1",
            "ID.SC-3",
            "ID.SC-2",
            "PR.DS-2"
        ]
    },
    {
        "mitigation": {
            "attackId": "M1026",
            "description": "Manage the creation, modification, use, and permissions associated to privileged accounts, including SYSTEM and root.",
            "url": "https://attack.mitre.org/mitigations/M1026"
        },
        "nist": [
            "DE.CM-1",
            "DE.CM-7",
            "DE.CM-4",
            "RS.AN-1",
            "PR.AC-7",
            "PR.AC-4",
            "PR.AT-2",
            "PR.AC-1",
            "PR.DS-5",
            "PR.AC-5",
            "DE.CM-8",
            "PR.MA-1",
            "ID.SC-3",
            "ID.SC-2"
        ]
    },
    {
        "mitigation": {
            "attackId": "M1025",
            "description": "Protect processes with high privileges that can be used to interact with critical system components through use of protected process light, anti-process injection defenses, or other process integrity enforcement measures.",
            "url": "https://attack.mitre.org/mitigations/M1025"
        },
        "nist": [
            "PR.AC-7",
            "PR.AC-4",
            "PR.AC-1",
            "PR.AT-2"
        ]
    },
    {
        "mitigation": {
            "attackId": "M1029",
            "description": "Use remote security log and sensitive file storage where access can be controlled better to prevent exposure of intrusion detection log data or sensitive information.",
            "url": "https://attack.mitre.org/mitigations/M1029"
        },
        "nist": [
            "ID.SC-3",
            "ID.SC-2",
            "DE.CM-1",
            "DE.CM-4",
            "RS.AN-1",
            "PR.AC-4",
            "PR.AC-6",
            "PR.AC-5",
            "PR.DS-5"
        ]
    },
    {
        "mitigation": {
            "attackId": "M1022",
            "description": "Restrict access by setting directory and file permissions that are not specific to users or privileged accounts.",
            "url": "https://attack.mitre.org/mitigations/M1022"
        },
        "nist": [
            "DE.CM-1",
            "DE.CM-4",
            "RS.AN-1",
            "PR.AC-4",
            "PR.AC-6",
            "PR.AC-5",
            "PR.DS-5",
            "PR.PT-1"
        ]
    },
    {
        "mitigation": {
            "attackId": "M1044",
            "description": "Prevent abuse of library loading mechanisms in the operating system and software to load untrusted code by configuring appropriate library loading mechanisms and investigating potential vulnerable software.",
            "url": "https://attack.mitre.org/mitigations/M1044"
        },
        "nist": []
    },
    {
        "mitigation": {
            "attackId": "M1024",
            "description": "Restrict the ability to modify certain hives or keys in the Windows Registry.",
            "url": "https://attack.mitre.org/mitigations/M1024"
        },
        "nist": [
            "DE.CM-1",
            "RS.AN-1"
        ]
    },
    {
        "mitigation": {
            "attackId": "M1021",
            "description": "Restrict use of certain websites, block downloads/attachments, block Javascript, restrict browser extensions, etc.",
            "url": "https://attack.mitre.org/mitigations/M1021"
        },
        "nist": [
            "DE.CM-1",
            "DE.CM-7",
            "DE.CM-4",
            "RS.AN-1",
            "PR.MA-1",
            "PR.PT-4"
        ]
    },
    {
        "mitigation": {
            "attackId": "M1020",
            "description": "Break and inspect SSL/TLS sessions to look at encrypted web traffic for adversary activity.",
            "url": "https://attack.mitre.org/mitigations/M1020"
        },
        "nist": [
            "DE.CM-1"
        ]
    },
    {
        "mitigation": {
            "attackId": "M1054",
            "description": "Implement configuration changes to software (other than the operating system) to mitigate security risks associated to how the software operates.",
            "url": "https://attack.mitre.org/mitigations/M1054"
        },
        "nist": [
            "DE.CM-1",
            "DE.CM-7",
            "DE.CM-4",
            "RS.AN-1"
        ]
    },
    {
        "mitigation": {
            "attackId": "M1019",
            "description": "A threat intelligence program helps an organization generate their own threat intelligence information and track trends to inform defensive priorities to mitigate risk.",
            "url": "https://attack.mitre.org/mitigations/M1019"
        },
        "nist": [
            "DE.CM-1",
            "DE.CM-7",
            "RS.AN-1",
            "DE.CM-4"
        ]
    },
    {
        "mitigation": {
            "attackId": "M1051",
            "description": "Perform regular software updates to mitigate exploitation risk.",
            "url": "https://attack.mitre.org/mitigations/M1051"
        },
        "nist": [
            "ID.SC-3",
            "ID.SC-2",
            "PR.DS-6",
            "DE.CM-8",
            "PR.MA-1",
            "DE.CM-1",
            "DE.CM-4",
            "PR.AC-5",
            "DE.CM-7",
            "RS.AN-1"
        ]
    },
    {
        "mitigation": {
            "attackId": "M1052",
            "description": "Configure Windows User Account Control to mitigate risk of adversaries obtaining elevated process access.",
            "url": "https://attack.mitre.org/mitigations/M1052"
        },
        "nist": [
            "DE.CM-1",
            "PR.AC-5",
            "PR.AC-7"
        ]
    },
    {
        "mitigation": {
            "attackId": "M1018",
            "description": "Manage the creation, modification, use, and permissions associated to user accounts.",
            "url": "https://attack.mitre.org/mitigations/M1018"
        },
        "nist": [
            "PR.AC-4",
            "DE.CM-3",
            "ID.SC-3",
            "ID.SC-2",
            "PR.DS-2",
            "PR.PT-1",
            "PR.AC-1",
            "PR.AT-2",
            "PR.AC-3",
            "PR.AC-6"
        ]
    },
    {
        "mitigation": {
            "attackId": "M1017",
            "description": "Train users to to be aware of access or manipulation attempts by an adversary to reduce the risk of successful spearphishing, social engineering, and other techniques that involve user interaction.",
            "url": "https://attack.mitre.org/mitigations/M1017"
        },
        "nist": [
            "PR.AC-4",
            "DE.CM-3",
            "DE.CM-1",
            "DE.CM-7",
            "DE.CM-4",
            "RS.AN-1",
            "ID.SC-3",
            "ID.SC-2",
            "PR.AC-7",
            "PR.AC-1",
            "PR.AT-2"
        ]
    },
    {
        "mitigation": {
            "attackId": "M1016",
            "description": "Vulnerability scanning is used to find potentially exploitable software vulnerabilities to remediate them.",
            "url": "https://attack.mitre.org/mitigations/M1016"
        },
        "nist": [
            "PR.DS-6",
            "DE.CM-8",
            "PR.MA-1",
            "DE.CM-1",
            "DE.CM-4",
            "PR.AC-5"
        ]
    }
];
