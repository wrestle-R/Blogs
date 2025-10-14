import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from './ui/accordion'

export default function SitcomAccordion() {
  return (
    <div className="not-prose my-16">
      <h2 className="text-2xl font-bold mb-8 text-foreground">My Sitcom Rankings</h2>
      <Accordion type="single" collapsible className="space-y-4">
      <AccordionItem value="himym">
        <AccordionTrigger>1. How I Met Your Mother</AccordionTrigger>
        <AccordionContent>
          HIMYM is easily my favorite show among them. I have no idea how someone can say it had a decent ending; I hate it. My advice to anyone who hasn't watched it is, "Do not watch the finale." Stop at the second last episode.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="office">
        <AccordionTrigger>2. The Office</AccordionTrigger>
        <AccordionContent>
          Another amazing show, The Office is absolutely mind-bogglingly beautiful, which makes it even sadder to see the fall-off once Michael left. The heart of the show is the story itself (Jim & Pam). It's kind of crazy how much Steve Carell carried the show.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="two-and-a-half-men">
        <AccordionTrigger>3. Two and a Half Men</AccordionTrigger>
        <AccordionContent>
          This is the last sitcom I have seen. I loved watching it; Charlie Sheen was amazing. His comedic timing is crazy. It's not like I hate Walden (Ashton Kutcher), but the quality drop was kind of insane, and Jake in the later years was not my favorite. I don't think they did a great job with his character development.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="brooklyn-99">
        <AccordionTrigger>4. Brooklyn Nine-Nine</AccordionTrigger>
        <AccordionContent>
          Brooklyn 99 has world-class writing. It was my past most favorite ever sitcom. The episode "The Box" is absolutely world-class; I remember watching it at 2 in the night, and it was crazy. Oh, and the Halloween Heists are world-class. I just didn't like that the Jake & Amy thing became the whole story, where every case solved and everything that happens is to develop their story. And those God-awful 'Black Lives Matter' episodes, I hate them so much.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="parks-and-rec">
        <AccordionTrigger>5. Parks and Recreation</AccordionTrigger>
        <AccordionContent>
          I think even this is a perfect example of a good sitcom. There are so many good and well-developed characters. I mean, we could argue Leslie was the main protagonist, but April & Andy's story, Chris & Ann, Tom's business story, Ron's stoic life lessons, and just sooo many good stories. It is rock solid & a pretty good must-watch.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="modern-family">
        <AccordionTrigger>6. Modern Family</AccordionTrigger>
        <AccordionContent>
          Another absolute banger of a sitcom. The craziest part about Modern Family is the sheer rewatchability of it. I could watch it a million times, like even its one of those YouTube compilations you can watch again & again. I think the only argument you could use against it is they did not know how to write growing kids growing up. Like all the cute kids grew up, and you either found them annoying or it was just a bad arc.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="new-girl">
        <AccordionTrigger>7. New Girl</AccordionTrigger>
        <AccordionContent>
          I saw New Girl in one of the most frustrating stages of my life & it is an amazing comfort show. Another show like seeing Nick Miller just go on with his life is another level of peak. Even Coach, as he was there, was just amazing.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="70s-show">
        <AccordionTrigger>8. That '70s Show</AccordionTrigger>
        <AccordionContent>
          Mediocre sitcom. I don't think anything bad or great. Well, there are good characters like Red and Kitty, but nothing particularly great. The reputation of the show is beyond saving with so many misogynistic remarks and comments and new shifts about Mila Kunis's age and accusations surrounding Steven Hyde's character. Definitely not a show to watch with today's lens.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="office-uk">
        <AccordionTrigger>9. The Office (UK)</AccordionTrigger>
        <AccordionContent>
          Super dry, awkward humor that's just a weird kind of humor. I most of the time love Ricky Gervais's jokes, but in this, there were a lot of those moments where it's so cringey you get such second-hand embarrassment. Overall, it’s clever and a nice change of pace if you like subtle comedy. Plus, that's where I started watching Ricky Gervais's comedy, and they are absolutely peak.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="friends">
        <AccordionTrigger>10. Friends</AccordionTrigger>
        <AccordionContent>
          Not my personal favorite, but it has a special place because it was the first sitcom I really got into. Nostalgia makes it fun to watch, and some moments still crack me up, even if it’s not the funniest show on this list. Ross's physical comedy is really underrated btw I love it.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="2-broke-girls">
        <AccordionTrigger>11. 2 Broke Girls</AccordionTrigger>
        <AccordionContent>
          Has its moments. Max’s sarcasm is top-tier, and Kat Dennings is just really fun to watch. The humor lands sometimes, and during that, it's absolutely hilarious, but most of the time, a lot of the jokes lean on stereotypes and can feel forced. Still, there are definitely episodes that are genuinely funny.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="big-bang-theory">
        <AccordionTrigger>12. Big Bang Theory</AccordionTrigger>
        <AccordionContent>
          Some genuinely really nice moments—Sheldon being Sheldon, Howard’s antics, the nerdy jokes. But overall it gets a bit repetitive and cliche. Fun at times, but mostly mediocre. Oh, that Bernadette song I love it so much, so cool.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="90s-show">
        <AccordionTrigger>13. 90s Show</AccordionTrigger>
        <AccordionContent>
          This is one of the very few shows I really couldn't complete, it's just so weird. The good characters felt odd, just felt out of place, almost hated it.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="young-sheldon">
        <AccordionTrigger>14. Young Sheldon</AccordionTrigger>
        <AccordionContent>
          Honestly, if you haven't watched, you haven't missed out on anything great. It's not bad background sound, but as a dedicated show to watch, just don't.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
    </div>
  )
}
