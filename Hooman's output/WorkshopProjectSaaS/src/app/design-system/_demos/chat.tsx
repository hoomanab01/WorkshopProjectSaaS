"use client";

import { CalendarIcon, FileTextIcon, ImageIcon, XIcon } from "lucide-react";
import {
  Attachment,
  AttachmentAction,
  AttachmentActions,
  AttachmentContent,
  AttachmentDescription,
  AttachmentGroup,
  AttachmentMedia,
  AttachmentTitle,
} from "@/components/ui/attachment";
import { Bubble, BubbleContent, BubbleGroup } from "@/components/ui/bubble";
import { Marker, MarkerContent, MarkerIcon } from "@/components/ui/marker";
import {
  Message,
  MessageAvatar,
  MessageContent,
  MessageFooter,
  MessageGroup,
  MessageHeader,
} from "@/components/ui/message";
import {
  MessageScroller,
  MessageScrollerButton,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerProvider,
  MessageScrollerViewport,
} from "@/components/ui/message-scroller";
import {
  Questionnaire,
  QuestionnaireActions,
  QuestionnaireChoice,
  QuestionnaireChoiceDescription,
  QuestionnaireChoices,
  QuestionnaireDescription,
  QuestionnaireInput,
  QuestionnaireItem,
  QuestionnaireNext,
  QuestionnairePrevious,
  QuestionnaireProgress,
  QuestionnaireSubmit,
  QuestionnaireTitle,
} from "@/components/ui/questionnaire";
import { Caption } from "../Showcase";

const CONVERSATION = [
  { from: "customer", text: "Hi! Is the blue RZR XP 1000 still available?", time: "9:41 am" },
  { from: "dealer", text: "It is. Would you like to book a test ride this weekend?", time: "9:43 am" },
  { from: "customer", text: "Saturday morning works for me.", time: "9:44 am" },
  { from: "dealer", text: "Booked for Saturday at 10:00. See you then!", time: "9:46 am" },
];

function ConversationLine({ from, text, time }: (typeof CONVERSATION)[number]) {
  const dealer = from === "dealer";
  return (
    <Message align={dealer ? "end" : "start"}>
      <MessageAvatar className="size-8 text-xs">{dealer ? "RP" : "JL"}</MessageAvatar>
      <MessageContent>
        <MessageHeader>{dealer ? "Ridge Powersports" : "Jordan Lee"}</MessageHeader>
        <Bubble variant={dealer ? "default" : "secondary"} align={dealer ? "end" : "start"}>
          <BubbleContent>{text}</BubbleContent>
        </Bubble>
        <MessageFooter>{time}</MessageFooter>
      </MessageContent>
    </Message>
  );
}

function MessageDemo() {
  return (
    <MessageGroup className="max-w-lg gap-4">
      {CONVERSATION.slice(0, 2).map((m) => (
        <ConversationLine key={m.time} {...m} />
      ))}
    </MessageGroup>
  );
}

function BubbleDemo() {
  return (
    <BubbleGroup className="max-w-md">
      {(["default", "secondary", "muted", "tinted", "outline", "ghost", "destructive"] as const).map((variant) => (
        <Bubble key={variant} variant={variant}>
          <BubbleContent>{variant}</BubbleContent>
        </Bubble>
      ))}
    </BubbleGroup>
  );
}

function MessageScrollerDemo() {
  return (
    <div className="h-72 max-w-lg rounded-lg border">
      <MessageScrollerProvider defaultScrollPosition="end">
        <MessageScroller>
          <MessageScrollerViewport className="p-4">
            <MessageScrollerContent className="gap-4">
              {[...CONVERSATION, ...CONVERSATION].map((m, i) => (
                <MessageScrollerItem key={i} messageId={String(i)}>
                  <ConversationLine {...m} />
                </MessageScrollerItem>
              ))}
            </MessageScrollerContent>
          </MessageScrollerViewport>
          <MessageScrollerButton className="bottom-3" />
        </MessageScroller>
      </MessageScrollerProvider>
    </div>
  );
}

function AttachmentDemo() {
  return (
    <div className="grid gap-6">
      <div>
        <Caption>Horizontal</Caption>
        <AttachmentGroup>
          <Attachment>
            <AttachmentMedia>
              <FileTextIcon />
            </AttachmentMedia>
            <AttachmentContent>
              <AttachmentTitle>bill-of-sale.pdf</AttachmentTitle>
              <AttachmentDescription>PDF · 240 KB</AttachmentDescription>
            </AttachmentContent>
            <AttachmentActions>
              <AttachmentAction aria-label="Remove">
                <XIcon />
              </AttachmentAction>
            </AttachmentActions>
          </Attachment>
          <Attachment state="uploading">
            <AttachmentMedia>
              <ImageIcon />
            </AttachmentMedia>
            <AttachmentContent>
              <AttachmentTitle>front-view.jpg</AttachmentTitle>
              <AttachmentDescription>Uploading…</AttachmentDescription>
            </AttachmentContent>
          </Attachment>
          <Attachment state="error">
            <AttachmentMedia>
              <ImageIcon />
            </AttachmentMedia>
            <AttachmentContent>
              <AttachmentTitle>dash.heic</AttachmentTitle>
              <AttachmentDescription>File type not supported</AttachmentDescription>
            </AttachmentContent>
          </Attachment>
        </AttachmentGroup>
      </div>
      <div>
        <Caption>Vertical, small</Caption>
        <AttachmentGroup>
          {["side.jpg", "rear.jpg", "engine.jpg"].map((name) => (
            <Attachment key={name} orientation="vertical" size="sm">
              <AttachmentMedia>
                <ImageIcon />
              </AttachmentMedia>
              <AttachmentContent>
                <AttachmentTitle>{name}</AttachmentTitle>
              </AttachmentContent>
            </Attachment>
          ))}
        </AttachmentGroup>
      </div>
    </div>
  );
}

function MarkerDemo() {
  return (
    <div className="grid max-w-lg gap-6">
      <Marker variant="separator">
        <MarkerContent>Today</MarkerContent>
      </Marker>
      <Marker>
        <MarkerIcon>
          <CalendarIcon />
        </MarkerIcon>
        <MarkerContent>Test ride booked for Saturday at 10:00</MarkerContent>
      </Marker>
      <Marker variant="border">
        <MarkerContent>Conversation assigned to Sam Kent</MarkerContent>
      </Marker>
    </div>
  );
}

function QuestionnaireDemo() {
  return (
    <Questionnaire className="max-w-lg" onSubmit={(e) => e.preventDefault()}>
      <QuestionnaireProgress />
      <QuestionnaireItem name="type" required>
        <QuestionnaireTitle>What are you shopping for?</QuestionnaireTitle>
        <QuestionnaireDescription>Pick the closest match.</QuestionnaireDescription>
        <QuestionnaireChoices>
          <QuestionnaireChoice value="atv">
            ATV
            <QuestionnaireChoiceDescription>Single rider, off-road</QuestionnaireChoiceDescription>
          </QuestionnaireChoice>
          <QuestionnaireChoice value="utv">
            Side-by-side
            <QuestionnaireChoiceDescription>Two or more seats</QuestionnaireChoiceDescription>
          </QuestionnaireChoice>
          <QuestionnaireChoice value="moto">Motorcycle</QuestionnaireChoice>
        </QuestionnaireChoices>
      </QuestionnaireItem>
      <QuestionnaireItem name="budget">
        <QuestionnaireTitle>What is your budget?</QuestionnaireTitle>
        <QuestionnaireInput type="number" placeholder="15000" />
      </QuestionnaireItem>
      <QuestionnaireActions>
        <span />
        <QuestionnairePrevious>Back</QuestionnairePrevious>
        <QuestionnaireNext>Next</QuestionnaireNext>
        <QuestionnaireSubmit>Finish</QuestionnaireSubmit>
      </QuestionnaireActions>
    </Questionnaire>
  );
}

export const chatDemos = {
  message: MessageDemo,
  bubble: BubbleDemo,
  "message-scroller": MessageScrollerDemo,
  attachment: AttachmentDemo,
  marker: MarkerDemo,
  questionnaire: QuestionnaireDemo,
};
