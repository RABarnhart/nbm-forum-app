import { Colors } from "@/constants/theme";
import { getPosts } from "@/services/posts";
import { getUserId } from "@/services/token";
import { PaginatedPostsResponse } from "@/types/api";
import { FlashList } from "@shopify/flash-list";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import React, { useMemo } from "react";
import { ActivityIndicator, StyleSheet, Text } from "react-native";
import Post from "./post";

type Props = {
  activeFilters: { [key: string]: boolean };
  search?: string;
  filters: string[];
};

const Feed = ({ filters, activeFilters, search }: Props) => {
  const activeTags = useMemo(
    () => Object.keys(activeFilters).filter((key) => activeFilters[key]),
    [activeFilters],
  );

  const initialPayload = useMemo(() => {
    const tagsToSend = activeTags.length === 0 ? filters : activeTags;

    const payload = {
      limit: 5,
      tags: tagsToSend,
    };
    console.log("API Request Payload:", payload);
    return payload;
  }, [activeTags]);

  const { data: currentUserId } = useQuery({
    queryKey: ["currentUserId"],
    queryFn: getUserId,
    staleTime: 0,
  });

  /* --- Infinite Query --- */
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
    isFetching,
    isError,
  } = useInfiniteQuery<PaginatedPostsResponse>({
    queryKey: ["posts", initialPayload],
    queryFn: async ({ pageParam }) => {
      const payloadWithPage = {
        pageParam: pageParam as number | undefined,
        limit: initialPayload.limit,
        filters: { tags: initialPayload.tags },
      };

      console.log(
        `Fetching Page ${pageParam || 1} with filters:`,
        initialPayload.tags,
      );
      const response = await getPosts(payloadWithPage);
      console.log(`API Response for Page ${pageParam || 1}:`, response);

      return response;
    },
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = allPages.length + 1;
      if (allPages.length * initialPayload.limit < lastPage.total) {
        return nextPage;
      } else {
        return undefined;
      }
    },
    initialPageParam: 1,
  });

  /* --- Flatten pages into a single list of posts --- */
  const allPosts = useMemo(() => {
    return data?.pages?.flatMap((page) => page.data) || [];
  }, [data]);

  /* --- Filtering posts --- */
  const postsToRender = search
    ? allPosts.filter((p) => {
        return p.title.toLowerCase().includes(search.toLowerCase());
      })
    : allPosts;
  /* --- --- */

  if (isError) {
    return <Text style={styles.feedMessage}>Error loading posts.</Text>;
  }

  const loadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  const activeTagNames = Object.keys(activeFilters).filter(
    (key) => activeFilters[key],
  );

  if (activeTagNames.length > 0 && postsToRender.length === 0) {
    return (
      <ActivityIndicator size="large" style={{padding: 50}}/>
    );
  }

  return (
    <FlashList
      initialScrollIndex={0}
      data={postsToRender}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <Post currentUserId={currentUserId} data={item} />
      )}
      refreshing={isFetching && !isFetchingNextPage}
      onRefresh={() => refetch()}
      onEndReached={loadMore}
      onEndReachedThreshold={0.25}
      ListFooterComponent={
        isFetchingNextPage ? null : (
          <Text style={styles.feedMessage}>End of Posts</Text>
        )
      }
    />
  );
};

export default Feed;

const styles = StyleSheet.create({
  feedMessage: {
    textAlign: "center",
    fontFamily: "Syne_400Regular",
    fontSize: 16,
    padding: 20,
    color: Colors.darkGrey,
  },
});
