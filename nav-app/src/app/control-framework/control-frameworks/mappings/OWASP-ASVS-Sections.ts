export let asvsSections = [{
  section: "V1",
  summary: "Architecture, Design and Threat Modeling Requirements",
  controlObjective: `Security architecture has almost become a lost art in many organizations. The days of the enterprise architect have passed in the age of DevSecOps. The application security field must catch up and adopt agile security principles while re-introducing leading security architecture principles to software practitioners. Architecture is not an implementation, but a way of thinking about a problem that has potentially many different answers, and no one single "correct" answer. All too often, security is seen as inflexible and demanding that developers fix code in a particular way, when the developers may know a much better way to solve the problem. There is no single, simple solution for architecture, and to pretend otherwise is a disservice to the software engineering field.

  A specific implementation of a web application is likely to be revised continuously throughout its lifetime, but the overall architecture will likely rarely change but evolve slowly. Security architecture is identical - we need authentication today, we will require authentication tomorrow, and we will need it five years from now. If we make sound decisions today, we can save a lot of effort, time, and money if we select and re-use architecturally compliant solutions. For example, a decade ago, multi-factor authentication was rarely implemented.
  
  If developers had invested in a single, secure identity provider model, such as SAML federated identity, the identity provider could be updated to incorporate new requirements such as NIST 800-63 compliance, while not changing the interfaces of the original application. If many applications shared the same security architecture and thus that same component, they all benefit from this upgrade at once. However, SAML will not always remain as the best or most suitable authentication solution - it might need to be swapped out for other solutions as requirements change. Changes like this are either complicated, so costly as to necessitate a complete re-write, or outright impossible without security architecture.
  
  In this chapter, the ASVS covers off the primary aspects of any sound security architecture: availability, confidentiality, processing integrity, non-repudiation, and privacy. Each of these security principles must be built in and be innate to all applications. It is critical to "shift left", starting with developer enablement with secure coding checklists, mentoring and training, coding and testing, building, deployment, configuration, and operations, and finishing with follow up independent testing to assure that all of the security controls are present and functional. The last step used to be everything we did as an industry, but that is no longer sufficient when developers push code into production tens or hundreds of times a day. Application security professionals must keep up with agile techniques, which means adopting developer tools, learning to code, and working with developers rather than criticizing the project months after everyone else has moved on.`
},
  {
    section: "V1.1",
    summary: "Secure Software Development Lifecycle Requirements",
    controlObjective: ""
  },{
    section: "V1.2",
    summary: "Authentication Architectural Requirements",
    controlObjective: "When designing authentication, it doesn't matter if you have strong hardware enabled multi-factor authentication if an attacker can reset an account by calling a call center and answering commonly known questions. When proofing identity, all authentication pathways must have the same strength."
  },{
    section: "V1.3",
    summary: "This is a placeholder for future architectural requirements.",
    controlObjective: ""
  },{
    section: "V1.4",
    summary: "Access Control Architectural Requirements",
    controlObjective: ""
  },{
    section: "V1.5",
    summary: "Input and Output Architectural Requirements",
    controlObjective: `In 4.0, we have moved away from the term "server-side" as a loaded trust boundary term. The trust boundary is still concerning - making decisions on untrusted browsers or client devices is bypassable. However, in mainstream architectural deployments today, the trust enforcement point has dramatically changed. Therefore, where the term "trusted service layer" is used in the ASVS, we mean any trusted enforcement point, regardless of location, such as a microservice, serverless API, server-side, a trusted API on a client device that has secure boot, partner or external APIs, and so on.

    The "untrusted client" term here refers to client-side technologies that render the presentation layer, commonly refered to as 'front-end' technologies. The term "serialization" here not only refers to sending data over the wire like an array of values or taking and reading a JSON structure, but also passing complex objects which can contain logic.`
  },{
    section: "V1.6",
    summary: "Secure Software Development Lifecycle Requirements",
    controlObjective: `Applications need to be designed with strong cryptographic architecture to protect data assets as per their classification. Encrypting everything is wasteful, not encrypting anything is legally negligent. A balance must be struck, usually during architectural or high level design, design sprints or architectural spikes. Designing cryptography as you go or retrofitting it will inevitably cost much more to implement securely than simply building it in from the start.

    Architectural requirements are intrinsic to the entire code base, and thus difficult to unit or integrate test. Architectural requirements require consideration in coding standards, throughout the coding phase, and should be reviewed during security architecture, peer or code reviews, or retrospectives.`
  },{
    section: "V1.1",
    summary: "Secure Software Development Lifecycle Requirements",
    controlObjective: ""
  },{
    section: "V1.1",
    summary: "Secure Software Development Lifecycle Requirements",
    controlObjective: ""
  },{
    section: "V1.1",
    summary: "Secure Software Development Lifecycle Requirements",
    controlObjective: ""
  },{
    section: "V1.1",
    summary: "Secure Software Development Lifecycle Requirements",
    controlObjective: ""
  },{
    section: "V1.1",
    summary: "Secure Software Development Lifecycle Requirements",
    controlObjective: ""
  },{
    section: "V1.1",
    summary: "Secure Software Development Lifecycle Requirements",
    controlObjective: ""
  },{
    section: "V1.1",
    summary: "Secure Software Development Lifecycle Requirements",
    controlObjective: ""
  },{
    section: "V1.1",
    summary: "Secure Software Development Lifecycle Requirements",
    controlObjective: ""
  },
{
  section: "V2",
  summary: "Authentication Verification Requirements",
  controlObjective: `Authentication is the act of establishing, or confirming, someone (or something) as authentic and that claims made by a person or about a device are correct, resistant to impersonation, and prevent recovery or interception of passwords.

  When the ASVS was first released, username + password was the most common form of authentication outside of high security systems. Multi-factor Authentication (MFA) was commonly accepted in security circles but rarely required elsewhere. As the number of password breaches increased, the idea that usernames are somehow confidential and passwords unknown, rendered many security controls untenable. For example, NIST 800-63 considers usernames and Knowledge Based Authentication (KBA) as public information, SMS and email notifications as "restricted" authenticator types , and passwords as pre-breached. This reality renders knowledge based authenticators, SMS and email recovery, password history, complexity, and rotation controls useless. These controls always have been less than helpful, often forcing users to come up with weak passwords every few months, but with the release of over 5 billion username and password breaches, it's time to move on.
  
  Of all the chapters in the ASVS, the authentication and session management chapters have changed the most. Adoption of effective, evidence-based leading practice will be challenging for many, and that's perfectly okay. We have to start the transition to a post-password future now.`
},
{
  section: "V3",
  summary: "Session Management Verification Requirements",
  controlObjective: `One of the core components of any web-based application or stateful API is the mechanism by which it controls and maintains the state for a user or device interacting with it. Session management changes a stateless protocol to stateful, which is critical for differentiating different users or devices.

    Ensure that a verified application satisfies the following high-level session management requirements:
    -Sessions are unique to each individual and cannot be guessed or shared.
    -Sessions are invalidated when no longer required and timed out during periods of inactivity.

    As previously noted, these requirements have been adapted to be a compliant subset of selected NIST 800-63b controls, focused around common threats and commonly exploited authentication weaknesses. Previous verification requirements have been retired, de-duped, or in most cases adapted to be strongly aligned with the intent of mandatory NIST 800-63b requirements.`
},
{
  section: "V4",
  summary: "Access Control Verification Requirements",
  controlObjective: `Authorization is the concept of allowing access to resources only to those permitted to use them. Ensure that a verified application satisfies the following high level requirements:

    -Persons accessing resources hold valid credentials to do so.
    -Users are associated with a well-defined set of roles and privileges.
    -Role and permission metadata is protected from replay or tampering.`
},
{
  section: "V5",
  summary: "Validation, Sanitization and Encoding Verification Requirements",
  controlObjective: `The most common web application security weakness is the failure to properly validate input coming from the client or the environment before directly using it without any output encoding. This weakness leads to almost all of the significant vulnerabilities in web applications, such as Cross-Site Scripting (XSS), SQL injection, interpreter injection, locale/Unicode attacks, file system attacks, and buffer overflows.

    Ensure that a verified application satisfies the following high-level requirements:
    
    -Input validation and output encoding architecture have an agreed pipeline to prevent injection attacks.
    -Input data is strongly typed, validated, range or length checked, or at worst, sanitized or filtered.
    -Output data is encoded or escaped as per the context of the data as close to the interpreter as possible.
    
    With modern web application architecture, output encoding is more important than ever. It is difficult to provide robust input validation in certain scenarios, so the use of safer API such as parameterized queries, auto-escaping templating frameworks, or carefully chosen output encoding is critical to the security of the application.`
},
{
  section: "V6",
  summary: "Stored Cryptography Verification Requirements",
  controlObjective: `Ensure that a verified application satisfies the following high level requirements:

    -All cryptographic modules fail in a secure manner and that errors are handled correctly.
    -A suitable random number generator is used.
    -Access to keys is securely managed.`
},
{
  section: "V7",
  summary: "Error Handling and Logging Verification Requirements",
  controlObjective: `The primary objective of error handling and logging is to provide useful information for the user, administrators, and incident response teams. The objective is not to create massive amounts of logs, but high quality logs, with more signal than discarded noise.

    High quality logs will often contain sensitive data, and must be protected as per local data privacy laws or directives. This should include:
    
    -Not collecting or logging sensitive information unless specifically required.
    -Ensuring all logged information is handled securely and protected as per its data classification.
    -Ensuring that logs are not stored forever, but have an absolute lifetime that is as short as possible.
    
    If logs contain private or sensitive data, the definition of which varies from country to country, the logs become some of the most sensitive information held by the application and thus very attractive to attackers in their own right.
    
    It is also important to ensure that the application fails securely and that errors do not disclose unnecessary information.`
},
{
  section: "V8",
  summary: "Data Protection Verification Requirements",
  controlObjective: `There are three key elements to sound data protection: Confidentiality, Integrity and Availability (CIA). This standard assumes that data protection is enforced on a trusted system, such as a server, which has been hardened and has sufficient protections.

    Applications have to assume that all user devices are compromised in some way. Where an application transmits or stores sensitive information on insecure devices, such as shared computers, phones and tablets, the application is responsible for ensuring data stored on these devices is encrypted and cannot be easily illicitly obtained, altered or disclosed.
    
    Ensure that a verified application satisfies the following high level data protection requirements:
    
    -Confidentiality: Data should be protected from unauthorized observation or disclosure both in transit and when stored.
    -Integrity: Data should be protected from being maliciously created, altered or deleted by unauthorized attackers.
    -Availability: Data should be available to authorized users as required.`
},
{
  section: "V9",
  summary: "Communications Verification Requirements",
  controlObjective: `Ensure that a verified application satisfies the following high level requirements:

    -TLS or strong encryption is always used, regardless of the sensitivity of the data being transmitted
    -The most recent, leading configuration advice is used to enable and order preferred algorithms and ciphers
    -Weak or soon to be deprecated algorithms and ciphers are ordered as a last resort
    -Deprecated or known insecure algorithms and ciphers are disabled.

    Leading industry advice on secure TLS configuration changes frequently, often due to catastrophic breaks in existing algorithms and ciphers. Always use the most recent versions of TLS configuration review tools (such as SSLyze or other TLS scanners) to configure the preferred order and algorithm selection. Configuration should be periodically checked to ensure that secure communications configuration is always present and effective.`
},
{
  section: "V10",
  summary: "Malicious Code Verification Requirements",
  controlObjective: `Ensure that code satisfies the following high level requirements:

    -Malicious activity is handled securely and properly to not affect the rest of the application.
    -Does not have time bombs or other time-based attacks.
    -Does not "phone home" to malicious or unauthorized destinations.
    -Does not have back doors, Easter eggs, salami attacks, rootkits, or unauthorized code that can be controlled by an attacker.
    
    Finding malicious code is proof of the negative, which is impossible to completely validate. Best efforts should be undertaken to ensure that the code has no inherent malicious code or unwanted functionality.`
},
{
  section: "V11",
  summary: "Business Logic Verification Requirements",
  controlObjective: `Ensure that a verified application satisfies the following high level requirements:

    -The business logic flow is sequential, processed in order, and cannot be bypassed.
    -Business logic includes limits to detect and prevent automated attacks, such as continuous small funds transfers, or adding a million friends one at a time, and so on.
    -High value business logic flows have considered abuse cases and malicious actors, and have protections against spoofing, tampering, repudiation, information disclosure, and elevation of privilege attacks.`
},
{
  section: "V12",
  summary: "File and Resources Verification Requirements",
  controlObjective: `Ensure that a verified application satisfies the following high level requirements:

    -Untrusted file data should be handled accordingly and in a secure manner.
    -Untrusted file data obtained from untrusted sources are stored outside the web root and with limited permissions.`
},
{
  section: "V13",
  summary: "API and Web Service Verification Requirements",
  controlObjective: `Ensure that a verified application that uses trusted service layer APIs (commonly using JSON or XML or GraphQL) has:

    -Adequate authentication, session management and authorization of all web services.
    -Input validation of all parameters that transit from a lower to higher trust level.
    -Effective security controls for all API types, including cloud and Serverless API
    
    Please read this chapter in combination with all other chapters at this same level; we no longer duplicate authentication or API session management concerns.`
},
{
  section: "V14",
  summary: "Configuration Verification Requirements",
  controlObjective: `Ensure that a verified application has:

    -A secure, repeatable, automatable build environment.
    -Hardened third party library, dependency and configuration management such that out of date or insecure components are not included by the application.
    -A secure-by-default configuration, such that administrators and users have to weaken the default security posture.
    
    Configuration of the application out of the box should be safe to be on the Internet, which means a safe out of the box configuration.`
}]