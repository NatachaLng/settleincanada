import React, { useState, useMemo } from 'react';
import styles from './FAQPage.module.css';

// Sample FAQ data based on Reddit FAQ topics
const faqData = [
  {
    category: 'Post eCOPR',
    intro: `The steps below do not have to be performed ASAP. Unless your original SIN is about to expire, take a few days or even a few weeks if necessary.`,
    questions: [
      {
        q: 'What does it mean to be a permanent resident now?',
        a: `Recognize that you are a permanent resident now. Your temporary documents are invalid from now on (a PR isn't entitled, or needs, a work permit or an IM-1 visa).

You become a PR the day you receive your eCOPR, not when you receive your first PR card.

Your temporary documents (work permits, study permits, IM-1 visas, ETAs) are invalidated the day you become a PR, which has implications for travel. This will be covered in topic 5 focused on travel below.`
      },
      {
        q: 'What happens to my PR application after I become a permanent resident?',
        a: `Now that you are a permanent resident, your PR application will transition to a closed state in the next few days. This is to be expected, however, it does not mean that your PR card was approved or dispatched, see topics 2 and 3 below to understand how to track your PR card application and its delivery in the mail.`
      },
      {
        q: 'How do I review my eCOPR for mistakes or typos?',
        a: `Review your eCOPR for mistakes and typos. If you found any, see Q6: How Can I Amend a Mistake in My eCOPR below.

It's OK if your eCOPR only has a client copy, you won't need an IRCC copy for anything and some agents do not even include it. IRCC copies are never or virtually never countersigned by IRCC, so don't worry about that either.

If nothing needs amending, proceed to the next step.`
      },
      {
        q: 'Do I need to print and sign the client copy of my eCOPR?',
        a: `Assuming nothing important (your name, your passport number, your DoB), or nothing at all, in your eCOPR needs amending, print the client copy of your eCOPR and sign it.

Yes, at least Service Canada and Service Ontario do pay attention to the signature (if you apply in person).`
      },
      {
        q: 'How do I get a new permanent SIN?',
        a: (
          <>
            <div>
              Get a new SIN: either go to a less crowded Service Canada branch (no appointment needed), or apply online.
            </div>
            <div>
              Whether applying online or at Service Canada, you will need your ID and a signed client copy of the eCOPR document (its physical copy when applying in person or a digital one, that is, a scan or a photo, when applying online).
            </div>
            <div>
              When applying online, use either the "Update or correct a SIN record" or "Change the status on a SIN record" options, and prefer the online (email) delivery option, which usually takes 1-4 days. When your online application is approved, you will receive an email entitled Your application for a Social Insurance Number (SIN) has been processed.
            </div>
            <div style={{ margin: '8px 0' }}>
              You can apply online for your SIN here: <a href="https://sin-nas.canada.ca/en/Sin/" target="_blank" rel="noopener noreferrer">Apply for a SIN online</a>.
            </div>
            <div>
              Snail mail delivery can take up to a couple of weeks.
            </div>
          </>
        )
      },
      {
        q: 'Who should I notify about my new SIN?',
        a: `⁠Notify your employer(s), bank(s), brokerage(s) of your new SIN. Note that paycheques can still be deposited and taxes can be paid on your behalf with the old SIN, so if updating your SIN takes a few days, it won't cause any issues.

You do not and cannot notify credit bureaus (Equifax, TransUnion) directly. They get the data they need from your bank(s).`
      },
      {
        q: 'How do I get a new health insurance card (OHIP, MSP, etc)?',
        a: `⁠Go to your provincial govt services office (e.g. Service Ontario) to get a new health insurance card.

In British Columbia, you will need to wait for your PR card to arrive in order to replace your MSP card. BC only accepts PR cards as a PR status proof. Other provinces and territories would accept a printed and signed eCOPR document for your PR status confirmation.

To update your health insurance card you may have to book an appointment first.

You should be covered for the waiting period by the one you have but this might be province/territory-specific.`
      },
      {
        q: 'What do I need to do about the expiration date on my eCOPR?',
        a: (
          <>
            Nothing. All eCOPRs have expiration dates, they are for IRCC to use (issue your eCOPR by that date). You have your eCOPR, and your PR status does not expire as long as you are physically present in Canada during the required number of days in the last five years.{' '}
            <a href="https://www.canada.ca/en/immigration-refugees-citizenship/services/permanent-residents/status.html" target="_blank" rel="noopener noreferrer">Learn more about PR status requirements</a>.
          </>
        )
      },
      {
        q: 'How do I set up a new CRA MyAccount after my original one gets deactivated?',
        a: `⁠After 7-10 days, set up a new CRA MyAccount using your new SIN and the Notice of Assessement for the previous year (2024 at the time of writing).

This topic is covered separately below in Q7.`
      }
    ]
  },
  {
    category: 'PR Card Application',
    questions: [
      {
        q: 'Who creates my first PR card application?',
        a: `When you become a PR, IRCC creates your first PR card application on your behalf. The address and photo submitted to the PR portal are for the first PR card, not for the eCOPR.`
      },
      {
        q: 'Is the PR card application the same as the PR application?',
        a: `The PR card application is separate from the PR application. The day after you become a PR your PR application will transition to "Approved": this does not mean that your PR card was approved.`
      },
      {
        q: 'Do I need to link my PR card application to my IRCC account?',
        a: `In order to track PR card application approval and card dispatch, the PR card application must be linked to your IRCC account. This step is optional, the card will be approved and dispatched even if you never link your application.`
      },
      {
        q: 'What if I applied for PR via a representative and do not have my own IRCC account?',
        a: (
          <>
            In this case, you can <a href="https://www.canada.ca/en/immigration-refugees-citizenship/services/application/register.html" target="_blank" rel="noopener noreferrer">create a new IRCC account</a> and link your PR card application there as described below.
          </>
        )
      },
      {
        q: 'How do I link my PR card application to my IRCC account?',
        a: (
          <>
            <div>
              In order to track card approval and dispatch, the application must be <a href="https://www.canada.ca/en/immigration-refugees-citizenship/services/application/register.html" target="_blank" rel="noopener noreferrer">linked to your IRCC account</a>. The process involves your UCI and the data in your eCOPR document, such as last name and place of birth.
            </div>
            <div>
              The most commonly used option requires the UCI and the applicant's last name. Note that all values must be entered with the same case (e.g. UPPER CASE) as in the eCOPR document, exactly as in the eCOPR document. Even if certain values do not technically make sense (e.g. City/town of birth lists a region or country, not a city).
            </div>
          </>
        )
      },
      {
        q: 'What if my PR card application cannot be found when linking?',
        a: `It can take between a day and two weeks for the linking to succeed. If different methods do not work, keep trying every 2-3 days. For some PRs, the linking never succeeds. They still receive their cards, even then.`
      },
      {
        q: 'Does each family member have their own PR card application?',
        a: `Every family member has their own card and therefore their own PR card application. Assuming that you are interested in tracking at all, all these applications should all be linked independently.`
      },
      {
        q: 'How long does it take to receive my PR card after becoming a PR?',
        a: (
          <>
            As of late Jun 2025, it takes close to two months from the moment you become a PR (receive your eCOPR) to PR card delivery. Delivery times vary depending on your location, see Q3 How Long Will My PR Card Delivery Take below, too.<br />
            <a href="https://www.reddit.com/r/ImmigrationCanada/comments/1hpzygp/comment/n2qc9x0/" target="_blank" rel="noopener noreferrer">Latest weekly PR Card Statistics</a><br />
            <a href="https://www.reddit.com/r/ImmigrationCanada/comments/1hpzygp/comment/n2qf8qg/" target="_blank" rel="noopener noreferrer">Latest PR Card wait times</a>
          </>
        )
      },
      {
        q: 'What do U1 (GU1) and U2 (GU2) mean in my PR card application updates?',
        a: (
          <>
            <div>
              A PR card application receives two key updates: an approval and a dispatch. Both can be observed in the linked application details in the IRCC account ("GCkey"). In the immigrant community, they are often referred to as U1 (or GU1) and U2 (GU2).
            </div>
            <div>
              <b>Update 1 (U1, GU1):</b> the Final Decision section in GCkey shows a date. It means your application has been reviewed and approved, and the card is ready for printing. If either your photo or address are not up to IRCC standards, an agent will inform you over email.
            </div>
            <div>
              <b>Update 2 (U2, GU2):</b> your card has been printed and dispatched (mailed), which means it was submitted for delivery (via Canada Post or FedEx, if Canada Post is on strike). After this update the PR card application in the IRCC account will explicitly state that the card was mailed under the Document Status section.
            </div>
            <div>
              <b>PR Card Received:</b> the card was delivered per IRCC records. The application is closed.
            </div>
            <div>
              PR Portal will often display an address update around the Update 2 step (U2, GU2).
            </div>
            <div>
              In rare cases the 2nd update is skipped in the application details but the PR card is dispatched and arrives even then.
            </div>
            <div>
              In most if not all cases, the photo will remain "in review" after U1, U2 and even after you receive your PR card. Therefore ignore the photo state in PR portal. If IRCC needs a new photo from you, they will reach out before the Update 1 step.
            </div>
          </>
        )
      },
      {
        q: 'What if my PR card photo was rejected? How soon will my card application be reviewed again?',
        a: `We have very little data on such cases but anecdotal evidence suggests that a photo rejection introduces a delay of one month, although in one very recent case (late Jun 2025), the delay was shorter: about two weeks.`
      },
      {
        q: 'My card was approved and dispatched but my family member’s wasn’t. Is this normal?',
        a: `This is very typical. Card approvals, dispatch and delivery can and usually will happen at different times or on different days for different family members. Neither IRCC nor Canada Post try to "bundle" the applications from different family members.`
      }
    ]
  },
  {
    category: 'PR Card Delivery',
    questions: [
      {
        q: 'Where are PR cards dispatched from?',
        a: `Seemingly all cards are dispatched from a Sydney, NS facility, postal codes: B1P 7C1, B1P 6K7, using regular mail.`
      },
      {
        q: 'How can I estimate PR card delivery time?',
        a: (
          <>
            Canada Post website has a <a href="https://www.canadapost-postescanada.ca/cpc/en/tools/delivery-standards.page" target="_blank" rel="noopener noreferrer">tool</a> that allows you to estimate a delivery time between those postal codes and your residential address.
          </>
        )
      },
      {
        q: 'How can I track inbound mail for my PR card?',
        a: (
          <>
            <div>Canada Post offers a <a href="https://www.canadapost-postescanada.ca/cpc/en/personal/mymail.page" target="_blank" rel="noopener noreferrer">service called MyMail</a>, available in the Canada Post app.</div>
            <div>The service notifies you of inbound mail when it's ready for "last mile" delivery, that is, on delivery day or the day before.</div>
            <div>The service is not available in all parts of the country.</div>
          </>
        )
      },
      {
        q: 'How do I know if it’s my PR card in the mail?',
        a: (
          <>
            <div>PR cards are sent by the Canadian Bank Note Company. Sometimes the sender will say so, and sometimes sender details won't be available, which means PR card letters are categorized as General Mail.</div>
            <div>Mail from Canada Post, the Royal Bank of Canada are not PR cards.</div>
            <div>In some cases MyMail says that your mail for the day was delivered but some of the letters arrive the next day.</div>
          </>
        )
      },
      {
        q: 'What if there is a Canada Post strike?',
        a: (
          <>
            <div>In May 2025, there were reports of IRCC delivering cards using FedEx.</div>
            <div>Back in November 2024, IRCC offered a card pickup option in the largest metropolitan areas (such as the GTA, the GVA, the GMA).</div>
          </>
        )
      }
    ]
  },
  {
    category: 'Address Change',
    questions: [
      {
        q: 'What happens if I move and update my address after submitting it to the PR portal?',
        a: (
          <>
            <div>Imagine a case where you submit address A to the PR portal, then you move provinces before you receive your eCOPR. Then you update the address by raising a Web form and a P1 email reply, all that. The PR portal address, however, does not change.</div>
          </>
        )
      },
      {
        q: 'Should I set up mail forwarding with Canada Post for my PR card?',
        a: (
          <>
            <div>Do not set up mail forwarding if you can avoid it. PR card envelopes are explicitly stamped with "Do not forward/Ne pas faire suivre", so if you set up mail forwarding, the card may be immediately returned to the sender.</div>
            <div>If you can avoid setting up mail forwarding from your previous address to the new one, this is recommended to help avoid certain types of PR card delivery delays.</div>
          </>
        )
      },
      {
        q: 'Can IRCC update my PR portal address after I move?',
        a: (
          <>
            <div>Per IRCC agents working support shifts, updating only the address is supposedly technically not possible for at least some IRCC staff. So they mark the old address as approved while in reality they will dispatch the card to the updated address they have in the GCMS case or whatever.</div>
            <div>Some of the time, the newly added case comments are respected by the PR card printing department, which means cards are delivered to the new address. However, a non-trivial percentage of PR cards are sent to the original address submitted to the PR Portal initially.</div>
          </>
        )
      },
      {
        q: 'What if I can’t guarantee delivery to my new address?',
        a: (
          <>
            <div>If you can retain access to the mail at the old address (by reaching a verbal agreement with your ex-landlord), that would be a very good idea in case IRCC sends your card(s) to the old address.</div>
          </>
        )
      }
    ]
  },
  {
    category: 'Travel Without PR Card',
    intro: (
      <div className={styles.faqIntroList}>
        <div style={{ textAlign: 'left' }}>
          This short FAQ question does not cover every detail possible but should mention everything that's relevant for a new PR who has their eCOPR and wants to travel to another country. It won't go over the nuances of APIS, the fact that it applies to commercial airlines but does not apply to commercial bus carriers, and how that's important for returning to Canada without a valid PR card or a PRTD.<br /><br />
          If you need more details or have unique circumstances, we encourage you to consult official IRCC and CBSA documentation, or seek additional guidance online or from trusted professionals.
        </div>
      </div>
    ),
    questions: [
      {
        q: 'What happens to your temporary documents when you become a PR?',
        a: (
          <>
            <div>When you receive your eCOPR (or a paper COPR, in case of outland candidates who have had work or study permits but have chosen to finish the process from another country), you become a permanent resident of Canada.</div>
            <div>Permanent residents are not entitled to work permits, study permits by law, so with the exception of your temporary SIN, all of your temporary documents are invalidated the day you receive your eCOPR.</div>
            <div>For simplicity, assume that this applies to the IM-1 visas and eTA (electronic travel authorizations) issued to work and study permit holders when they first arrive.</div>
          </>
        )
      },
      {
        q: 'What does that mean for travel?',
        a: (
          <>
            <div>It means that when showing up at the border, a PR needs to have a document that confirms their status and can be issued to a permanent resident. The list of such documents is short:</div>
            <ul>
              <li>A valid PR card</li>
              <li><a href="https://www.canada.ca/en/immigration-refugees-citizenship/services/application/application-forms-guides/guide-5529-applying-permanent-resident-travel-document.html" target="_blank" rel="noopener noreferrer">PRTD</a> (a Permanent Resident Travel Document)</li>
              <li>When crossing the land border only: an eCOPR</li>
            </ul>
            <div>One of the first two documents, or a U.S. passport or green card, will be necessary when boarding a commercial flight to 🇨🇦</div>
          </>
        )
      },
      {
        q: 'How do I get a PRTD?',
        a: (
          <>
            <div>A PR can <a href="https://www.canada.ca/en/immigration-refugees-citizenship/services/application/application-forms-guides/guide-5529-applying-permanent-resident-travel-document.html" target="_blank" rel="noopener noreferrer">apply for a PRTD</a>. The process involves mailing in your passport (a PRTD is a counterfoil in your passport, not a document per se), and processing times differ from country to country. In many cases, it can take 2-4 weeks from the day you apply.</div>
          </>
        )
      },
      {
        q: 'Can I return to Canada by land from the U.S. with just my eCOPR?',
        a: (
          <>
            <div>Returning by land from the U.S. is <a href="https://www.canada.ca/en/immigration-refugees-citizenship/services/permanent-residents/travel-outside-canada.html" target="_blank" rel="noopener noreferrer">the only case</a> where an eCOPR (or a paper COPR) effectively works as a <a href="https://www.cbsa-asfc.gc.ca/travel-voyage/td-dv-eng.html" target="_blank" rel="noopener noreferrer">travel document</a>.</div>
            <div>Besides the above IRCC guide, there are enough practical confirmations that a holder of a valid U.S. visa/status, a valid passport and an eCOPR (or a paper COPR) can return to Canada by crossing the border from the United States.</div>
            <div>This applies to private vehicles and commercial buses.</div>
          </>
        )
      },
      {
        q: 'I have my eCOPR and need to travel, what should I do?',
        a: (
          <>
            <div>As the rest of this FAQ answer suggests, you have three options:</div>
            <ul>
              <li>Wait for about two months to get your first PR card and then travel (see topics 2 and 3 above)</li>
              <li>Get a PRTD in your destination country, which can take 2-4 weeks and even more, and will require you to mail your passport to a Canadian consulate or embassy in the region</li>
              <li>If you are returning from the U.S. or can legally enter the U.S., travel to a bordering state (e.g. New York, Michigan or Washington) and return to Canada by land</li>
            </ul>
          </>
        )
      },
      {
        q: 'Can outland family members with paper COPRs and IM-1 visas travel to Canada if the primary applicant hasn’t received their eCOPR?',
        a: (
          <>
            <div>Non-accompanying outland family members with COPRs and IM-1 visas can only travel to Canada after the primary applicant on their case receives their eCOPR (becomes a PR), and not earlier.</div>
          </>
        )
      }
    ]
  },
  {
    category: 'eCOPR Mistake',
    intro: (
      <div className={styles.faqIntroList}>
        <div style={{ textAlign: 'left' }}>
          As of June 2025, the eCOPR issuance process is visibly poorly automated. This is easy to tell without any insider information: typos, incorrect marital status, wrong files uploaded are all relatively common to see.<br /><br />
          If you receive an eCOPR with a mistake, there are two possible options:
          <ul>
            <li>The uploaded eCOPR document is incorrect (e.g. an eCOPR of another person) or missing after a few business days</li>
            <li>Some mistakes make no practical difference and can be ignored (per IRCC itself)</li>
            <li>Others are serious and require an eCOPR amendment using form IMM 1436 and IRCC Guide 5128</li>
          </ul>
        </div>
      </div>
    ),
    questions: [
      {
        q: 'What should I do if my PR Portal has an incorrect eCOPR file uploaded?',
        a: (
          <>
            <div>If your eCOPR file is incorrect (e.g. it's an eCOPR of your dependent, of another person, or a draft), respond to your P1 email and raise a Web form to have a correct document uploaded.</div>
            <div>In this case, it's not necessary to mail form IMM 1436, an email and Web form would suffice.</div>
          </>
        )
      },
      {
        q: 'What mistakes in my eCOPR can be ignored?',
        a: (
          <>
            <div>According to IRCC, a few types of mistakes don't have to be amended; they won't have any practical consequences for the new PR, per IRCC support line and anecdotal evidence:</div>
            <ul>
              <li>Typos in eCOPR holder height</li>
              <li>Incorrectly specified eCOPR holder eye colour</li>
              <li>Incorrect (e.g. not the most recent) last entry date</li>
              <li>Incorrect first (original) entry date: these are often incorrectly provided to begin with, since not everyone remembers or has documental evidence of their original entry date</li>
              <li>Incorrect city/town of birth: these are very often not technically correct, seemingly without any practical consequences, short or long term</li>
            </ul>
          </>
        )
      },
      {
        q: 'What mistakes in my eCOPR must be amended?',
        a: (
          <>
            <div>All other mistakes fall into this category, such as:</div>
            <ul>
              <li>Incorrectly spelled first name or last name (or just name if the PR only has one name)</li>
              <li>Incorrect date of birth</li>
              <li>Incorrect citizenship</li>
              <li>Incorrect country of birth</li>
              <li>Incorrect marital status or marital status details</li>
              <li>(In theory) all other mistakes</li>
            </ul>
          </>
        )
      },
      {
        q: 'Does an eCOPR amendment pause your PR status?',
        a: (
          <>
            <div>No, it does not. Even if your eCOPR needs to be amended, you should still go ahead and obtain a permanent SIN and so on (see topic 1 in this FAQ) without waiting for your amended eCOPR.</div>
          </>
        )
      }
    ]
  },
  {
    category: 'CRA MyAccount',
    intro: (
      <div className={styles.faqIntroList}>
        <div style={{ textAlign: 'left' }}>
          This FAQ question covers the basics of setting up a new CRA MyAccount. This post does not constitute tax or legal advice, and only seeks to explain the basics of the process to new permanent residents. When in doubt, consult with the official CRA documentation and/or a licensed tax professional.
        </div>
      </div>
    ),
    questions: [
      {
        q: 'What happens to my CRA MyAccount access after I become a PR?',
        a: (
          <>
            <div>Some 5-10 days after you become a PR (receive your eCOPR) and get a new permanent SIN, your CRA MyAccount will be deactivated. You can speed up the process by calling the CRA if you have reasons to do so but it's not strictly necessary.</div>
            <div>You need to register a new MyAccount with your new SIN and the data from the NoA (Notice of Assessment) document for the previous tax year.</div>
          </>
        )
      },
      {
        q: 'How do I register a new CRA MyAccount?',
        a: (
          <>
            <div>Incredibly important: make sure to download your NoA (Notice of Assessment) for the previous tax year, if you haven't done so already. You will need the data from that document (for example, the value from line 15000 or another line) to finish setting up a new MyAccount.</div>
            <div>Make sure you have a new permanent SIN (see topic 1 in this FAQ).</div>
            <div>Follow the CRA doc guide. Note that if you've previously used a Sign-in Partner option (e.g. your bank), very likely you will have to use a CRA user ID and password for the new account, or the Provincial Partner one if you live in a province that has them.</div>
          </>
        )
      },
      {
        q: 'Will I lose access to the data in my old CRA MyAccount?',
        a: (
          <>
            <div>No, the data will be preserved and made available in your new account eventually. Most of the data (such as your NoA documents) should be accessible after no more than 48 hours but some other data sources (e.g. the benefits information) will take longer to transfer.</div>
          </>
        )
      },
      {
        q: 'What if I don’t have my NoA and my original CRA MyAccount already has been deactivated?',
        a: (
          <>
            <div>This is a good practical reminder that important government documents such as everything related to tax filing should always be archived. You don't need the NoA document per se, you need some data from it.</div>
            <div>Assuming you haven't filed form T1-ADJ (Adjustment Request), line 15000 (Total income) will usually be identical on your T1 and the initial Notice of Assessment. So you can use the value from the same line in your T1 instead. If you don't have your T1 either and you only have employment income, try the Total income line from your T4.</div>
            <div>If you don't have access to any of those forms, you will have to set up your MyAccount next year when you do have your NoA or T1 at hand.</div>
          </>
        )
      },
      {
        q: 'If it takes longer to get a new SIN, can I get paid? Can my employer pay taxes for me?',
        a: (
          <>
            <div>Yes, you can get paid and your employer(s) will be able to pay taxes on your behalf using your new SIN for at least a few months after the day you've become a PR. Possibly even till your original SIN expires. But please don't delay getting a new permanent SIN for months!</div>
          </>
        )
      },
      {
        q: 'What if I have never filed taxes in Canada before?',
        a: (
          <>
            <div>You will have to file your taxes, get a Notice of Assessment and set up your first MyAccount. The procedure will generally be the same as for those creating new MyAccounts.</div>
            <div>Note that if you have to file on paper the first time (it happens to some newcomers, electronic filing via NETFILE fails for them; been there, done that), the NoA document will arrive in the mail some 7-8 months after the CRA receives your tax return.</div>
          </>
        )
      }
    ]
  }
];

function flattenQuestions(data) {
  // Returns [{category, q, a}] for search
  return data.flatMap(cat => cat.questions.map(q => ({ ...q, category: cat.category })));
}

const allQuestions = flattenQuestions(faqData);

// Helper to get plain text from q.a for searching
function getAnswerText(a) {
  if (typeof a === 'string') return a;
  if (typeof a === 'number') return a.toString();
  if (a && typeof a === 'object' && 'props' in a) {
    // Try to extract text from JSX
    let text = '';
    React.Children.forEach(a.props.children, child => {
      if (typeof child === 'string') text += child;
      else if (typeof child === 'object' && child) text += getAnswerText(child);
    });
    return text;
  }
  return '';
}

// Helper to highlight matches
function highlight(text, query) {
  if (!query) return text;
  // Ensure text is a string
  const safeText = getAnswerText(text);
  const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
  return safeText.split(regex).map((part, i) =>
    regex.test(part) ? <mark key={i} className={styles.faqHighlight}>{part}</mark> : part
  );
}

const FAQPage = () => {
  const [search, setSearch] = useState('');
  const [searchActive, setSearchActive] = useState(false);
  const [expanded, setExpanded] = useState({}); // { 'category|q': true }
  const [activeTab, setActiveTab] = useState(faqData[0].category);

  // Filtered search results
  const searchResults = useMemo(() => {
    if (search.length < 3) return [];
    const lower = search.toLowerCase();
    return allQuestions.filter(
      q =>
        (q.q && q.q.toLowerCase().includes(lower)) ||
        (q.a && getAnswerText(q.a).toLowerCase().includes(lower))
    );
  }, [search]);

  // Expand/collapse logic
  const toggle = (cat, q) => {
    setExpanded(exp => ({ ...exp, [`${cat}|${q}`]: !exp[`${cat}|${q}`] }));
  };

  return (
    <div className={styles.faqPageWrap}>
      <div className={styles.faqHeaderCenter}>
        <div className={styles.faqEyebrow}>FAQ & Immigration Topics</div>
        <h1 className={styles.faqTitle}>Frequently asked questions</h1>
        <div className={styles.faqSubtitle}>Answers to common questions about Canadian PR, eCOPR, citizenship, and more.</div>
      </div>
      <div className={styles.faqSearchRow}>
        <div className={styles.faqSearchInputWrap}>
          <input
            className={styles.faqSearchInput}
            type="text"
            placeholder="Search for a question or topic..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            onFocus={() => setSearchActive(true)}
            onBlur={() => setTimeout(() => setSearchActive(false), 200)}
            style={searchActive ? { border: '2px solid #861F2B', background: '#fff' } : {}}
          />
          {search.length > 0 && (
            <button
              className={styles.faqSearchClear}
              onClick={() => setSearch('')}
              tabIndex={-1}
              type="button"
              aria-label="Clear search"
            >
              ×
            </button>
          )}
        </div>
        {searchActive && search.length >= 3 && (
          <div className={styles.faqSearchDropdown}>
            {searchResults.length === 0 ? (
              <div className={styles.faqNoResults}>No results found.</div>
            ) : (
              searchResults.map((q, i) => (
                <React.Fragment key={q.category + q.q + i}>
                  <div
                    className={styles.faqSearchResult}
                    onMouseDown={() => {
                      setExpanded(exp => ({ ...exp, [`${q.category}|${q.q}`]: true }));
                      setSearch('');
                      setActiveTab(q.category);
                    }}
                  >
                    <span className={styles.faqSearchCat}>{q.category}</span>
                    <span className={styles.faqSearchQ} style={{ fontWeight: 700, display: 'block' }}>
                      {highlight(q.q, search)}
                    </span>
                    <span className={styles.faqSearchASnippet}>
                      {`In ${q.category}: `}
                      {(() => {
                        const answerText = getAnswerText(q.a);
                        const lowerAnswer = answerText.toLowerCase();
                        const lowerSearch = search.toLowerCase();
                        const matchIdx = lowerAnswer.indexOf(lowerSearch);
                        if (matchIdx === -1) {
                          // fallback to start
                          return highlight(answerText.length > 120 ? answerText.slice(0, 120) + '...' : answerText, search);
                        }
                        const context = 60;
                        const start = Math.max(0, matchIdx - context);
                        const end = Math.min(answerText.length, matchIdx + lowerSearch.length + context);
                        let snippet = answerText.slice(start, end);
                        if (start > 0) snippet = '...' + snippet;
                        if (end < answerText.length) snippet = snippet + '...';
                        return highlight(snippet, search);
                      })()}
                    </span>
                  </div>
                  {i < searchResults.length - 1 && <div className={styles.faqSearchSep} />}
                </React.Fragment>
              ))
            )}
          </div>
        )}
      </div>
      <div className={styles.faqTabsRow}>
        {faqData.map(cat => (
          <button
            key={cat.category}
            className={activeTab === cat.category ? styles.faqTabActive : styles.faqTab}
            onClick={() => setActiveTab(cat.category)}
            type="button"
          >
            {cat.category}
          </button>
        ))}
      </div>
      <div className={styles.faqTabPanel}>
        {faqData.filter(cat => cat.category === activeTab).map(cat => (
          <div className={styles.faqCategory} key={cat.category}>
            {cat.intro && (
              <div className={styles.faqIntro}>{cat.intro}</div>
            )}
            {cat.disclaimer && (
              <div className={styles.faqDisclaimer}>{cat.disclaimer}</div>
            )}
            {cat.questions.map(q => (
              <div
                className={styles.faqCard}
                key={q.q}
              >
                <div
                  className={styles.faqQRow}
                  onClick={() => toggle(cat.category, q.q)}
                  tabIndex={0}
                  role="button"
                  aria-expanded={!!expanded[`${cat.category}|${q.q}`]}
                >
                  <span className={styles.faqQ}>{q.q}</span>
                  <span
                    className={
                      expanded[`${cat.category}|${q.q}`]
                        ? `${styles.faqToggleIcon} ${styles.faqToggleIconOpen}`
                        : styles.faqToggleIcon
                    }
                  >
                    {expanded[`${cat.category}|${q.q}`] ? '−' : '+'}
                  </span>
                </div>
                {expanded[`${cat.category}|${q.q}`] && (
                  <div className={styles.faqA}>{q.a}</div>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQPage; 