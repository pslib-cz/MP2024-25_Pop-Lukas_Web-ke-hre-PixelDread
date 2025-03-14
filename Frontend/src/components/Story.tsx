import React from "react";
import styles from "./Story.module.css";

const Story: React.FC = () => {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.textContainer}>
          <h2 className={styles.title}>STORY</h2>
          <p className={styles.text}>The player takes on the role of Detective John, who is going through a difficult period in his life. He suffers from depression, struggles to find a job, and often drowns his problems in alcohol. After one of his wild nights, he wakes up in a park with a strange voice in his head. At first, he believes this voice to be a hallucination, but he soon realizes that the world around him has changed. Strange events begin to unfold, forcing him to trust the voice in order to survive. Unfortunately, this mistake proves fatal.  

The voice has sinister intentions. It eventually leads him to a hospital, where he takes a pill that causes him to lose control over his body. The voice is, in fact, another version of John from a parallel world. He was randomly chosen as the connection point between the two parallel worlds, which are beginning to merge more and more. This merging manifests in an increased presence of supernatural beings.  

Mentally, he is transported into the second world, where he must struggle to survive. This world is already in a state of decay. Occasionally, he hears the voice, and whenever he does, it attacks him with everything it has. He is unable to resist. However, as he continues to survive, he gradually starts to regain control over his original body, engaging in a battle against the voice. Unfortunately, he is unable to fully reclaim control.  

As their minds begin to merge, he experiences intense hallucinations, anxiety, and a deep sense of helplessness. His consciousness intertwines with that of his other self. At this moment, he faces a dilemma: should he merge the worlds, creating a new unified reality, or should he destroy himself as the connection point, thereby saving the world?  

He ultimately decides to destroy himself, severing the connection and preventing the complete merging of worlds. In his final moments, he learns the true motivations of his other self. The other John was not truly evil — he was merely trying to save his own world. In his reality, a mad scientist had built a time machine that caused the world's collapse, disrupting the timeline beyond repair.  

In the scientist’s laboratory, he was told that there was no way to stop the destruction — except to merge his world with an already existing one. Desperate to save his home, he underwent a procedure that turned him into the connection point between worlds. But in the end, he failed.  

By sacrificing himself, the merging process is halted, but the problem is not completely resolved. A significant portion of the parallel world has already fused with reality, and its remnants persist to this day.</p>
        </div>
        <div className={styles.imageContainer}>
          <img src="/detectiveHighQuality.png" alt="Story" className={styles.image} />
        </div>
      </div>
    </section>
  );
};

export default Story;
