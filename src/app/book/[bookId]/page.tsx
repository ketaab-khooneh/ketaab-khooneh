"use client";
import BookSummary from "@/components/book/BookSummary/BookSummary";
import UserPreview from "@/components/user/UserPreview";
import { useBooksGetApi } from "@/hooks/books";
import {
  Alert,
  Container,
  Flex,
  Stack,
  Text,
  useMantineTheme,
} from "@mantine/core";
import {
  IconMoodSad,
  IconShoppingCart,
  IconShoppingCartExclamation,
  IconX,
} from "@tabler/icons-react";
import { useParams } from "next/navigation";
import {
  Button,
  ButtonSlots,
  Notice,
  NoticeSlots,
} from "@tapsioss/react-components";
import { ShoppingCart } from "@tapsioss/react-icons";

// TODO: fix style
const Page = () => {
  const theme = useMantineTheme();
  const { bookId } = useParams();
  const { isLoading, data: book } = useBooksGetApi(bookId as string);

  // TODO: use skeleton
  if (isLoading) {
    return "is loading";
  }

  const renderActionArea = () => {
    if (book?.status === "BORROWED") {
      return (
        book.borrowedBy && (
          <Alert color="gray" icon={<IconShoppingCartExclamation />}>
            <Flex gap="sm" align="center">
              <Text>This book is currently borrowed by</Text>
              <UserPreview
                user={book.borrowedBy}
                color={theme.colors.gray[5]}
              />
            </Flex>
          </Alert>
        )
      );
    }
    if (book?.status === "RESERVED_BY_ME") {
      return (
        <>
          <Notice
            priority="low"
            visible
            description="این کتاب توسط شما رزرو شده است."
          >
            <div slot={NoticeSlots.ACTION}>
              <Button color="red">لغو رزرو</Button>
            </div>
          </Notice>
          <Alert color="blue" icon={<IconShoppingCart />}>
            <Stack gap="sm">
              <Text>This book is currently reserved by you</Text>
              <div>
                <Button color="red" leftSection={<IconX />}>
                  Cancel Reservation
                </Button>
              </div>
            </Stack>
          </Alert>
        </>
      );
    }
    if (book?.status === "RESERVED_BY_OTHERS") {
      return (
        book.reservedBy && (
          <Alert color="yellow.8">
            <Flex gap="sm">
              <Text>This book is currently reserved by</Text>
              <UserPreview
                user={book.reservedBy}
                color={theme.colors.yellow[9]}
              />
            </Flex>
          </Alert>
        )
      );
    }
    if (true || book?.status === "NOT_AVAILABLE") {
      return (
        <Notice
          visible
          color="error"
          priority="low"
          description="این کتاب در حال حاضر در دسترس نیست."
        />
      );
    }
    if (book?.status === "AVAILABLE") {
      return (
        <Flex justify={"end"}>
          <Button>
            <ShoppingCart slot={ButtonSlots.TRAILING_ICON} />
            امانت بگیر
          </Button>
        </Flex>
      );
    }
  };
  return (
    book && (
      <Stack gap="md" w="100%">
        <h1>کتاب {book.title}</h1>
        <BookSummary book={book} />
        {renderActionArea()}
      </Stack>
    )
  );
};

export default Page;
