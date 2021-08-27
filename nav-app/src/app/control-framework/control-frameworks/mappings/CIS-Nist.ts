export let cisNist = [
  {
    "cisControlId": "1",
    "cisSubControlId": 1.1,
    "assetType": "Devices",
    "securityFunction": "Identify",
    "title": "Utilize an Active Discovery Tool",
    "description": "Utilize an active discovery tool to identify devices connected to the organization's network and update the hardware asset inventory.",
    "mappings": {
      "NIST SP 800-53 Rev. 4": "DE.CM-7"
    },
    "subcategoryName": "Monitoring for unauthorized personnel, connections, devices, and software is performed"
  },
  {
    "cisControlId": "1",
    "cisSubControlId": 1.2,
    "assetType": "Devices",
    "securityFunction": "Identify",
    "title": "Use a Passive Asset Discovery Tool",
    "description": "Utilize a passive discovery tool to identify devices connected to the organization's network and automatically update the organization's hardware asset inventory.",
    "mappings": {
      "NIST SP 800-53 Rev. 4": "DE.CM-7"
    },
    "subcategoryName": "Monitoring for unauthorized personnel, connections, devices, and software is performed"
  },
  {
    "cisControlId": "1",
    "cisSubControlId": 1.3,
    "assetType": "Devices",
    "securityFunction": "Identify",
    "title": "Use DHCP Logging to Update Asset Inventory",
    "description": "Use Dynamic Host Configuration Protocol (DHCP) logging on all DHCP servers or IP address management tools to update the organization's hardware asset inventory.",
    "mappings": {
      "NIST SP 800-53 Rev. 4": "DE.CM-7"
    },
    "subcategoryName": "Monitoring for unauthorized personnel, connections, devices, and software is performed"
  },
  {
    "cisControlId": "1",
    "cisSubControlId": 1.4,
    "assetType": "Devices",
    "securityFunction": "Identify",
    "title": "Maintain Detailed Asset Inventory",
    "description": "Maintain an accurate and up-to-date inventory of all technology assets with the potential to store or process information. This inventory shall include all hardware assets, whether connected to the organization's network or not.",
    "mappings": {
      "NIST SP 800-53 Rev. 4": "PR.DS-3"
    },
    "subcategoryName": "Physical devices and systems within the organization are inventoried"
  },
  {
    "cisControlId": "1",
    "cisSubControlId": 1.5,
    "assetType": "Devices",
    "securityFunction": "Identify",
    "title": "Maintain Asset Inventory Information",
    "description": "Ensure that the hardware asset inventory records the network address, hardware address, machine name, data asset owner, and department for each asset and whether the hardware asset has been approved to connect to the network.",
    "mappings": {
      "NIST SP 800-53 Rev. 4": "PR.DS-3"
    },
    "subcategoryName": "Assets are formally managed throughout removal, transfers, and disposition"
  },
  {
    "cisControlId": "1",
    "cisSubControlId": 1.6,
    "assetType": "Devices",
    "securityFunction": "Respond",
    "title": "Address Unauthorized Assets",
    "description": "Ensure that unauthorized assets are either removed from the network, quarantined or the inventory is updated in a timely manner.",
    "mappings": {
      "NIST SP 800-53 Rev. 4": "PR.DS-3"
    },
    "subcategoryName": "Assets are formally managed throughout removal, transfers, and disposition"
  },
  {
    "cisControlId": "1",
    "cisSubControlId": 1.7,
    "assetType": "Devices",
    "securityFunction": "Protect",
    "title": "Deploy Port Level Access Control",
    "description": "Utilize port level access control, following 802.1x standards, to control which devices can authenticate to the network. The authentication system shall be tied into the hardware asset inventory data to ensure only authorized devices can connect to the network.",
    "mappings": {
      "NIST SP 800-53 Rev. 4": "PR.AC-1"
    },
    "subcategoryName": "Identities and credentials are issued, managed, verified, revoked, and audited for authorized devices, users and processes"
  },
  {
    "cisControlId": "1",
    "cisSubControlId": 1.8,
    "assetType": "Devices",
    "securityFunction": "Protect",
    "title": "Utilize Client Certificates to Authenticate Hardware Assets",
    "description": "Use client certificates to authenticate hardware assets connecting to the organization's trusted network.",
    "mappings": {
      "NIST SP 800-53 Rev. 4": "PR.AC-6"
    },
    "subcategoryName": "Identities are proofed and bound to credentials and asserted in interactions"
  },
  {
    "cisControlId": "2",
    "cisSubControlId": 2.1,
    "assetType": "Applications",
    "securityFunction": "Identify",
    "title": "Maintain Inventory of Authorized Software",
    "description": "Maintain an up-to-date list of all authorized software that is required in the enterprise for any business purpose on any business system.",
    "mappings": {
      "NIST SP 800-53 Rev. 4": "ID.AM-2"
    },
    "subcategoryName": "Software platforms and applications within the organization are inventoried"
  },
  {
    "cisControlId": "2",
    "cisSubControlId": 2.2,
    "assetType": "Applications",
    "securityFunction": "Identify",
    "title": "Ensure Software is Supported by Vendor",
    "description": "Ensure that only software applications or operating systems currently supported by the software's vendor are added to the organization's authorized software inventory. Unsupported software should be tagged as unsupported in the inventory system.",
    "mappings": {
      "NIST SP 800-53 Rev. 4": "ID.AM-2"
    },
    "subcategoryName": "Software platforms and applications within the organization are inventoried"
  },
  {
    "cisControlId": "2",
    "cisSubControlId": 2.3,
    "assetType": "Applications",
    "securityFunction": "Identify",
    "title": "Utilize Software Inventory Tools",
    "description": "Utilize software inventory tools throughout the organization to automate the documentation of all software on business systems.",
    "mappings": {
      "NIST SP 800-53 Rev. 4": "DE.CM-7"
    },
    "subcategoryName": "Monitoring for unauthorized personnel, connections, devices, and software is performed"
  },
  {
    "cisControlId": "2",
    "cisSubControlId": 2.4,
    "assetType": "Applications",
    "securityFunction": "Identify",
    "title": "Track Software Inventory Information",
    "description": "The software inventory system should track the name, version, publisher, and install date for all software, including operating systems authorized by the organization.",
    "mappings": {
      "NIST SP 800-53 Rev. 4": "ID.AM-2"
    },
    "subcategoryName": "Software platforms and applications within the organization are inventoried"
  },
  {
    "cisControlId": "2",
    "cisSubControlId": 2.5,
    "assetType": "Applications",
    "securityFunction": "Identify",
    "title": "Integrate Software and Hardware Asset Inventories",
    "description": "The software inventory system should be tied into the hardware asset inventory so all devices and associated software are tracked from a single location.",
    "mappings": {
      "NIST SP 800-53 Rev. 4": "ID.AM-2"
    },
    "subcategoryName": "Physical devices and systems within the organization are inventoried"
  },
  {
    "cisControlId": "2",
    "cisSubControlId": 2.6,
    "assetType": "Applications",
    "securityFunction": "Respond",
    "title": "Address unapproved software",
    "description": "Ensure that unauthorized software is either removed or the inventory is updated in a timely manner",
    "mappings": {
      "NIST SP 800-53 Rev. 4": "DE.CM-7"
    },
    "subcategoryName": "Monitoring for unauthorized personnel, connections, devices, and software is performed"
  },
  {
    "cisControlId": "2",
    "cisSubControlId": 2.7,
    "assetType": "Applications",
    "securityFunction": "Protect",
    "title": "Utilize Application Whitelisting",
    "description": "Utilize application whitelisting technology on all assets to ensure that only authorized software executes and all unauthorized software is blocked from executing on assets.",
    "mappings": {
      "NIST SP 800-53 Rev. 4": "DE.CM-7"
    },
    "subcategoryName": "Integrity checking mechanisms are used to verify software, firmware, and information integrity"
  },
  {
    "cisControlId": "2",
    "cisSubControlId": 2.8,
    "assetType": "Applications",
    "securityFunction": "Protect",
    "title": "Implement Application Whitelisting of Libraries",
    "description": "The organization's application whitelisting software must ensure that only authorized software libraries (such as *.dll, *.ocx, *.so, etc.) are allowed to load into a system process.",
    "mappings": {
      "NIST SP 800-53 Rev. 4": "DE.CM-7"
    },
    "subcategoryName": "Integrity checking mechanisms are used to verify software, firmware, and information integrity"
  },
  {
    "cisControlId": "2",
    "cisSubControlId": "2.9",
    "assetType": "Applications",
    "securityFunction": "Protect",
    "title": "Implement Application Whitelisting of Scripts",
    "description": "The organization's application whitelisting software must ensure that only authorized, digitally signed scripts (such as *.ps1, \n *.py, macros, etc.) are allowed to run on a system.",
    "mappings": {
      "NIST SP 800-53 Rev. 4": "DE.CM-7"
    },
    "subcategoryName": "Integrity checking mechanisms are used to verify software, firmware, and information integrity"
  },
  {
    "cisControlId": "2",
    "cisSubControlId": "2.10",
    "assetType": "Applications",
    "securityFunction": "Protect",
    "title": "Physically or Logically Segregate High Risk Applications",
    "description": "Physically or logically segregated systems should be used to isolate and run software that is required for business operations but incur higher risk for the organization.",
    "mappings": {
      "NIST SP 800-53 Rev. 4": null
    },
    "subcategoryName": null
  },
  {
    "cisControlId": "3",
    "cisSubControlId": 3.1,
    "assetType": "Applications",
    "securityFunction": "Detect",
    "title": "Run Automated Vulnerability Scanning Tools",
    "description": "Utilize an up-to-date SCAP-compliant vulnerability scanning tool to automatically scan all systems on the network on a weekly or more frequent basis to identify all potential vulnerabilities on the organization's systems.",
    "mappings": {
      "NIST SP 800-53 Rev. 4": "DE.CM-8"
    },
    "subcategoryName": "Asset vulnerabilities are identified and documented"
  },
  {
    "cisControlId": "3",
    "cisSubControlId": 3.2,
    "assetType": "Applications",
    "securityFunction": "Detect",
    "title": "Perform Authenticated Vulnerability Scanning",
    "description": "Perform authenticated vulnerability scanning with agents running locally on each system or with remote scanners that are configured with elevated rights on the system being tested.",
    "mappings": {
      "NIST SP 800-53 Rev. 4": "DE.CM-8"
    },
    "subcategoryName": "Vulnerability scans are performed"
  },
  {
    "cisControlId": "3",
    "cisSubControlId": 3.3,
    "assetType": "Users",
    "securityFunction": "Protect",
    "title": "Protect Dedicated Assessment Accounts",
    "description": "Use a dedicated account for authenticated vulnerability scans, which should not be used for any other administrative activities and should be tied to specific machines at specific IP addresses.",
    "mappings": {
      "NIST SP 800-53 Rev. 4": null
    },
    "subcategoryName": null
  },
  {
    "cisControlId": "3",
    "cisSubControlId": 3.4,
    "assetType": "Applications",
    "securityFunction": "Protect",
    "title": "Deploy Automated Operating System Patch Management Tools",
    "description": "Deploy automated software update tools in order to ensure that the operating systems are running the most recent security updates provided by the software vendor.",
    "mappings": {
      "NIST SP 800-53 Rev. 4": null
    },
    "subcategoryName": null
  },
  {
    "cisControlId": "3",
    "cisSubControlId": 3.5,
    "assetType": "Applications",
    "securityFunction": "Protect",
    "title": "Deploy Automated Software Patch Management Tools",
    "description": "Deploy automated software update tools in order to ensure that third-party software on all systems is running the most recent security updates provided by the software vendor.",
    "mappings": {
      "NIST SP 800-53 Rev. 4": null
    },
    "subcategoryName": null
  },
  {
    "cisControlId": 3,
    "cisSubControlId": 3.6,
    "assetType": "Applications",
    "securityFunction": "Respond",
    "title": "Compare Back-to-back Vulnerability Scans",
    "description": "Regularly compare the results from back-to-back vulnerability scans to verify that vulnerabilities have been remediated in a timely manner.",
    "mappings": {
      "NIST SP 800-53 Rev. 4": null
    },
    "subcategoryName": null
  },
  {
    "cisControlId": 3,
    "cisSubControlId": 3.7,
    "assetType": "Applications",
    "securityFunction": "Respond",
    "title": "Utilize a Risk-rating Process",
    "description": "Utilize a risk-rating process to prioritize the remediation of discovered vulnerabilities.",
    "mappings": {
      "NIST SP 800-53 Rev. 4": "PR.IP-12"
    },
    "subcategoryName": "Newly identified vulnerabilities are mitigated or documented as accepted risks"
  },
  {
    "cisControlId": "4",
    "cisSubControlId": 4.1,
    "assetType": "Users",
    "securityFunction": "Detect",
    "title": "Maintain Inventory of Administrative Accounts",
    "description": "Use automated tools to inventory all administrative accounts, including domain and local accounts, to ensure that only authorized individuals have elevated privileges.",
    "mappings": {
      "NIST SP 800-53 Rev. 4": "PR.AC-1"
    },
    "subcategoryName": "Identities and credentials are issued, managed, verified, revoked, and audited for authorized devices, users and processes"
  },
  {
    "cisControlId": "4",
    "cisSubControlId": 4.2,
    "assetType": "Users",
    "securityFunction": "Protect",
    "title": "Change Default Passwords",
    "description": "Before deploying any new asset, change all default passwords to have values consistent with administrative level accounts.",
    "mappings": {
      "NIST SP 800-53 Rev. 4": "PR.AC-1"
    },
    "subcategoryName": "Identities and credentials are issued, managed, verified, revoked, and audited for authorized devices, users and processes"
  },
  {
    "cisControlId": "4",
    "cisSubControlId": 4.3,
    "assetType": "Users",
    "securityFunction": "Protect",
    "title": "Ensure the Use of Dedicated Administrative Accounts",
    "description": "Ensure that all users with administrative account access use a dedicated or secondary account for elevated activities. This account should only be used for administrative activities and not internet browsing, email, or similar activities.",
    "mappings": {
      "NIST SP 800-53 Rev. 4": "PR.AC-4"
    },
    "subcategoryName": "Access permissions and authorizations are managed, incorporating the principles of least privilege and separation of duties"
  },
  {
    "cisControlId": "4",
    "cisSubControlId": 4.4,
    "assetType": "Users",
    "securityFunction": "Protect",
    "title": "Use Unique Passwords",
    "description": "Where multi-factor authentication is not supported (such as local administrator, root, or service accounts), accounts will use passwords that are unique to that system.",
    "mappings": {
      "NIST SP 800-53 Rev. 4": null
    },
    "subcategoryName": null
  },
  {
    "cisControlId": "4",
    "cisSubControlId": 4.5,
    "assetType": "Users",
    "securityFunction": "Protect",
    "title": "Use Multifactor Authentication For All Administrative Access",
    "description": "Use multi-factor authentication and encrypted channels for all administrative account access.",
    "mappings": {
      "NIST SP 800-53 Rev. 4": "PR.AC-7"
    },
    "subcategoryName": "Users, devices, and other assets are authenticated (e.g., single-factor, multi-factor) commensurate with the risk of the transaction (e.g., individuals’ security and privacy risks and other organizational risks)"
  },
  {
    "cisControlId": "4",
    "cisSubControlId": 4.6,
    "assetType": "Users",
    "securityFunction": "Protect",
    "title": "Use of Dedicated Machines For All Administrative Tasks",
    "description": "Ensure administrators use a dedicated machine for all administrative tasks or tasks requiring administrative access. This machine will be segmented from the organization's primary network and not be allowed Internet access. This machine will not be used for reading e-mail, composing documents, or browsing the Internet.",
    "mappings": {
      "NIST SP 800-53 Rev. 4": null
    },
    "subcategoryName": null
  },
  {
    "cisControlId": "4",
    "cisSubControlId": 4.7,
    "assetType": "Users",
    "securityFunction": "Protect",
    "title": "Limit Access to Script Tools",
    "description": "Limit access to scripting tools (such as Microsoft PowerShell and Python) to only administrative or development users with the need to access those capabilities.",
    "mappings": {
      "NIST SP 800-53 Rev. 4": "PR.PT-3"
    },
    "subcategoryName": "The principle of least functionality is incorporated by configuring systems to provide only essential capabilities"
  },
  {
    "cisControlId": 4,
    "cisSubControlId": 4.8,
    "assetType": "Users",
    "securityFunction": "Detect",
    "title": "Log and Alert on Changes to Administrative Group Membership",
    "description": "Configure systems to issue a log entry and alert when an account is added to or removed from any group assigned administrative privileges.",
    "mappings": {
      "NIST SP 800-53 Rev. 4": "DE.CM-7"
    },
    "subcategoryName": "Monitoring for unauthorized personnel, connections, devices, and software is performed"
  },
  {
    "cisControlId": 4,
    "cisSubControlId": 4.9,
    "assetType": "Users",
    "securityFunction": "Detect",
    "title": "Log and Alert on Unsuccessful Administrative Account Login",
    "description": "Configure systems to issue a log entry and alert on unsuccessful logins to an administrative account.",
    "mappings": {
      "NIST SP 800-53 Rev. 4": "DE.CM-7"
    },
    "subcategoryName": "Monitoring for unauthorized personnel, connections, devices, and software is performed"
  },
  {
    "cisControlId": "5",
    "cisSubControlId": 5.1,
    "assetType": "Applications",
    "securityFunction": "Protect",
    "title": "Establish Secure Configurations",
    "description": "Maintain documented, standard security configuration standards for all authorized operating systems and software.",
    "mappings": {
      "NIST SP 800-53 Rev. 4": "PR.IP-1"
    },
    "subcategoryName": "A baseline configuration of information technology/industrial control systems is created and maintained incorporating security principles (e.g. concept of least functionality)"
  },
  {
    "cisControlId": "5",
    "cisSubControlId": 5.2,
    "assetType": "Applications",
    "securityFunction": "Protect",
    "title": "Maintain Secure Images",
    "description": "Maintain secure images or templates for all systems in the enterprise based on the organization's approved configuration standards. Any new system deployment or existing system that becomes compromised should be imaged using one of those images or templates.",
    "mappings": {
      "NIST SP 800-53 Rev. 4": "PR.IP-1"
    },
    "subcategoryName": "A baseline configuration of information technology/industrial control systems is created and maintained incorporating security principles (e.g. concept of least functionality)"
  },
  {
    "cisControlId": "5",
    "cisSubControlId": 5.3,
    "assetType": "Applications",
    "securityFunction": "Protect",
    "title": "Securely Store Master Images",
    "description": "Store the master images and templates on securely configured servers, validated with integrity monitoring tools, to ensure that only authorized changes to the images are possible.",
    "mappings": {
      "NIST SP 800-53 Rev. 4": "PR.IP-1"
    },
    "subcategoryName": "A baseline configuration of information technology/industrial control systems is created and maintained incorporating security principles (e.g. concept of least functionality)"
  },
  {
    "cisControlId": "5",
    "cisSubControlId": 5.4,
    "assetType": "Applications",
    "securityFunction": "Protect",
    "title": "Deploy System Configuration Management Tools",
    "description": "Deploy system configuration management tools that will automatically enforce and redeploy configuration settings to systems at regularly scheduled intervals.",
    "mappings": {
      "NIST SP 800-53 Rev. 4": null
    },
    "subcategoryName": null
  },
  {
    "cisControlId": "5",
    "cisSubControlId": 5.5,
    "assetType": "Applications",
    "securityFunction": "Detect",
    "title": "Implement Automated Configuration Monitoring Systems",
    "description": "Utilize a Security Content Automation Protocol (SCAP) compliant configuration monitoring system to verify all security configuration elements, catalog approved exceptions, and alert when unauthorized changes occur.",
    "mappings": {
      "NIST SP 800-53 Rev. 4": "DE.CM-8"
    },
    "subcategoryName": "Vulnerability scans are performed"
  },
  {
    "cisControlId": "6",
    "cisSubControlId": 6.1,
    "assetType": "Network",
    "securityFunction": "Detect",
    "title": "Utilize Three Synchronized Time Sources",
    "description": "Use at least three synchronized time sources from which all servers and network devices retrieve time information on a regular basis so that timestamps in logs are consistent.",
    "mappings": {
      "NIST SP 800-53 Rev. 4": null
    },
    "subcategoryName": null
  },
  {
    "cisControlId": "6",
    "cisSubControlId": 6.2,
    "assetType": "Network",
    "securityFunction": "Detect",
    "title": "Activate audit logging",
    "description": "Ensure that local logging has been enabled on all systems and networking devices.",
    "mappings": {
      "NIST SP 800-53 Rev. 4": "DE.AE-3"
    },
    "subcategoryName": "Audit/log records are determined, documented, implemented, and reviewed in accordance with policy"
  },
  {
    "cisControlId": "6",
    "cisSubControlId": 6.3,
    "assetType": "Network",
    "securityFunction": "Detect",
    "title": "Enable Detailed Logging",
    "description": "Enable system logging to include detailed information such as a event source, date, user, timestamp, source addresses, destination addresses, and other useful elements.",
    "mappings": {
      "NIST SP 800-53 Rev. 4": "PR.PT-1"
    },
    "subcategoryName": "Audit/log records are determined, documented, implemented, and reviewed in accordance with policy"
  },
  {
    "cisControlId": "6",
    "cisSubControlId": 6.4,
    "assetType": "Network",
    "securityFunction": "Detect",
    "title": "Ensure adequate storage for logs",
    "description": "Ensure that all systems that store logs have adequate storage space for the logs generated.",
    "mappings": {
      "NIST SP 800-53 Rev. 4": "PR.DS-4"
    },
    "subcategoryName": "Adequate capacity to ensure availability is maintained"
  },
  {
    "cisControlId": "6",
    "cisSubControlId": 6.5,
    "assetType": "Network",
    "securityFunction": "Detect",
    "title": "Central Log Management",
    "description": "Ensure that appropriate logs are being aggregated to a central log management system for analysis and review.",
    "mappings": {
      "NIST SP 800-53 Rev. 4": "DE.AE-3"
    },
    "subcategoryName": "Audit/log records are determined, documented, implemented, and reviewed in accordance with policy"
  },
  {
    "cisControlId": "6",
    "cisSubControlId": 6.6,
    "assetType": "Network",
    "securityFunction": "Detect",
    "title": "Deploy SIEM or Log Analytic tool",
    "description": "Deploy Security Information and Event Management (SIEM) or log analytic tool for log correlation and analysis.",
    "mappings": {
      "NIST SP 800-53 Rev. 4": "DE.AE-3"
    },
    "subcategoryName": "Event data are collected and correlated from multiple sources and sensors"
  },
  {
    "cisControlId": "6",
    "cisSubControlId": 6.7,
    "assetType": "Network",
    "securityFunction": "Detect",
    "title": "Regularly Review Logs",
    "description": "On a regular basis, review logs to identify anomalies or abnormal events.",
    "mappings": {
      "NIST SP 800-53 Rev. 4": "DE.AE-2"
    },
    "subcategoryName": "Event data are collected and correlated from multiple sources and sensors"
  },
  {
    "cisControlId": "6",
    "cisSubControlId": 6.8,
    "assetType": "Network",
    "securityFunction": "Detect",
    "title": "Regularly Tune SIEM",
    "description": "On a regular basis, tune your SIEM system to better identify actionable events and decrease event noise.",
    "mappings": {
      "NIST SP 800-53 Rev. 4": "DE.AE-5"
    },
    "subcategoryName": "Incident alert thresholds are established"
  },
  {
    "cisControlId": "7",
    "cisSubControlId": 7.1,
    "assetType": "Applications",
    "securityFunction": "Protect",
    "title": "Ensure Use of Only Fully Supported Browsers and Email Clients",
    "description": "Ensure that only fully supported web browsers and email clients are allowed to execute in the organization, ideally only using the latest version of the browsers and email clients provided by the vendor.",
    "mappings": {
      "NIST SP 800-53 Rev. 4": "PR.IP-1"
    },
    "subcategoryName": "A baseline configuration of information technology/industrial control systems is created and maintained incorporating security principles (e.g. concept of least functionality)"
  },
  {
    "cisControlId": "7",
    "cisSubControlId": 7.2,
    "assetType": "Applications",
    "securityFunction": "Protect",
    "title": "Disable Unnecessary or Unauthorized Browser or Email Client Plugins",
    "description": "Uninstall or disable any unauthorized browser or email client plugins or add-on applications.",
    "mappings": {
      "NIST SP 800-53 Rev. 4": "PR.IP-1"
    },
    "subcategoryName": "A baseline configuration of information technology/industrial control systems is created and maintained incorporating security principles (e.g. concept of least functionality)"
  },
  {
    "cisControlId": "7",
    "cisSubControlId": 7.3,
    "assetType": "Applications",
    "securityFunction": "Protect",
    "title": "Limit Use of Scripting Languages in Web Browsers and Email Clients",
    "description": "Ensure that only authorized scripting languages are able to run in all web browsers and email clients.",
    "mappings": {
      "NIST SP 800-53 Rev. 4": "PR.IP-1"
    },
    "subcategoryName": "A baseline configuration of information technology/industrial control systems is created and maintained incorporating security principles (e.g. concept of least functionality)"
  },
  {
    "cisControlId": "7",
    "cisSubControlId": 7.4,
    "assetType": "Network",
    "securityFunction": "Protect",
    "title": "Maintain and Enforce Network-Based URL Filters",
    "description": "Enforce network-based URL filters that limit a system's ability to connect to websites not approved by the organization. This filtering shall be enforced for each of the organization's systems, whether they are physically at an organization's facilities or not.",
    "mappings": {
      "NIST SP 800-53 Rev. 4": "DE.CM-7"
    },
    "subcategoryName": "Monitoring for unauthorized personnel, connections, devices, and software is performed"
  },
  {
    "cisControlId": "7",
    "cisSubControlId": 7.5,
    "assetType": "Network",
    "securityFunction": "Protect",
    "title": "Subscribe to URL-Categorization Service",
    "description": "Subscribe to URL categorization services to ensure that they are up-to-date with the most recent website category definitions available. Uncategorized sites shall be blocked by default.",
    "mappings": {
      "NIST SP 800-53 Rev. 4": "DE.CM-7"
    },
    "subcategoryName": "Monitoring for unauthorized personnel, connections, devices, and software is performed"
  },
  {
    "cisControlId": "7",
    "cisSubControlId": 7.6,
    "assetType": "Network",
    "securityFunction": "Detect",
    "title": "Log all URL requester",
    "description": "Log all URL requests from each of the organization's systems, whether on-site or a mobile device, in order to identify potentially malicious activity and assist incident handlers with identifying potentially compromised systems.",
    "mappings": {
      "NIST SP 800-53 Rev. 4": "DE.AE-3"
    },
    "subcategoryName": "Event data are aggregated and correlated from multiple sources and sensors "
  },
  {
    "cisControlId": "7",
    "cisSubControlId": 7.7,
    "assetType": "Network",
    "securityFunction": "Protect",
    "title": "Use of DNS Filtering Services",
    "description": "Use DNS filtering services to help block access to known malicious domains.",
    "mappings": {
      "NIST SP 800-53 Rev. 4": "DE.CM-7"
    },
    "subcategoryName": "The network is monitored to detect potential cybersecurity events"
  },
  {
    "cisControlId": "7",
    "cisSubControlId": 7.8,
    "assetType": "Network",
    "securityFunction": "Protect",
    "title": "Implement DMARC and Enable Receiver-Side Verification",
    "description": "To lower the chance of spoofed or modified emails from valid domains, implement Domain-based Message Authentication, Reporting and Conformance (DMARC) policy and verification, starting by implementing the Sender Policy Framework (SPF) and the Domain Keys Identified Mail(DKIM) standards.",
    "mappings": {
      "NIST SP 800-53 Rev. 4": "PR.IP-1"
    },
    "subcategoryName": "A baseline configuration of information technology/industrial control systems is created and maintained incorporating security principles (e.g. concept of least functionality)"
  },
  {
    "cisControlId": "7",
    "cisSubControlId": 7.9,
    "assetType": "Network",
    "securityFunction": "Protect",
    "title": "Block Unnecessary File Types",
    "description": "Block all e-mail attachments entering the organization's email gateway if the file types are unnecessary for the organization's business.",
    "mappings": {
      "NIST SP 800-53 Rev. 4": "DE.CM-7"
    },
    "subcategoryName": "Monitoring for unauthorized personnel, connections, devices, and software is performed"
  },
  {
    "cisControlId": "7",
    "cisSubControlId": "7.10",
    "assetType": "Network",
    "securityFunction": "Protect",
    "title": "Sandbox All Email Attachments",
    "description": "Use sandboxing to analyze and block inbound email attachments with malicious behavior.",
    "mappings": {
      "NIST SP 800-53 Rev. 4": "DE.CM-4"
    },
    "subcategoryName": "Malicious code is detected"
  },
  {
    "cisControlId": "8",
    "cisSubControlId": 8.1,
    "assetType": "Devices",
    "securityFunction": "Protect",
    "title": "Utilize Centrally Managed Anti-malware Software",
    "description": "Utilize centrally managed anti-malware software to continuously monitor and defend each of the organization's workstations and servers.",
    "mappings": {
      "NIST SP 800-53 Rev. 4": "DE.CM-4"
    },
    "subcategoryName": "Malicious code is detected"
  },
  {
    "cisControlId": "8",
    "cisSubControlId": 8.2,
    "assetType": "Devices",
    "securityFunction": "Protect",
    "title": "Ensure Anti-Malware Software and Signatures are Updated",
    "description": "Ensure that the organization's anti-malware software updates its scanning engine and signature database on a regular basis.",
    "mappings": {
      "NIST SP 800-53 Rev. 4": "DE.CM-4"
    },
    "subcategoryName": "Malicious code is detected"
  },
  {
    "cisControlId": "8",
    "cisSubControlId": 8.3,
    "assetType": "Devices",
    "securityFunction": "Protect",
    "title": "Enable Operating System Anti-Exploitation Features/ Deploy Anti-Exploit Technologies",
    "description": "Enable anti-exploitation features such as Data Execution Prevention (DEP) or Address Space Layout Randomization (ASLR) that are available in an operating system or deploy appropriate toolkits that can be configured to apply protection to a broader set of applications and executables.",
    "mappings": {
      "NIST SP 800-53 Rev. 4": "PR.IP-1"
    },
    "subcategoryName": "A baseline configuration of information technology/industrial control systems is created and maintained incorporating security principles (e.g. concept of least functionality)"
  },
  {
    "cisControlId": "8",
    "cisSubControlId": 8.4,
    "assetType": "Devices",
    "securityFunction": "Detect",
    "title": "Configure Anti-Malware Scanning of Removable Devices",
    "description": "Configure devices so that they automatically conduct an anti-malware scan of removable media when inserted or connected.",
    "mappings": {
      "NIST SP 800-53 Rev. 4": "DE.CM-4"
    },
    "subcategoryName": "Malicious code is detected"
  },
  {
    "cisControlId": "8",
    "cisSubControlId": 8.5,
    "assetType": "Devices",
    "securityFunction": "Protect",
    "title": "Configure Devices Not To Auto-Run Content",
    "description": "Configure devices to not auto-run content from removable media.",
    "mappings": {
      "NIST SP 800-53 Rev. 4": "PR.PT-2"
    },
    "subcategoryName": "Removable media is protected and its use restricted according to policy"
  },
  {
    "cisControlId": "8",
    "cisSubControlId": 8.6,
    "assetType": "Devices",
    "securityFunction": "Detect",
    "title": "Centralize Anti-Malware Logging",
    "description": "Send all malware detection events to enterprise anti-malware administration tools and event log servers for analysis and alerting.",
    "mappings": {
      "NIST SP 800-53 Rev. 4": "DE.AE-3"
    },
    "subcategoryName": "Event data are collected and correlated from multiple sources and sensors"
  },
  {
    "cisControlId": "8",
    "cisSubControlId": 8.7,
    "assetType": "Network",
    "securityFunction": "Detect",
    "title": "Enable DNS Query Logging",
    "description": "Enable Domain Name System (DNS) query logging to detect hostname lookups for known malicious domains.",
    "mappings": {
      "NIST SP 800-53 Rev. 4": "DE.CM-1"
    },
    "subcategoryName": "Event data are collected and correlated from multiple sources and sensors"
  },
  {
    "cisControlId": "8",
    "cisSubControlId": 8.8,
    "assetType": "Devices",
    "securityFunction": "Detect",
    "title": "Enable Command-Line Audit Logging",
    "description": "Enable command-line audit logging for command shells, such as Microsoft PowerShell and Bash.",
    "mappings": {
      "NIST SP 800-53 Rev. 4": "DE.AE-3"
    },
    "subcategoryName": "Event data are collected and correlated from multiple sources and sensors"
  },
  {
    "cisControlId": "9",
    "cisSubControlId": 9.1,
    "assetType": "Devices",
    "securityFunction": "Identify",
    "title": "Associate Active Ports, Services and Protocols to Asset Inventory",
    "description": "Associate active ports, services and protocols to the hardware assets in the asset inventory.",
    "mappings": {
      "NIST SP 800-53 Rev. 4": null
    },
    "subcategoryName": null
  },
  {
    "cisControlId": "9",
    "cisSubControlId": 9.2,
    "assetType": "Devices",
    "securityFunction": "Protect",
    "title": "Ensure Only Approved Ports, Protocols and Services Are Running",
    "description": "Ensure that only network ports, protocols, and services listening on a system with validated business needs are running on each system.",
    "mappings": {
      "NIST SP 800-53 Rev. 4": "PR.IP-1"
    },
    "subcategoryName": "A baseline configuration of information technology/industrial control systems is created and maintained incorporating security principles (e.g. concept of least functionality)"
  },
  {
    "cisControlId": "9",
    "cisSubControlId": 9.3,
    "assetType": "Devices",
    "securityFunction": "Detect",
    "title": "Perform Regular Automated Port Scans",
    "description": "Perform automated port scans on a regular basis against all systems and alert if unauthorized ports are detected on a system.",
    "mappings": {
      "NIST SP 800-53 Rev. 4": "DE.CM-8"
    },
    "subcategoryName": "Vulnerability scans are performed"
  },
  {
    "cisControlId": "9",
    "cisSubControlId": 9.4,
    "assetType": "Devices",
    "securityFunction": "Protect",
    "title": "Apply Host-Based Firewalls or Port Filtering",
    "description": "Apply host-based firewalls or port filtering tools on end systems, with a default-deny rule that drops all traffic except those services and ports that are explicitly allowed.",
    "mappings": {
      "NIST SP 800-53 Rev. 4": "PR.IP-1"
    },
    "subcategoryName": "A baseline configuration of information technology/industrial control systems is created and maintained incorporating security principles (e.g. concept of least functionality)"
  },
  {
    "cisControlId": "9",
    "cisSubControlId": 9.5,
    "assetType": "Devices",
    "securityFunction": "Protect",
    "title": "Implement Application Firewalls",
    "description": "Place application firewalls in front of any critical servers to verify and validate the traffic going to the server. Any unauthorized traffic should be blocked and logged.",
    "mappings": {
      "NIST SP 800-53 Rev. 4": "PR.IP-1"
    },
    "subcategoryName": "A baseline configuration of information technology/industrial control systems is created and maintained incorporating security principles (e.g. concept of least functionality)\nsystems to provide only essential capabilities"
  },
  {
    "cisControlId": "10",
    "cisSubControlId": 10.1,
    "assetType": "Data",
    "securityFunction": "Protect",
    "title": "Ensure Regular Automated BackUps",
    "description": "Ensure that all system data is automatically backed up on a regular basis.",
    "mappings": {
      "NIST SP 800-53 Rev. 4": "PR.IP-4"
    },
    "subcategoryName": "Backups of information are conducted, maintained, and tested "
  },
  {
    "cisControlId": "10",
    "cisSubControlId": 10.2,
    "assetType": "Data",
    "securityFunction": "Protect",
    "title": "Perform Complete System Backups",
    "description": "Ensure that all of the organization's key systems are backed up as a complete system, through processes such as imaging, to enable the quick recovery of an entire system.",
    "mappings": {
      "NIST SP 800-53 Rev. 4": "PR.IP-4"
    },
    "subcategoryName": "Backups of information are conducted, maintained, and tested "
  },
  {
    "cisControlId": "10",
    "cisSubControlId": 10.3,
    "assetType": "Data",
    "securityFunction": "Protect",
    "title": "Test Data on Backup Media",
    "description": "Test data integrity on backup media on a regular basis by performing a data restoration process to ensure that the backup is properly working.",
    "mappings": {
      "NIST SP 800-53 Rev. 4": "PR.IP-4"
    },
    "subcategoryName": "Integrity checking mechanisms are used to verify software, firmware, and information integrity"
  },
  {
    "cisControlId": "10",
    "cisSubControlId": 10.4,
    "assetType": "Data",
    "securityFunction": "Protect",
    "title": "Ensure Protection of Backups",
    "description": "Ensure that backups are properly protected via physical security or encryption when they are stored, as well as when they are moved across the network. This includes remote backups and cloud services.",
    "mappings": {
      "NIST SP 800-53 Rev. 4": "PR.DS-1"
    },
    "subcategoryName": "Data-at-rest is protected"
  },
  {
    "cisControlId": "10",
    "cisSubControlId": 10.5,
    "assetType": "Data",
    "securityFunction": "Protect",
    "title": "Ensure Backups Have At least One Non-Continuously Addressable Destination",
    "description": "Ensure that all backups have at least one backup destination that is not continuously addressable through operating system calls.",
    "mappings": {
      "NIST SP 800-53 Rev. 4": "PR.PT-5"
    },
    "subcategoryName": "Data-at-rest is protected"
  },
  {
    "cisControlId": "11",
    "cisSubControlId": 11.1,
    "assetType": "Network",
    "securityFunction": "Identify",
    "title": "Maintain Standard Security Configurations for Network Devices",
    "description": "Maintain standard, documented security configuration standards for all authorized network devices.",
    "mappings": {
      "NIST SP 800-53 Rev. 4": "PR.IP-1"
    },
    "subcategoryName": "A baseline configuration of information technology/industrial control systems is created and maintained incorporating security principles (e.g. concept of least functionality)"
  },
  {
    "cisControlId": "11",
    "cisSubControlId": 11.2,
    "assetType": "Network",
    "securityFunction": "Identify",
    "title": "Document Traffic Configuration Rules",
    "description": "All configuration rules that allow traffic to flow through network devices should be documented in a configuration management system with a specific business reason for each rule, a specific individual’s name responsible for that business need, and an expected duration of the need.",
    "mappings": {
      "NIST SP 800-53 Rev. 4": "ID.AM-3"
    },
    "subcategoryName": "Organizational communication and data flows are mapped"
  },
  {
    "cisControlId": "11",
    "cisSubControlId": 11.3,
    "assetType": "Network",
    "securityFunction": "Detect",
    "title": "Use Automated Tools to Verify Standard Device Configurations and Detect Changes",
    "description": "Compare all network device configuration against approved security configurations defined for each network device in use and alert when any deviations are discovered.",
    "mappings": {
      "NIST SP 800-53 Rev. 4": "DE.CM-8"
    },
    "subcategoryName": "Configuration change control processes are in place"
  },
  {
    "cisControlId": "11",
    "cisSubControlId": 11.4,
    "assetType": "Network",
    "securityFunction": "Protect",
    "title": "Install the Latest Stable Version of Any Security-Related Updates on All Network Devices",
    "description": "Install the latest stable version of any security-related updates on all network devices.",
    "mappings": {
      "NIST SP 800-53 Rev. 4": "PR.IP-1"
    },
    "subcategoryName": "A baseline configuration of information technology/industrial control systems is created and maintained incorporating security principles (e.g. concept of least functionality)"
  },
  {
    "cisControlId": "11",
    "cisSubControlId": 11.5,
    "assetType": "Network",
    "securityFunction": "Protect",
    "title": "Manage Network Devices Using Multi-Factor Authentication and Encrypted Sessions",
    "description": "Manage all network devices using multi-factor authentication and encrypted sessions.",
    "mappings": {
      "NIST SP 800-53 Rev. 4": "PR.AC-7"
    },
    "subcategoryName": "Users, devices, and other assets are authenticated (e.g., single-factor, multifactor)\ncommensurate with the risk of the risks) transaction (e.g., individuals’ security and privacy risks and other organizational"
  },
  {
    "cisControlId": "11",
    "cisSubControlId": 11.6,
    "assetType": "Network",
    "securityFunction": "Protect",
    "title": "Use Dedicated Machines For All Network Administrative Tasks",
    "description": "Ensure network engineers use a dedicated machine for all administrative tasks or tasks requiring elevated access. This machine shall be segmented from the organization's primary network and not be allowed Internet access. This machine shall not be used for reading e-mail, composing documents, or surfing the Internet.",
    "mappings": {
      "NIST SP 800-53 Rev. 4": "PR.AC-5\n"
    },
    "subcategoryName": "Network integrity is protected (e.g., network segregation, network segmentation)"
  },
  {
    "cisControlId": "11",
    "cisSubControlId": 11.7,
    "assetType": "Network",
    "securityFunction": "Protect",
    "title": "Manage Network Infrastructure Through a Dedicated Network",
    "description": "Manage the network infrastructure across network connections that are separated from the business use of that network, relying on separate VLANs or, preferably, on entirely different physical connectivity for management sessions for network devices.",
    "mappings": {
      "NIST SP 800-53 Rev. 4": "PR.AC-5"
    },
    "subcategoryName": "Network integrity is protected (e.g., network segregation, network segmentation)"
  },
  {
    "cisControlId": "12",
    "cisSubControlId": 12.1,
    "assetType": "Network",
    "securityFunction": "Identify",
    "title": "Maintain an Inventory of Network Boundaries",
    "description": "Maintain an up-to-date inventory of all of the organization's network boundaries.",
    "mappings": {
      "NIST SP 800-53 Rev. 4": "ID.AM-4"
    },
    "subcategoryName": "External information systems are catalogued"
  },
  {
    "cisControlId": "12",
    "cisSubControlId": 12.2,
    "assetType": "Network",
    "securityFunction": "Detect",
    "title": "Scan for Unauthorized Connections across Trusted Network Boundaries",
    "description": "Perform regular scans from outside each trusted network boundary to detect any unauthorized connections which are accessible across the boundary.",
    "mappings": {
      "NIST SP 800-53 Rev. 4": "DE.CM-7"
    },
    "subcategoryName": "External information systems are catalogued"
  },
  {
    "cisControlId": "12",
    "cisSubControlId": 12.3,
    "assetType": "Network",
    "securityFunction": "Protect",
    "title": "Deny Communications with Known Malicious IP Addresses",
    "description": "Deny communications with known malicious or unused Internet IP addresses and limit access only to trusted and necessary IP address ranges at each of the organization's network boundaries,.",
    "mappings": {
      "NIST SP 800-53 Rev. 4": "PR.IP-1"
    },
    "subcategoryName": "A baseline configuration of information technology/industrial control systems is created and maintained incorporating security principles (e.g. concept of least functionality)"
  },
  {
    "cisControlId": "12",
    "cisSubControlId": 12.4,
    "assetType": "Network",
    "securityFunction": "Protect",
    "title": "Deny Communication over Unauthorized Ports",
    "description": "Deny communication over unauthorized TCP or UDP ports or application traffic to ensure that only authorized protocols are allowed to cross the network boundary in or out of the network at each of the organization's network boundaries.",
    "mappings": {
      "NIST SP 800-53 Rev. 4": "PR.IP-1"
    },
    "subcategoryName": "A baseline configuration of information technology/industrial control systems is created and maintained incorporating security principles (e.g. concept of least functionality)"
  },
  {
    "cisControlId": "12",
    "cisSubControlId": 12.5,
    "assetType": "Network",
    "securityFunction": "Detect",
    "title": "Configure Monitoring Systems to Record Network Packets",
    "description": "Configure monitoring systems to record network packets passing through the boundary at each of the organization's network boundaries.",
    "mappings": {
      "NIST SP 800-53 Rev. 4": "DE.CM-1"
    },
    "subcategoryName": "The network is monitored to detect potential cybersecurity events"
  },
  {
    "cisControlId": "12",
    "cisSubControlId": 12.6,
    "assetType": "Network",
    "securityFunction": "Detect",
    "title": "Deploy Network-Based IDS Sensors",
    "description": "Deploy network-based Intrusion Detection Systems (IDS) sensors to look for unusual attack mechanisms and detect compromise of these systems at each of the organization's network boundaries.",
    "mappings": {
      "NIST SP 800-53 Rev. 4": "DE.CM-1"
    },
    "subcategoryName": "The network is monitored to detect potential cybersecurity events"
  },
  {
    "cisControlId": "12",
    "cisSubControlId": 12.7,
    "assetType": "Network",
    "securityFunction": "Protect",
    "title": "Deploy Network-Based Intrusion Prevention Systems",
    "description": "Deploy network-based Intrusion Prevention Systems (IPS) to block malicious network traffic at each of the organization's network boundaries.",
    "mappings": {
      "NIST SP 800-53 Rev. 4": "DE.CM-1"
    },
    "subcategoryName": "The network is monitored to detect potential cybersecurity events"
  },
  {
    "cisControlId": "12",
    "cisSubControlId": 12.8,
    "assetType": "Network",
    "securityFunction": "Detect",
    "title": "Deploy NetFlow Collection on Networking Boundary Devices",
    "description": "Enable the collection of NetFlow and logging data on all network boundary devices.",
    "mappings": {
      "NIST SP 800-53 Rev. 4": "DE.CM-1"
    },
    "subcategoryName": "The network is monitored to detect potential cybersecurity events"
  },
  {
    "cisControlId": "12",
    "cisSubControlId": 12.9,
    "assetType": "Network",
    "securityFunction": "Detect",
    "title": "Deploy Application Layer Filtering Proxy Server",
    "description": "Ensure that all network traffic to or from the Internet passes through an authenticated application layer proxy that is configured to filter unauthorized connections.",
    "mappings": {
      "NIST SP 800-53 Rev. 4": "DE.CM-7"
    },
    "subcategoryName": "The network is monitored to detect potential cybersecurity events"
  },
  {
    "cisControlId": "12",
    "cisSubControlId": "12.10",
    "assetType": "Network",
    "securityFunction": "Detect",
    "title": "Decrypt Network Traffic at Proxy",
    "description": "Decrypt all encrypted network traffic at the boundary proxy prior to analyzing the content. However, the organization may use whitelists of allowed sites that can be accessed through the proxy without decrypting the traffic.",
    "mappings": {
      "NIST SP 800-53 Rev. 4": "DE.CM-7"
    },
    "subcategoryName": "The network is monitored to detect potential cybersecurity events"
  },
  {
    "cisControlId": "12",
    "cisSubControlId": 12.11,
    "assetType": "Users",
    "securityFunction": "Protect",
    "title": "Require All Remote Login to Use Multi-Factor Authentication",
    "description": "Require all remote login access to the organization's network to encrypt data in transit and use multi-factor authentication.",
    "mappings": {
      "NIST SP 800-53 Rev. 4": "PR.AC-3"
    },
    "subcategoryName": "Remote access is managed"
  },
  {
    "cisControlId": "12",
    "cisSubControlId": 12.12,
    "assetType": "Devices",
    "securityFunction": "Protect",
    "title": "Manage All Devices Remotely Logging into Internal Network",
    "description": "Scan all enterprise devices remotely logging into the organization's network prior to accessing the network to ensure that each of the organization's security policies has been enforced in the same manner as local network devices.",
    "mappings": {
      "NIST SP 800-53 Rev. 4": "PR.AC-3"
    },
    "subcategoryName": "Remote maintenance of organizational assets is approved, logged, and performed in a manner that prevents unauthorized access"
  },
  {
    "cisControlId": "13",
    "cisSubControlId": 13.1,
    "assetType": "Data",
    "securityFunction": "Identify",
    "title": "Maintain an Inventory of Sensitive Information",
    "description": "Maintain an inventory of all sensitive information stored, processed, or transmitted by the organization's technology systems, including those located on-site or at a remote service provider.",
    "mappings": {
      "NIST SP 800-53 Rev. 4": "ID.AM-5"
    },
    "subcategoryName": "Resources (e.g., hardware, devices, data, time, personnel, and software) are prioritized based on their classification, criticality, and business value "
  },
  {
    "cisControlId": "13",
    "cisSubControlId": 13.2,
    "assetType": "Data",
    "securityFunction": "Protect",
    "title": "Remove Sensitive Data or Systems Not Regularly Accessed by Organization",
    "description": "Remove sensitive data or systems not regularly accessed by the organization from the network. These systems shall only be used as stand alone systems (disconnected from the network) by the business unit needing to occasionally use the system or completely virtualized and powered off until needed.",
    "mappings": {
      "NIST SP 800-53 Rev. 4": "PR.DS-3"
    },
    "subcategoryName": "Assets are formally managed throughout removal, transfers, and disposition"
  },
  {
    "cisControlId": "13",
    "cisSubControlId": 13.3,
    "assetType": "Data",
    "securityFunction": "Detect",
    "title": "Monitor and Block Unauthorized Network Traffic",
    "description": "Deploy an automated tool on network perimeters that monitors for unauthorized transfer of sensitive information and blocks such transfers while alerting information security professionals.",
    "mappings": {
      "NIST SP 800-53 Rev. 4": "PR.DS-5"
    },
    "subcategoryName": "Protections against data leaks are implemented"
  },
  {
    "cisControlId": "13",
    "cisSubControlId": 13.4,
    "assetType": "Data",
    "securityFunction": "Protect",
    "title": "Only Allow Access to Authorized Cloud Storage or Email Providers",
    "description": "Only allow access to authorized cloud storage or email providers.",
    "mappings": {
      "NIST SP 800-53 Rev. 4": "PR.DS-5"
    },
    "subcategoryName": "Protections against data leaks are implemented"
  },
  {
    "cisControlId": "13",
    "cisSubControlId": 13.5,
    "assetType": "Data",
    "securityFunction": "Detect",
    "title": "Monitor and Detect Any Unauthorized Use of Encryption",
    "description": "Monitor all traffic leaving the organization and detect any unauthorized use of encryption.",
    "mappings": {
      "NIST SP 800-53 Rev. 4": "DE.CM-7\n"
    },
    "subcategoryName": "Monitoring for unauthorized personnel, connections, devices, and software is performed"
  },
  {
    "cisControlId": "13",
    "cisSubControlId": 13.6,
    "assetType": "Data",
    "securityFunction": "Protect",
    "title": "Encrypt the Hard Drive of All Mobile Devices.",
    "description": "Utilize approved whole disk encryption software to encrypt the hard drive of all mobile devices.",
    "mappings": {
      "NIST SP 800-53 Rev. 4": "PR.DS-1"
    },
    "subcategoryName": "Data-at-rest is protected"
  },
  {
    "cisControlId": "13",
    "cisSubControlId": 13.7,
    "assetType": "Data",
    "securityFunction": "Protect",
    "title": "Manage USB Devices",
    "description": "If USB storage devices are required, enterprise software should be used that can configure systems to allow the use of specific devices. An inventory of such devices should be maintained.",
    "mappings": {
      "NIST SP 800-53 Rev. 4": "PR.PT-2"
    },
    "subcategoryName": "Removable media is protected and its use restricted according to policy"
  },
  {
    "cisControlId": "13",
    "cisSubControlId": 13.8,
    "assetType": "Data",
    "securityFunction": "Protect",
    "title": "Manage System's External Removable Media's Read/Write Configurations",
    "description": "Configure systems not to write data to external removable media, if there is no business need for supporting such devices.",
    "mappings": {
      "NIST SP 800-53 Rev. 4": "PR.PT-2"
    },
    "subcategoryName": "Removable media is protected and its use restricted according to policy"
  },
  {
    "cisControlId": "13",
    "cisSubControlId": 13.9,
    "assetType": "Data",
    "securityFunction": "Protect",
    "title": "Encrypt Data on USB Storage Devices",
    "description": "If USB storage devices are required, all data stored on such devices must be encrypted while at rest.",
    "mappings": {
      "NIST SP 800-53 Rev. 4": "PR.PT-2"
    },
    "subcategoryName": "Removable media is protected and its use restricted according to policy"
  },
  {
    "cisControlId": "14",
    "cisSubControlId": 14.1,
    "assetType": "Network",
    "securityFunction": "Protect",
    "title": "Segment the Network Based on Sensitivity",
    "description": "Segment the network based on the label or classification level of the information stored on the servers, locate all sensitive information on separated Virtual Local Area Networks (VLANs).",
    "mappings": {
      "NIST SP 800-53 Rev. 4": "PR.AC-5"
    },
    "subcategoryName": "Network integrity is protected (e.g., network segregation, network segmentation)"
  },
  {
    "cisControlId": "14",
    "cisSubControlId": 14.2,
    "assetType": "Network",
    "securityFunction": "Protect",
    "title": "Enable Firewall Filtering Between VLANs",
    "description": "Enable firewall filtering between VLANs to ensure that only authorized systems are able to communicate with other systems necessary to fulfill their specific responsibilities.",
    "mappings": {
      "NIST SP 800-53 Rev. 4": "PR.AC-5"
    },
    "subcategoryName": "Network integrity is protected (e.g., network segregation, network segmentation)"
  },
  {
    "cisControlId": "14",
    "cisSubControlId": 14.3,
    "assetType": "Network",
    "securityFunction": "Protect",
    "title": "Disable Workstation to Workstation Communication",
    "description": "Disable all workstation to workstation communication to limit an attacker's ability to move laterally and compromise neighboring systems, through technologies such as Private VLANs or micro segmentation.",
    "mappings": {
      "NIST SP 800-53 Rev. 4": "PR.AC-5"
    },
    "subcategoryName": "Network integrity is protected (e.g., network segregation, network segmentation)"
  },
  {
    "cisControlId": "14",
    "cisSubControlId": 14.4,
    "assetType": "Data",
    "securityFunction": "Protect",
    "title": "Encrypt All Sensitive Information in Transit",
    "description": "Encrypt all sensitive information in transit.",
    "mappings": {
      "NIST SP 800-53 Rev. 4": "PR.DS-2"
    },
    "subcategoryName": "Data-in-transit is protected"
  },
  {
    "cisControlId": "14",
    "cisSubControlId": 14.5,
    "assetType": "Data",
    "securityFunction": "Detect",
    "title": "Utilize an Active Discovery Tool to Identify Sensitive Data",
    "description": "Utilize an active discovery tool to identify all sensitive information stored, processed, or transmitted by the organization's technology systems, including those located on-site or at a remote service provider, and update the organization's sensitive information inventory.",
    "mappings": {
      "NIST SP 800-53 Rev. 4": null
    },
    "subcategoryName": null
  },
  {
    "cisControlId": "14",
    "cisSubControlId": 14.6,
    "assetType": "Data",
    "securityFunction": "Protect",
    "title": "Protect Information through Access Control Lists",
    "description": "Protect all information stored on systems with file system, network share, claims, application, or database specific access control lists. These controls will enforce the principle that only authorized individuals should have access to the information based on their need to access the information as a part of their responsibilities.",
    "mappings": {
      "NIST SP 800-53 Rev. 4": "PR.AC-4"
    },
    "subcategoryName": "Access permissions and authorizations are managed, incorporating the principles of least privilege and separation of duties"
  },
  {
    "cisControlId": "14",
    "cisSubControlId": 14.7,
    "assetType": "Data",
    "securityFunction": "Protect",
    "title": "Enforce Access Control to Data through Automated Tools",
    "description": "Use an automated tool, such as host-based Data Loss Prevention, to enforce access controls to data even when data is copied off a system.",
    "mappings": {
      "NIST SP 800-53 Rev. 4": "PR.DS-5"
    },
    "subcategoryName": "Protections against data leaks are implemented"
  },
  {
    "cisControlId": "14",
    "cisSubControlId": 14.8,
    "assetType": "Data",
    "securityFunction": "Protect",
    "title": "Encrypt Sensitive Information at Rest",
    "description": "Encrypt all sensitive information at rest using a tool that requires a secondary authentication mechanism not integrated into the operating system, in order to access the information.",
    "mappings": {
      "NIST SP 800-53 Rev. 4": "PR.DS-1"
    },
    "subcategoryName": "Data-at-rest is protected"
  },
  {
    "cisControlId": 14,
    "cisSubControlId": 14.9,
    "assetType": "Data",
    "securityFunction": "Detect",
    "title": "Enforce Detail Logging for Access or Changes to Sensitive Data",
    "description": "Enforce detailed audit logging for access to sensitive data or changes to sensitive data (utilizing tools such as File Integrity Monitoring or Security Information and Event Monitoring).",
    "mappings": {
      "NIST SP 800-53 Rev. 4": "PR.DS-6"
    },
    "subcategoryName": "Integrity checking mechanisms are used to verify software, firmware, and information integrity"
  },
  {
    "cisControlId": "15",
    "cisSubControlId": 15.1,
    "assetType": "Network",
    "securityFunction": "Identify",
    "title": "Maintain an Inventory of Authorized Wireless Access Points",
    "description": "Maintain an inventory of authorized wireless access points connected to the wired network.",
    "mappings": {
      "NIST SP 800-53 Rev. 4": "DE.AE-1"
    },
    "subcategoryName": "Organizational communication and data flows are mapped"
  },
  {
    "cisControlId": "15",
    "cisSubControlId": 15.2,
    "assetType": "Network",
    "securityFunction": "Detect",
    "title": "Detect Wireless Access Points Connected to the Wired Network",
    "description": "Configure network vulnerability scanning tools to detect and alert on unauthorized wireless access points connected to the wired network.",
    "mappings": {
      "NIST SP 800-53 Rev. 4": "DE.CM-7"
    },
    "subcategoryName": "Monitoring for unauthorized personnel, connections, devices, and software is performed"
  },
  {
    "cisControlId": "15",
    "cisSubControlId": 15.3,
    "assetType": "Network",
    "securityFunction": "Detect",
    "title": "Use a Wireless Intrusion Detection System",
    "description": "Use a wireless intrusion detection system (WIDS) to detect and alert on unauthorized wireless access points connected to the network.",
    "mappings": {
      "NIST SP 800-53 Rev. 4": "DE.CM-1"
    },
    "subcategoryName": "The network is monitored to detect potential cybersecurity events"
  },
  {
    "cisControlId": "15",
    "cisSubControlId": 15.4,
    "assetType": "Devices",
    "securityFunction": "Protect",
    "title": "Disable Wireless Access on Devices if Not Required",
    "description": "Disable wireless access on devices that do not have a business purpose for wireless access.",
    "mappings": {
      "NIST SP 800-53 Rev. 4": "PR.IP-1"
    },
    "subcategoryName": "A baseline configuration of information technology/industrial control systems is created and maintained incorporating security principles (e.g. concept of least functionality)"
  },
  {
    "cisControlId": "15",
    "cisSubControlId": 15.5,
    "assetType": "Devices",
    "securityFunction": "Protect",
    "title": "Limit Wireless Access on Client Devices",
    "description": "Configure wireless access on client machines that do have an essential wireless business purpose, to allow access only to authorized wireless networks and to restrict access to other wireless networks.",
    "mappings": {
      "NIST SP 800-53 Rev. 4": "PR.IP-1"
    },
    "subcategoryName": "A baseline configuration of information technology/industrial control systems is created and maintained incorporating security principles (e.g. concept of least functionality)"
  },
  {
    "cisControlId": "15",
    "cisSubControlId": 15.6,
    "assetType": "Devices",
    "securityFunction": "Protect",
    "title": "Disable Peer-to-Peer Wireless Network Capabilities on Wireless Clients",
    "description": "Disable peer-to-peer (ad hoc) wireless network capabilities on wireless clients.",
    "mappings": {
      "NIST SP 800-53 Rev. 4": "PR.IP-1"
    },
    "subcategoryName": "A baseline configuration of information technology/industrial control systems is created and maintained incorporating security principles (e.g. concept of least functionality)"
  },
  {
    "cisControlId": "15",
    "cisSubControlId": 15.7,
    "assetType": "Network",
    "securityFunction": "Protect",
    "title": "Leverage the Advanced Encryption Standard (AES) to Encrypt Wireless Data",
    "description": "Leverage the Advanced Encryption Standard (AES) to encrypt wireless data in transit.",
    "mappings": {
      "NIST SP 800-53 Rev. 4": "PR.DS-2"
    },
    "subcategoryName": "Data-in-transit is protected"
  },
  {
    "cisControlId": "15",
    "cisSubControlId": 15.8,
    "assetType": "Network",
    "securityFunction": "Protect",
    "title": "Use Wireless Authentication Protocols that Require Mutual, Multi-Factor Authentication",
    "description": "Ensure that wireless networks use authentication protocols such as Extensible Authentication Protocol-Transport Layer Security (EAP/TLS), which requires mutual, multi-factor authentication.",
    "mappings": {
      "NIST SP 800-53 Rev. 4": "PR.AC-7"
    },
    "subcategoryName": "Users, devices, and other assets are authenticated (e.g., single-factor, multifactor)\ncommensurate with the risk of the transaction (e.g., individuals’ security and\nprivacy risks and other organizational risks)"
  },
  {
    "cisControlId": "15",
    "cisSubControlId": 15.9,
    "assetType": "Devices",
    "securityFunction": "Protect",
    "title": "Disable Wireless Peripheral Access of Devices",
    "description": "Disable wireless peripheral access of devices (such as Bluetooth and NFC), unless such access is required for a business purpose.",
    "mappings": {
      "NIST SP 800-53 Rev. 4": "PR.IP-1"
    },
    "subcategoryName": "A baseline configuration of information technology/industrial control systems is created and maintained incorporating security principles (e.g. concept of least functionality)"
  },
  {
    "cisControlId": "15",
    "cisSubControlId": "15.10",
    "assetType": "Network",
    "securityFunction": "Protect",
    "title": "Create Separate Wireless Network for Personal and Untrusted Devices",
    "description": "Create a separate wireless network for personal or untrusted devices. Enterprise access from this network should be treated as untrusted and filtered and audited accordingly.",
    "mappings": {
      "NIST SP 800-53 Rev. 4": "PR.AC-5"
    },
    "subcategoryName": "Network integrity is protected (e.g., network segregation, network segmentation)"
  },
  {
    "cisControlId": "16",
    "cisSubControlId": 16.1,
    "assetType": "Users",
    "securityFunction": "Identify",
    "title": "Maintain an Inventory of Authentication Systems",
    "description": "Maintain an inventory of each of the organization's authentication systems, including those located on-site or at a remote service provider.",
    "mappings": {
      "NIST SP 800-53 Rev. 4": "PR.AC-1"
    },
    "subcategoryName": "Identities and credentials are issued, managed, verified, revoked, and\naudited for authorized devices, users and processes"
  },
  {
    "cisControlId": "16",
    "cisSubControlId": 16.2,
    "assetType": "Users",
    "securityFunction": "Protect",
    "title": "Configure Centralized Point of Authentication",
    "description": "Configure access for all accounts through as few centralized points of authentication as possible, including network, security, and cloud systems.",
    "mappings": {
      "NIST SP 800-53 Rev. 4": null
    },
    "subcategoryName": null
  },
  {
    "cisControlId": "16",
    "cisSubControlId": 16.3,
    "assetType": "Users",
    "securityFunction": "Protect",
    "title": "Require Multi-Factor Authentication",
    "description": "Require multi-factor authentication for all user accounts, on all systems, whether managed on-site or by a third-party provider.",
    "mappings": {
      "NIST SP 800-53 Rev. 4": "PR.AC-7"
    },
    "subcategoryName": "Users, devices, and other assets are authenticated (e.g., single-factor, multi-factor) commensurate with the risk of the transaction (e.g., individuals’ security and privacy risks and other organizational risks)"
  },
  {
    "cisControlId": "16",
    "cisSubControlId": 16.4,
    "assetType": "Users",
    "securityFunction": "Protect",
    "title": "Encrypt or Hash all Authentication Credentials",
    "description": "Encrypt or hash with a salt all authentication credentials when stored.",
    "mappings": {
      "NIST SP 800-53 Rev. 4": "PR.AC-1"
    },
    "subcategoryName": "Identities and credentials are issued, managed, verified, revoked, and audited for authorized devices, users and processes"
  },
  {
    "cisControlId": "16",
    "cisSubControlId": 16.5,
    "assetType": "Users",
    "securityFunction": "Protect",
    "title": "Encrypt Transmittal of Username and Authentication Credentials",
    "description": "Ensure that all account usernames and authentication credentials are transmitted across networks using encrypted channels.",
    "mappings": {
      "NIST SP 800-53 Rev. 4": "PR.DS-2"
    },
    "subcategoryName": "Data-in-transit is protected "
  },
  {
    "cisControlId": "16",
    "cisSubControlId": 16.6,
    "assetType": "Users",
    "securityFunction": "Identify",
    "title": "Maintain an Inventory of Accounts",
    "description": "Maintain an inventory of all accounts organized by authentication system.",
    "mappings": {
      "NIST SP 800-53 Rev. 4": "PR.AC-1"
    },
    "subcategoryName": "Identities and credentials are issued, managed, verified, revoked, and audited for authorized devices, users and processes"
  },
  {
    "cisControlId": "16",
    "cisSubControlId": 16.7,
    "assetType": "Users",
    "securityFunction": "Protect",
    "title": "Establish Process for Revoking Access",
    "description": "Establish and follow an automated process for revoking system access by disabling accounts immediately upon termination or change of responsibilities of an employee or contractor . Disabling these accounts, instead of deleting accounts, allows preservation of audit trails.",
    "mappings": {
      "NIST SP 800-53 Rev. 4": "PR.IP-11"
    },
    "subcategoryName": "Identities and credentials are issued, managed, verified, revoked, and audited for authorized devices, users and processes"
  },
  {
    "cisControlId": "16",
    "cisSubControlId": 16.8,
    "assetType": "Users",
    "securityFunction": "Respond",
    "title": "Disable Any Unassociated Accounts",
    "description": "Disable any account that cannot be associated with a business process or business owner.",
    "mappings": {
      "NIST SP 800-53 Rev. 4": "PR.AC-1"
    },
    "subcategoryName": "Identities and credentials are issued, managed, verified, revoked, and audited for authorized devices, users and processes"
  },
  {
    "cisControlId": "16",
    "cisSubControlId": 16.9,
    "assetType": "Users",
    "securityFunction": "Respond",
    "title": "Disable Dormant Accounts",
    "description": "Automatically disable dormant accounts after a set period of inactivity.",
    "mappings": {
      "NIST SP 800-53 Rev. 4": "PR.AC-1"
    },
    "subcategoryName": "Identities and credentials are issued, managed, verified, revoked, and audited for authorized devices, users and processes"
  },
  {
    "cisControlId": "16",
    "cisSubControlId": "16.10",
    "assetType": "Users",
    "securityFunction": "Protect",
    "title": "Ensure All Accounts Have An Expiration Date",
    "description": "Ensure that all accounts have an expiration date that is monitored and enforced.",
    "mappings": {
      "NIST SP 800-53 Rev. 4": "PR.AC-1"
    },
    "subcategoryName": "Identities and credentials are issued, managed, verified, revoked, and audited for authorized devices, users and processes"
  },
  {
    "cisControlId": "16",
    "cisSubControlId": 16.11,
    "assetType": "Users",
    "securityFunction": "Protect",
    "title": "Lock Workstation Sessions After Inactivity",
    "description": "Automatically lock workstation sessions after a standard period of inactivity.",
    "mappings": {
      "NIST SP 800-53 Rev. 4": "PR.IP-1"
    },
    "subcategoryName": "A baseline configuration of information technology/industrial control systems is created and maintained incorporating security principles (e.g. concept of least functionality)"
  },
  {
    "cisControlId": "16",
    "cisSubControlId": 16.12,
    "assetType": "Users",
    "securityFunction": "Detect",
    "title": "Monitor Attempts to Access Deactivated Accounts",
    "description": "Monitor attempts to access deactivated accounts through audit logging.",
    "mappings": {
      "NIST SP 800-53 Rev. 4": "DE.CM-3"
    },
    "subcategoryName": "Personnel activity is monitored to detect potential cybersecurity events"
  },
  {
    "cisControlId": "16",
    "cisSubControlId": 16.13,
    "assetType": "Users",
    "securityFunction": "Detect",
    "title": "Alert on Account Login Behavior Deviation",
    "description": "Alert when users deviate from normal login behavior, such as time-of-day, workstation location and duration.",
    "mappings": {
      "NIST SP 800-53 Rev. 4": "DE.CM-3"
    },
    "subcategoryName": "Personnel activity is monitored to detect potential cybersecurity events"
  },
  {
    "cisControlId": "17",
    "cisSubControlId": "17.1",
    "assetType": "N/A",
    "securityFunction": "N/A",
    "title": "Perform a Skills Gap Analysis",
    "description": "Perform a skills gap analysis to understand the skills and behaviors workforce members are not adhering to, using this information to build a baseline education roadmap.",
    "mappings": {
      "NIST SP 800-53 Rev. 4": null
    },
    "subcategoryName": null
  },
  {
    "cisControlId": "17",
    "cisSubControlId": "17.2",
    "assetType": "N/A",
    "securityFunction": "N/A",
    "title": "Deliver Training to Fill the Skills Gap",
    "description": "Deliver training to address the skills gap identified to positively impact workforce members' security behavior.",
    "mappings": {
      "NIST SP 800-53 Rev. 4": "PR.AT-1"
    },
    "subcategoryName": " Physical and cybersecurity personnel understand their roles and responsibilities "
  },
  {
    "cisControlId": "17",
    "cisSubControlId": "17.3",
    "assetType": "N/A",
    "securityFunction": "N/A",
    "title": "Implement a Security Awareness Program",
    "description": "Create a security awareness program for all workforce members to complete on a regular basis to ensure they understand and exhibit the necessary behaviors and skills to help ensure the security of the organization. The organization's security awareness program should be communicated in a continuous and engaging manner.",
    "mappings": {
      "NIST SP 800-53 Rev. 4": "ID.AM-6"
    },
    "subcategoryName": "All users are informed and trained "
  },
  {
    "cisControlId": "17",
    "cisSubControlId": "17.4",
    "assetType": "N/A",
    "securityFunction": "N/A",
    "title": "Update Awareness Content Frequently",
    "description": "Ensure that the organization's security awareness program is updated frequently (at least annually) to address new technologies, threats, standards and business requirements.",
    "mappings": {
      "NIST SP 800-53 Rev. 4": null
    },
    "subcategoryName": null
  },
  {
    "cisControlId": "17",
    "cisSubControlId": "17.5",
    "assetType": "N/A",
    "securityFunction": "N/A",
    "title": "Train Workforce on Secure Authentication",
    "description": "Train workforce members on the importance of enabling and utilizing secure authentication.",
    "mappings": {
      "NIST SP 800-53 Rev. 4": "PR.AT-1"
    },
    "subcategoryName": "All users are informed and trained "
  },
  {
    "cisControlId": "17",
    "cisSubControlId": "17.6",
    "assetType": "N/A",
    "securityFunction": "N/A",
    "title": "Train Workforce on Identifying Social Engineering Attacks",
    "description": "Train the workforce on how to identify different forms of social engineering attacks, such as phishing, phone scams and impersonation calls.",
    "mappings": {
      "NIST SP 800-53 Rev. 4": "PR.AT-1"
    },
    "subcategoryName": "All users are informed and trained "
  },
  {
    "cisControlId": "17",
    "cisSubControlId": "17.7",
    "assetType": "N/A",
    "securityFunction": "N/A",
    "title": "Train Workforce on Sensitive Data Handling",
    "description": "Train workforce on how to identify and properly store, transfer, archive and destroy sensitive information.",
    "mappings": {
      "NIST SP 800-53 Rev. 4": "PR.AT-1"
    },
    "subcategoryName": "All users are informed and trained "
  },
  {
    "cisControlId": "17",
    "cisSubControlId": "17.8",
    "assetType": "N/A",
    "securityFunction": "N/A",
    "title": "Train Workforce on Causes of Unintentional Data Exposure",
    "description": "Train workforce members to be aware of causes for unintentional data exposures, such as losing their mobile devices or emailing the wrong person due to autocomplete in email.",
    "mappings": {
      "NIST SP 800-53 Rev. 4": "PR.AT-1"
    },
    "subcategoryName": "All users are informed and trained "
  },
  {
    "cisControlId": "17",
    "cisSubControlId": "17.9",
    "assetType": "N/A",
    "securityFunction": "N/A",
    "title": "Train Workforce Members on Identifying and Reporting Incidents",
    "description": "Train employees to be able to identify the most common indicators of an incident and be able to report such an incident.",
    "mappings": {
      "NIST SP 800-53 Rev. 4": "PR.AT-1"
    },
    "subcategoryName": "All users are informed and trained "
  },
  {
    "cisControlId": "18",
    "cisSubControlId": "18.1",
    "assetType": "N/A",
    "securityFunction": "N/A",
    "title": "Establish Secure Coding Practices",
    "description": "Establish secure coding practices appropriate to the programming language and development environment being used.",
    "mappings": {
      "NIST SP 800-53 Rev. 4": null
    },
    "subcategoryName": null
  },
  {
    "cisControlId": "18",
    "cisSubControlId": "18.2",
    "assetType": "N/A",
    "securityFunction": "N/A",
    "title": "Ensure Explicit Error Checking is Performed for All In-House Developed Software",
    "description": "For in-house developed software, ensure that explicit error checking is performed and documented for all input, including for size, data type, and acceptable ranges or formats.",
    "mappings": {
      "NIST SP 800-53 Rev. 4": null
    },
    "subcategoryName": null
  },
  {
    "cisControlId": "18",
    "cisSubControlId": "18.3",
    "assetType": "N/A",
    "securityFunction": "N/A",
    "title": "Verify That Acquired Software is Still Supported",
    "description": "Verify that the version of all software acquired from outside your organization is still supported by the developer or appropriately hardened based on developer security recommendations.",
    "mappings": {
      "NIST SP 800-53 Rev. 4": null
    },
    "subcategoryName": null
  },
  {
    "cisControlId": "18",
    "cisSubControlId": "18.4",
    "assetType": "N/A",
    "securityFunction": "N/A",
    "title": "Only Use Up-to-Date And Trusted Third-Party Components",
    "description": "Only use up-to-date and trusted third-party components for the software developed by the organization.",
    "mappings": {
      "NIST SP 800-53 Rev. 4": null
    },
    "subcategoryName": null
  },
  {
    "cisControlId": "18",
    "cisSubControlId": "18.5",
    "assetType": "N/A",
    "securityFunction": "N/A",
    "title": "Use Only Standardized and Extensively Reviewed Encryption Algorithms",
    "description": "Use only standardized and extensively reviewed encryption algorithms.",
    "mappings": {
      "NIST SP 800-53 Rev. 4": "PR.DS-2"
    },
    "subcategoryName": "Data-at-rest is protected"
  },
  {
    "cisControlId": "18",
    "cisSubControlId": "18.6",
    "assetType": "N/A",
    "securityFunction": "N/A",
    "title": "Ensure Software Development Personnel are Trained in Secure Coding",
    "description": "Ensure that all software development personnel receive training in writing secure code for their specific development environment and responsibilities.",
    "mappings": {
      "NIST SP 800-53 Rev. 4": null
    },
    "subcategoryName": null
  },
  {
    "cisControlId": "18",
    "cisSubControlId": "18.7",
    "assetType": "N/A",
    "securityFunction": "N/A",
    "title": "Apply Static and Dynamic Code Analysis Tools",
    "description": "Apply static and dynamic analysis tools to verify that secure coding practices are being adhered to for internally developed software.",
    "mappings": {
      "NIST SP 800-53 Rev. 4": null
    },
    "subcategoryName": null
  },
  {
    "cisControlId": "18",
    "cisSubControlId": "18.8",
    "assetType": "N/A",
    "securityFunction": "N/A",
    "title": "Establish a Process to Accept and Address Reports of Software Vulnerabilities",
    "description": "Establish a process to accept and address reports of software vulnerabilities, including providing a means for external entities to contact your security group.",
    "mappings": {
      "NIST SP 800-53 Rev. 4": "RS.AN-5"
    },
    "subcategoryName": "Processes are established to receive, analyze and respond to vulnerabilities disclosed to the organization from internal and external sources (e.g. internal testing, security bulletins, or security researchers)"
  },
  {
    "cisControlId": "18",
    "cisSubControlId": "18.9",
    "assetType": "N/A",
    "securityFunction": "N/A",
    "title": "Separate Production and Non-Production Systems",
    "description": "Maintain separate environments for production and non-production systems. Developers should not have unmonitored access to production environments.",
    "mappings": {
      "NIST SP 800-53 Rev. 4": "PR.DS-7"
    },
    "subcategoryName": "The development and testing environment(s) are separate from the production environment"
  },
  {
    "cisControlId": "18",
    "cisSubControlId": 18.1,
    "assetType": "N/A",
    "securityFunction": "N/A",
    "title": "Deploy Web Application Firewalls (WAFs)",
    "description": "Protect web applications by deploying web application firewalls (WAFs) that inspect all traffic flowing to the web application for common web application attacks. For applications that are not web-based, specific application firewalls should be deployed if such tools are available for the given application type. If the traffic is encrypted, the device should either sit behind the encryption or be capable of decrypting the traffic prior to analysis. If neither option is appropriate, a host-based web application firewall should be deployed.",
    "mappings": {
      "NIST SP 800-53 Rev. 4": null
    },
    "subcategoryName": null
  },
  {
    "cisControlId": 18,
    "cisSubControlId": 18.11,
    "assetType": "N/A",
    "securityFunction": "N/A",
    "title": "Use Standard Hardening Configuration Templates for Databases",
    "description": "For applications that rely on a database, use standard hardening configuration templates. All systems that are part of critical business processes should also be tested.",
    "mappings": {
      "NIST SP 800-53 Rev. 4": "PR.IP-1"
    },
    "subcategoryName": "A baseline configuration of information technology/industrial control systems is created and maintained incorporating security principles (e.g. concept of least functionality)"
  },
  {
    "cisControlId": "19",
    "cisSubControlId": "19.1",
    "assetType": "N/A",
    "securityFunction": "N/A",
    "title": "Document Incident Response Procedures",
    "description": "Ensure that there are written incident response plans that define roles of personnel as well as phases of incident handling/management.",
    "mappings": {
      "NIST SP 800-53 Rev. 4": "PR.IP-9"
    },
    "subcategoryName": "Response plans (Incident Response and Business Continuity) and recovery plans (Incident Recovery and Disaster Recovery) are in place and managed"
  },
  {
    "cisControlId": "19",
    "cisSubControlId": "19.2",
    "assetType": "N/A",
    "securityFunction": "N/A",
    "title": "Assign Job Titles and Duties for Incident Response",
    "description": "Assign job titles and duties for handling computer and network incidents to specific individuals and ensure tracking and documentation throughout the incident through resolution.",
    "mappings": {
      "NIST SP 800-53 Rev. 4": "DE.DP-1"
    },
    "subcategoryName": "Response plans (Incident Response and Business Continuity) and recovery plans (Incident Recovery and Disaster Recovery) are in place and managed"
  },
  {
    "cisControlId": "19",
    "cisSubControlId": "19.3",
    "assetType": "N/A",
    "securityFunction": "N/A",
    "title": "Designate Management Personnel to Support Incident Handling",
    "description": "Designate management personnel, as well as backups, who will support the incident handling process by acting in key decision-making roles.",
    "mappings": {
      "NIST SP 800-53 Rev. 4": "DE.DP-1"
    },
    "subcategoryName": "Response plans (Incident Response and Business Continuity) and recovery plans (Incident Recovery and Disaster Recovery) are in place and managed"
  },
  {
    "cisControlId": "19",
    "cisSubControlId": "19.4",
    "assetType": "N/A",
    "securityFunction": "N/A",
    "title": "Devise Organization-wide Standards for Reporting Incidents",
    "description": "Devise organization-wide standards for the time required for system administrators and other workforce members to report anomalous events to the incident handling team, the mechanisms for such reporting, and the kind of information that should be included in the incident notification.",
    "mappings": {
      "NIST SP 800-53 Rev. 4": "RS.CO-2"
    },
    "subcategoryName": "Incidents are reported consistent with established criteria"
  },
  {
    "cisControlId": "19",
    "cisSubControlId": "19.5",
    "assetType": "N/A",
    "securityFunction": "N/A",
    "title": "Maintain Contact Information For Reporting Security Incidents",
    "description": "Assemble and maintain information on third-party contact information to be used to report a security incident, such as Law Enforcement, relevant government departments, vendors, and ISAC partners.",
    "mappings": {
      "NIST SP 800-53 Rev. 4": "ID.SC-5"
    },
    "subcategoryName": "Response and recovery planning and testing are conducted with suppliers and third-party providers"
  },
  {
    "cisControlId": "19",
    "cisSubControlId": "19.6",
    "assetType": "N/A",
    "securityFunction": "N/A",
    "title": "Publish Information Regarding Reporting Computer Anomalies and Incidents",
    "description": "Publish information for all workforce members, regarding reporting computer anomalies and incidents to the incident handling team. Such information should be included in routine employee awareness activities.",
    "mappings": {
      "NIST SP 800-53 Rev. 4": "RS.CO-4"
    },
    "subcategoryName": "Event detection information is communicated"
  },
  {
    "cisControlId": "19",
    "cisSubControlId": "19.7",
    "assetType": "N/A",
    "securityFunction": "N/A",
    "title": "Conduct Periodic Incident Scenario Sessions for Personnel",
    "description": "Plan and conduct routine incident, response exercises and scenarios for the workforce involved in the incident response to maintain awareness and comfort in responding to real world threats. Exercises should test communication channels, decision making, and incident responders technical capabilities using tools and data available to them.",
    "mappings": {
      "NIST SP 800-53 Rev. 4": "PR.IP-10"
    },
    "subcategoryName": "Response and recovery plans are tested"
  },
  {
    "cisControlId": 19,
    "cisSubControlId": 19.8,
    "assetType": "N/A",
    "securityFunction": "N/A",
    "title": "Create Incident Scoring and Prioritization Schema",
    "description": "Create incident scoring and prioritization schema based on known or potential impact to your organization. Utilize score to define frequency of status updates and escalation procedures.",
    "mappings": {
      "NIST SP 800-53 Rev. 4": "RS.AN-4"
    },
    "subcategoryName": "Incidents are categorized consistent with response plans"
  },
  {
    "cisControlId": "20",
    "cisSubControlId": "20.1",
    "assetType": "N/A",
    "securityFunction": "N/A",
    "title": "Establish a Penetration Testing Program",
    "description": "Establish a program for penetration tests that includes a full scope of blended attacks, such as wireless, client-based, and web application attacks.",
    "mappings": {
      "NIST SP 800-53 Rev. 4": null
    },
    "subcategoryName": null
  },
  {
    "cisControlId": "20",
    "cisSubControlId": "20.2",
    "assetType": "N/A",
    "securityFunction": "N/A",
    "title": "Conduct Regular External and Internal Penetration Tests",
    "description": "Conduct regular external and internal penetration tests to identify vulnerabilities and attack vectors that can be used to exploit enterprise systems successfully.",
    "mappings": {
      "NIST SP 800-53 Rev. 4": null
    },
    "subcategoryName": null
  },
  {
    "cisControlId": "20",
    "cisSubControlId": "20.3",
    "assetType": "N/A",
    "securityFunction": "N/A",
    "title": "Perform Periodic Red Team Exercises",
    "description": "Perform periodic Red Team exercises to test organizational readiness to identify and stop attacks or to respond quickly and effectively.",
    "mappings": {
      "NIST SP 800-53 Rev. 4": null
    },
    "subcategoryName": null
  },
  {
    "cisControlId": "20",
    "cisSubControlId": "20.4",
    "assetType": "N/A",
    "securityFunction": "N/A",
    "title": "Include Tests for Presence of Unprotected System Information and Artifacts",
    "description": "Include tests for the presence of unprotected system information and artifacts that would be useful to attackers, including network diagrams, configuration files, older penetration test reports, e-mails or documents containing passwords or other information critical to system operation.",
    "mappings": {
      "NIST SP 800-53 Rev. 4": null
    },
    "subcategoryName": null
  },
  {
    "cisControlId": "20",
    "cisSubControlId": "20.5",
    "assetType": "N/A",
    "securityFunction": "N/A",
    "title": "Create Test Bed for Elements Not Typically Tested in Production",
    "description": "Create a test bed that mimics a production environment for specific penetration tests and Red Team attacks against elements that are not typically tested in production, such as attacks against supervisory control and data acquisition and other control systems.",
    "mappings": {
      "NIST SP 800-53 Rev. 4": null
    },
    "subcategoryName": null
  },
  {
    "cisControlId": "20",
    "cisSubControlId": "20.6",
    "assetType": "N/A",
    "securityFunction": "N/A",
    "title": "Use Vulnerability Scanning and Penetration Testing Tools in Concert",
    "description": "Use vulnerability scanning and penetration testing tools in concert. The results of vulnerability scanning assessments should be used as a starting point to guide and focus penetration testing efforts.",
    "mappings": {
      "NIST SP 800-53 Rev. 4": null
    },
    "subcategoryName": null
  },
  {
    "cisControlId": "20",
    "cisSubControlId": "20.7",
    "assetType": "N/A",
    "securityFunction": "N/A",
    "title": "Ensure Results from Penetration Test are Documented Using Open, Machine-readable Standards",
    "description": "Wherever possible, ensure that Red Team results are documented using open, machine-readable standards (e.g., SCAP). Devise a scoring method for determining the results of Red Team exercises so that results can be compared over time.",
    "mappings": {
      "NIST SP 800-53 Rev. 4": null
    },
    "subcategoryName": null
  },
  {
    "cisControlId": "20",
    "cisSubControlId": "20.8",
    "assetType": "N/A",
    "securityFunction": "N/A",
    "title": "Control and Monitor Accounts Associated with Penetration Testing",
    "description": "Any user or system accounts used to perform penetration testing should be controlled and monitored to make sure they are only being used for legitimate purposes, and are removed or restored to normal function after testing is over.",
    "mappings": {
      "NIST SP 800-53 Rev. 4": "PR.AC-1"
    },
    "subcategoryName": "Identities and credentials are issued, managed, verified, revoked, and audited for authorized devices, users and processes"
  }
]